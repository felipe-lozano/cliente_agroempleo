
import {Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule, } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmpleoService } from '../../../empleo.service';
import { UsuarioService } from '../../../usuario.service';
import { UserHeaderComponent } from "../components/user-header/user-header.component";
import { HttpClient } from '@angular/common/http';

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
  styleUrl: './biblioteca.component.css'
})
export class BibliotecaComponent {
  isMenuOpen = false;
  IdUsuarios = 7;
  archivoPDF: File | null = null;
  base64CV: string | null = null;

  terminoBusqueda: string = '';
  filtroExperiencia: string = 'Todas';
  filtroContrato: string = 'Todos';
  filtrociudad: string = 'Todas';
  filtroModalidad: string = 'Todas';

  ofertas: OfertaLaboral[] = [];

  constructor(private empleoService: EmpleoService, private usuarioService: UsuarioService, private http: HttpClient) {}

  ngOnInit ()  {
    this.empleoService.obtenerOfertas().subscribe((data: any) => {
      const arregloConsulta: OfertaLaboral[] = data["Data"];
      this.ofertas = arregloConsulta;
      console.log(JSON.stringify(this.ofertas, null, 2));
    });


   
  }

  get ofertasFiltradas(): OfertaLaboral[] {
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

    const payload = {
      IdUsuarios: this.IdUsuarios,
      IdEmpleo: this.ofertaSeleccionada.id,
      SoporteCv: this.base64CV
    };



    console.log('JSON a enviar:', payload);
    
    const json_register = JSON.stringify(payload);
    console.log('JSON formateado:\n', json_register);

    this.http.post('http://localhost:8087/v1/postulaciones', payload).subscribe({
      next: (res) => {
        alert('¡Postulación con base64 exitosa!');
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al postularse:', err);
        alert('Ocurrió un error al postularse.');
      }
    });
  }


}
