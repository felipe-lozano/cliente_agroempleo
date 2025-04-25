
import {Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../../../config/api-config';
import { MatDialog, MatDialogModule, } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmpleoService } from '../../../empleo.service';



interface OfertaLaboral {
  TituloPuesto: string;
  DescripcionTrabajo: string;
  Cargo: string;
  Salario: string;
  Modalidad: string;
  NivelRequerido: string;
  ExperienciaRequrida: string;
  NumeroVacantes: string;
  IdTipoEmpleoTipoDeEmpleo: string;
  IdCiudadTrabajoCiudad: string;
}

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
    

  ],
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.css'
})
export class BibliotecaComponent {
  isMenuOpen = false;


  terminoBusqueda: string = '';
  filtroExperiencia: string = 'Todas';
  filtroContrato: string = 'Todos';
  filtrociudad: string = 'Todas';
  filtroModalidad: string = 'Todas';

  ofertas: OfertaLaboral[] = [];

  constructor(private empleoService: EmpleoService) {}

  ngOnInit() {
    this.empleoService.obtenerOfertas().subscribe((data) => {
      this.ofertas = data;
    });
  }

  get ofertasFiltradas(): OfertaLaboral[] {
    return this.ofertas.filter(oferta => {
      const coincideBusqueda =
        oferta.TituloPuesto.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        oferta.DescripcionTrabajo.toLowerCase().includes(this.terminoBusqueda.toLowerCase());

      const coincideExperiencia = this.filtroExperiencia === 'Todas' || oferta.ExperienciaRequrida === this.filtroExperiencia;
      const coincideContrato = this.filtroContrato === 'Todos' || oferta.IdTipoEmpleoTipoDeEmpleo === this.filtroContrato;
      const coincideJornada = this.filtrociudad === 'Todas' || oferta.IdCiudadTrabajoCiudad === this.filtrociudad;
      const coincideModalidad = this.filtroModalidad === 'Todas' || oferta.Modalidad === this.filtroModalidad;

      return coincideBusqueda && coincideExperiencia && coincideContrato && coincideJornada && coincideModalidad;
    });
  }

  experiencias: string[] = ['Todas', 'Junior', 'Intermedio', 'Senior'];
  tiposContrato: string[] = ['Todos', 'Indefinido', 'Temporal', 'Freelance'];
  ciudad: string[] = ['Todas','Bogotá','Medellín','Cali','Barranquilla','Cartagena','Cúcuta','Santa Marta','Villavicencio','San Gil'];
  modalidades: string[] = ['Todas', 'Remoto', 'Presencial', 'Híbrido'];
}
