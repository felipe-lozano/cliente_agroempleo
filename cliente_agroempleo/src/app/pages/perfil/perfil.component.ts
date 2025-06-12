// ... otros imports ...
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserHeaderComponent } from "../components/user-header/user-header.component";

interface UserProfile {
  Id: number;
  Nombre: string;
  Apellido: string;
  NDocumento: string;
  FechaNacimiento: string;
  CorreoElectronico: string;
  Ciudad: string;
  Departamento: string;
  Pais: string;
  Telefono: string;
  IdTipoDocumentoTipoDocumento: { Nombre: string };
  IdRolRol: { Nombre: string };
}

interface OfertaLaboral {
  id: number;
  TituloPuesto: string;
  DescripcionTrabajo: string;
  Cargo: string;
  Salario: string;
  Modalidad: string;
  NivelRequerido: string;
  ExperienciaRequrida: string;
  NumeroVacantes: string;
  TipoEmpleo: string;
  Ciudad: string;
  publicado_por: string;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserHeaderComponent
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user?: UserProfile;
  loading = true;
  error = '';
  userId = localStorage.getItem('usuarioId') || '';
  postulaciones: any[] = [];
  tipo_documento: any;
  tipo_usuario: any;
  postulacionesFiltradas: any[] = [];

  vacantes: OfertaLaboral[] = [];
  vacanteSeleccionada?: OfertaLaboral | null = null;

  modalVacanteAbierta = false;
  modalPostulantesAbierto = false;
  modalDetalleVacanteAbierta = false;
  modalVacantesAbiertas = false;

  editForm!: FormGroup;
  editando = false;

