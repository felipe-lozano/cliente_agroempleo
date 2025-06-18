import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmpleoService } from '../../../empleo.service';
import { UsuarioService } from '../../../usuario.service';
import { UserHeaderComponent } from "../components/user-header/user-header.component";
import { HttpClient, HttpParams } from '@angular/common/http';

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
  publicado_por: string
}

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UserHeaderComponent,
  ],
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})
export class BibliotecaComponent {
  isMenuOpen = false;
  IdUsuarios: number = parseInt(localStorage.getItem('usuarioId') || '0', 10);
  archivoPDF: File | null = null;
  base64CV: string | null = null;

  terminoBusqueda: string = '';
  filtroExperiencia: string = 'Todas';
  filtroContrato: string = 'Todos';
  filtrociudad: string = 'Todas';
  filtroModalidad: string = 'Todas';

  ofertas: OfertaLaboral[] = [];

  constructor(
    private empleoService: EmpleoService,
    private usuarioService: UsuarioService,
    private http: HttpClient
  ) {}
  tipoUsuario: string = ''; // 'Empleador', 'Aspirante', etc.

// Puedes inicializarla desde el almacenamiento local, un servicio o lo que estés usando
  rol() {
    const tipo = localStorage.getItem('usuarioTipo');
    try {
      this.tipoUsuario = JSON.parse(tipo!); // Elimina las comillas dobles si están
    } catch {
      this.tipoUsuario = tipo ?? '';
    }
  }

  ngOnInit() {
    this.empleoService.obtenerOfertas().subscribe((data: any) => {
      const arregloConsulta: OfertaLaboral[] = data["Data"];
      this.ofertas = arregloConsulta;
      console.log(JSON.stringify(this.ofertas, null, 2));
    });
    this.rol();
  }

  get ofertasFiltradas(): OfertaLaboral[] {
    if (!this.ofertas) return []; // Previene el error si ofertas es null o undefined

    return this.ofertas.filter(oferta => {
      const coincideBusqueda =
        oferta.TituloPuesto.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        oferta.DescripcionTrabajo.toLowerCase().includes(this.terminoBusqueda.toLowerCase());

      const coincideExperiencia = this.filtroExperiencia === 'Todas' || oferta.ExperienciaRequrida === this.filtroExperiencia;
      const coincideContrato = this.filtroContrato === 'Todos' || oferta.TipoEmpleo === this.filtroContrato;
      const coincideJornada = this.filtrociudad === 'Todas' || oferta.Ciudad === this.filtrociudad;
      const coincideModalidad = this.filtroModalidad === 'Todas' || oferta.Modalidad === this.filtroModalidad;

      return coincideBusqueda && coincideExperiencia && coincideContrato && coincideJornada && coincideModalidad;
    });
  }


  experiencias: string[] = ['Todas', 'Junior', 'Intermedio', 'Senior'];
  tiposContrato: string[] = ['Todos', 'Indefinido', 'Temporal', 'Freelance'];
  ciudad: string[] = ['Todas','Bogota','Medellín','Cali','Barranquilla','Cartagena','Cúcuta','Santa Marta','Villavicencio','San Gil','yopal'];
  modalidades: string[] = ['Todas', 'Remoto', 'Presencial', 'Híbrido'];

  modalAbierto = false;
  ofertaSeleccionada: any = null;

  abrirModal(oferta: any) {
    this.ofertaSeleccionada = oferta;
    this.modalAbierto = true;
  }
  
  cerrarModal() {
    this.modalAbierto = false;
    this.ofertaSeleccionada = null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        this.base64CV = result.split(',')[1]; // solo el base64 sin encabezado
        console.log('Base64 del CV:', this.base64CV);
      };

      reader.onerror = error => {
        console.error('Error al leer el archivo:', error);
      };

      reader.readAsDataURL(file); // convierte a base64
    }
  }

Postularme() {
  if (!this.base64CV || !this.ofertaSeleccionada) {
    alert('Por favor, selecciona un archivo PDF antes de postularte.');
    return;
  }

  const IdUsuarios = this.IdUsuarios;
  const IdEmpleo = this.ofertaSeleccionada.id;

  const params = new HttpParams()
    .set('id_usuario', IdUsuarios.toString())
    .set('id_empleo', IdEmpleo.toString());

  this.http.get<any>('http://localhost:8087/v1/postulaciones', { params })
    .subscribe({
      next: (res) => {
        console.log('Respuesta del backend:', res);

        let postulaciones = [];
        if (res && Array.isArray(res["usuarios consultados"])) {
          postulaciones = res["usuarios consultados"];
        } else {
          console.warn('Respuesta inesperada, no se encontró "usuarios consultados"');
          postulaciones = [];
        }

        // Filtrar postulaciones por vacante y por usuario
        const postulacionesParaEstaVacante = postulaciones.filter(p =>
          p.IdEmpleo === IdEmpleo && p.IdUsuarios === IdUsuarios
        );

        if (postulacionesParaEstaVacante.length > 0) {
          alert('Ya te has postulado a esta vacante.');
        } else {
          const payload = {
            IdUsuarios: IdUsuarios,
            IdEmpleo: IdEmpleo,
            SoporteCv: this.base64CV
          };

          this.http.post('http://localhost:8087/v1/postulaciones', payload).subscribe({
            next: () => {
              alert('¡Postulación enviada con éxito!');
              this.cerrarModal();
            },
            error: (err) => {
              console.error('Error al postularse:', err);
              alert('Ocurrió un error al postularse.');
            }
          });
        }
      },
      error: (err) => {
        console.error('Error al verificar postulación previa:', err);
        alert('Error al verificar postulación previa.');
      }
    });
}

}
