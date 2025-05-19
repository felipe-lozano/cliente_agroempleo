
import {Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule, } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmpleoService } from '../../../empleo.service';
import { UsuarioService } from '../../../usuario.service';
import { UserHeaderComponent } from "../components/user-header/user-header.component";


interface OfertaLaboral {
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
    UserHeaderComponent
],
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.css'
})
export class BibliotecaComponent {
  isMenuOpen = false;

  Nombre: string = '';
  avatarUrl: string = '/img.png';


  terminoBusqueda: string = '';
  filtroExperiencia: string = 'Todas';
  filtroContrato: string = 'Todos';
  filtrociudad: string = 'Todas';
  filtroModalidad: string = 'Todas';

  ofertas: OfertaLaboral[] = [];

  constructor(private empleoService: EmpleoService, private usuarioService: UsuarioService) {}

  ngOnInit ()  {
    this.empleoService.obtenerOfertas().subscribe((data: any) => {
      const arregloConsulta: OfertaLaboral[] = data["Data"];
      this.ofertas = arregloConsulta;
      console.log(JSON.stringify(this.ofertas, null, 2));
    });

    const usuarioId = 1;
    console.log("ngOnInit cargado");

    this.usuarioService.obtenerUsuario(usuarioId).subscribe(usuario => {
    console.log("Usuario obtenido:", usuario);
    this.Nombre = usuario["Consulta de id"].Nombre;
    this.avatarUrl = usuario.avatar || '/img.png';
    console.log("Nombre:", this.Nombre);
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
  tiposContrato: string[] = ['Todos', 'indefinido', 'Temporal', 'Freelance'];
  ciudad: string[] = ['Todas','Bogotá','Medellín','Cali','Barranquilla','Cartagena','Cúcuta','Santa Marta','Villavicencio','San Gil'];
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
  Postularme() {
    console.log("hola");
    alert("postulacion enviada");
    this.modalAbierto = false;
  }



}