  private apiUrl = 'http://localhost:8080/v1/Usuarios/' + this.userId;
  private apiPostulacionesUrl = 'http://localhost:8082/v1/postulaciones';
  private apiVacantesUrl = 'http://localhost:8082/v1/vacante';
  private apiDeletePostulacionUrl = 'http://localhost:8087/v1/postulaciones';
  private apiEliminarVacanteUrl = 'http://localhost:8083/v1/Vacantes';


  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.obtenerPerfil();
  }

  obtenerPerfil() {
    this.http.get<{ "Consulta de id": UserProfile }>(this.apiUrl).subscribe({
      next: (data) => {
        this.user = data["Consulta de id"];
        this.tipo_documento = this.user.IdTipoDocumentoTipoDocumento;
        this.tipo_usuario = this.user.IdRolRol;
        this.loading = false;

        this.editForm = this.fb.group({
          Nombre: [this.user.Nombre],
          Apellido: [this.user.Apellido],
          CorreoElectronico: [this.user.CorreoElectronico],
          Telefono: [this.user.Telefono],
          Ciudad: [this.user.Ciudad],
          Departamento: [this.user.Departamento],
          Pais: [this.user.Pais]
        });

        this.obtenerPostulaciones();

        if(this.user.IdRolRol?.Nombre === 'Empleador') {
          this.obtenerVacantes();
        }
      },
      error: (err) => {
        console.error('Error cargando perfil:', err);
        this.error = 'Error al cargar el perfil.';
        this.loading = false;
      }
    });
  }

  obtenerPostulaciones() {
    this.http.get<any>(this.apiPostulacionesUrl).subscribe({
      next: (res) => {
        if (res && Array.isArray(res["Data"])) {
          this.postulaciones = res["Data"];

          if (!this.user) return;

          const idUsuario = Number(this.userId);
          const rol = this.user.IdRolRol?.Nombre;

          if (rol === 'Empleador') {
            const vacantesMap = new Map<string, { TituloPuesto: string, postulantes: any[] }>();

            this.postulaciones.forEach(p => {
              if (p.IdEmpleador === idUsuario) {
                if (!vacantesMap.has(p.TituloPuesto)) {
                  vacantesMap.set(p.TituloPuesto, {
                    TituloPuesto: p.TituloPuesto,
                    postulantes: []
                  });
                }
                vacantesMap.get(p.TituloPuesto)!.postulantes.push({
                  NombrePostulado: p.NombrePostulado,
                  ArchivoCV: p.ArchivoCV
                });
              }
            });

            this.postulacionesFiltradas = Array.from(vacantesMap.values());

          } else if (rol === 'Aspirante') {
            this.postulacionesFiltradas = this.postulaciones.filter(p =>
              p.IdAspirante === idUsuario
            ).map(p => ({
              Id: p.Id, // <- necesario para eliminar
              TituloPuesto: p.TituloPuesto,
              NombrePostulado1: p.NombrePostulado1
            }));
          } else {
            this.postulacionesFiltradas = [];
          }
        } else {
          this.postulaciones = [];
          this.postulacionesFiltradas = [];
        }
      },
      error: (err) => {
        console.error('Error al obtener postulaciones:', err);
        this.postulaciones = [];
        this.postulacionesFiltradas = [];
      }
    });
  }

  eliminarPostulacion(id: number) {
    const confirmado = confirm('¿Deseas eliminar esta postulación?');
    if (!confirmado) return;

    this.http.delete(`${this.apiDeletePostulacionUrl}/${id}`).subscribe({
      next: () => {
        alert('Postulación eliminada con éxito.');
        this.obtenerPostulaciones(); // <- refresca datos en pantalla
      },
      error: (err) => {
        console.error('Error al eliminar postulación:', err);
        alert('Error al eliminar la postulación.');
      }
    });
  }
 
  

  obtenerVacantes() {
    this.http.get<{ Data: OfertaLaboral[] }>(this.apiVacantesUrl).subscribe({
      next: (res) => {
        this.vacantes = res.Data || [];
      },
      error: (err) => {
        console.error('Error al cargar vacantes:', err);
        this.vacantes = [];
      }
    });
  }

  abrirModalEditar() {
    this.editando = true;
  }

  cerrarModal() {
    this.editando = false;
  }

  guardarCambios() {
    if (this.editForm.invalid) return;

    const datosActualizados = {
      ...this.user,
      ...this.editForm.value
    };

    this.http.put(this.apiUrl, datosActualizados).subscribe({
      next: () => {
        this.user = { ...datosActualizados };
        this.editando = false;
      },
      error: (err) => {
        console.error('Error al guardar cambios:', err);
        alert('Ocurrió un error al guardar los cambios.');
      }
    });
  }

  eliminarPerfil() {
    const confirmado = confirm('¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.');
    if (!confirmado) return;

    this.http.delete(this.apiUrl).subscribe({
      next: () => {
        alert('Perfil eliminado correctamente.');
        localStorage.clear();
        window.location.href = '/';
      },
      error: (err) => {
        console.error('Error al eliminar perfil:', err);
        alert('Error al eliminar el perfil.');
      }
    });
  }

  calcularEdadDesdeString(fechaStr: string): number {
    if (!fechaStr) return 0;
    const partes = fechaStr.split('/');
    if (partes.length !== 3) return 0;

    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1;
    const anio = parseInt(partes[2], 10);
    const fechaNacimiento = new Date(anio, mes, dia);
    if (isNaN(fechaNacimiento.getTime())) return 0;

    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const m = hoy.getMonth() - fechaNacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) edad--;
    return edad;
  }

  nombreCompleto(): string {
    return this.user ? `${this.user.Nombre} ${this.user.Apellido}` : '';
  }

  ubicacionCompleta(): string {
    return this.user ? `${this.user.Ciudad}, ${this.user.Departamento}, ${this.user.Pais}` : '';
  }

  descargarArchivo(base64: string, nombre: string) {
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,' + base64;
    link.download = `${nombre}_cv.pdf`;
    link.click();
  }

  verPdf(base64: string) {
    const fileURL = `data:application/pdf;base64,${base64}`;
    const pdfWindow = window.open();
    if (pdfWindow) {
      pdfWindow.document.write(`<iframe width='100%' height='100%' src='${fileURL}'></iframe>`);
    }
  }

  abrirModalPostulantes(): void {
    this.modalPostulantesAbierto = true;
  }

  cerrarModalPostulantes(): void {
    this.modalPostulantesAbierto = false;
  }

  verDetalleVacante(vacante: OfertaLaboral): void {
    this.vacanteSeleccionada = vacante;
    this.modalDetalleVacanteAbierta = true;
  }

  cerrarModalDetalleVacante(): void {
    this.modalDetalleVacanteAbierta = false;
    this.vacanteSeleccionada = null;
  }

  abrirModalVacantes(): void {
    this.modalVacantesAbiertas = true;
  }

  cerrarModalVacantes(): void {
    this.modalVacantesAbiertas = false;
  }
  eliminarVacante(Id: number | undefined) {
    if (!Id) return;

    const consultaUrl = `http://localhost:8087/v1/postulaciones?IdEmpleo=${Id}`;
    console.log('🔍 Consultando postulaciones en:', consultaUrl);

    this.http.get<any>(consultaUrl).subscribe({
      next: (respuesta) => {
        console.log('📄 Respuesta de la API:', respuesta);

        const postulaciones = respuesta["usuarios consultados"];

        if (postulaciones && postulaciones.length > 0) {
          alert('❌ No se puede eliminar esta vacante porque tiene postulaciones activas.');
          return; // 🚫 Detiene el flujo
        }

        const confirmado = confirm('¿Deseas eliminar esta vacante? Esta acción la eliminará del sistema.');
        if (!confirmado) return;

        // ✅ Ejecutar eliminación
        this.http.delete(`${this.apiEliminarVacanteUrl}/${Id}`).subscribe({
          next: () => {
            alert('✅ Vacante eliminada exitosamente.');
            this.obtenerVacantes();
            this.cerrarModalDetalleVacante();
          },
          error: (err) => {
            console.error('❌ Error al eliminar la vacante:', err);
            alert('Ocurrió un error al eliminar la vacante.');
          }
        });
      },
      error: (err) => {
        console.error('❌ Error al consultar postulaciones:', err);
        alert('No se pudo verificar si hay postulaciones asociadas.');
      }
    });
  }
  terminarVacante(Id: number | undefined) {
    if (!Id) return;
    const confirmado = confirm('¿Deseas marcar esta vacante como terminada? Esta acción la eliminará del sistema.');
    if (!confirmado) return;

    this.http.delete(`${this.apiEliminarVacanteUrl}/${Id}`).subscribe({
      next: () => {
        alert('Vacante terminada exitosamente.');
        this.obtenerVacantes();
        this.cerrarModalDetalleVacante();
      },
      error: (err) => {
        console.error('Error al terminar la vacante:', err);
        alert('Ocurrió un error al terminar la vacante.');
      }
    });
  }
  eliminarPostulacionesDeVacante(Id: number) {
  const urlConsulta = `http://localhost:8087/v1/postulaciones?IdEmpleo=${Id}`;

  this.http.get<any>(urlConsulta).subscribe({
    next: (respuesta) => {
      const postulaciones = respuesta["usuarios consultados"];
      
      if (!postulaciones || postulaciones.length === 0) {
        alert('No hay postulaciones asociadas a esta vacante.');
        return;
      }

      const confirmacion = confirm(`Se encontraron ${postulaciones.length} postulaciones asociadas. ¿Deseas eliminarlas todas?`);
      if (!confirmacion) return;

      // Eliminar todas las postulaciones una por una
      let eliminadas = 0;
      postulaciones.forEach((postulacion: any, index: number) => {
        const idPostulacion = postulacion.Id;

        this.http.delete(`${this.apiDeletePostulacionUrl}/${idPostulacion}`).subscribe({
          next: () => {
            eliminadas++;
            // Si es la última, notificar
            if (eliminadas === postulaciones.length) {
              alert(`✅ Se eliminaron ${eliminadas} postulaciones.`);
              this.obtenerPostulaciones();
            }
          },
          error: (err) => {
            console.error(`❌ Error al eliminar postulación con ID ${idPostulacion}:`, err);
          }
        });
      });
    },
    error: (err) => {
      console.error('❌ Error al consultar postulaciones asociadas:', err);
      alert('Ocurrió un error al consultar las postulaciones.');
    }
  });
}

}
