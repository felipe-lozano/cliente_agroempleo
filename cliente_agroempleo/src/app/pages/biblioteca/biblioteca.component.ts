
import {Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { API_URLS } from '../../../config/api-config';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule, } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';




@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatCardModule,

  ],
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.css'
})
export class BibliotecaComponent {
  isMenuOpen = false;
  @Output() filtrosAplicados = new EventEmitter<any>();

  selectedJobType = '';
  selectedExperiencia = '';
  selectedJornada = '';
  selectedContrato = '';

  experiencias = ['Sin experiencia', '1-2 años', '3-5 años', 'Más de 5 años'];
  jornadas = ['Completa', 'Parcial', 'Temporal', 'Turnos'];
  tiposContrato = ['Indefinido', 'Temporal', 'Prácticas', 'Freelance'];
  tiposEmpleo = ['Tiempo Completo', 'Medio Tiempo', 'Remoto', 'Prácticas'];

  aplicarFiltros() {
    const filtros = {
      tipoEmpleo: this.selectedJobType,
      experiencia: this.selectedExperiencia,
      jornada: this.selectedJornada,
      contrato: this.selectedContrato
    };
    this.filtrosAplicados.emit(filtros);
  }

  limpiarFiltros() {
    this.selectedJobType = '';
    this.selectedExperiencia = '';
    this.selectedJornada = '';
    this.selectedContrato = '';
    this.aplicarFiltros(); // Emitimos los filtros limpios
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // jobs = [
  //   {
  //     title: 'Diseñador UI / UX',
  //     description: 'La posición de Diseñador de Experiencia de Usuario existe para crear experiencias digitales atractivas...',
  //     logo: 'https://img.icons8.com/color/48/figma--v1.png',
  //     tags: ['Tiempo completo', 'Min. 1 Año', 'Nivel senior']
  //   },
  //   {
  //     title: 'Diseñador/a Senior de Producto',
  //     description: 'Diseñador/a de Experiencia de Usuario para crear experiencias digitales atractivas...',
  //     logo: 'https://img.icons8.com/color/48/patreon.png',
  //     tags: ['Tiempo completo', 'Min. 1 Año', 'Nivel senior']
  //   },
  //   {
  //     title: 'UI / UX Designer',
  //     description: 'La posición de UX Designer busca mejorar la experiencia digital y diseño de productos...',
  //     logo: 'https://img.icons8.com/color/48/kakaotalk.png',
  //     tags: ['Tiempo completo', 'Min. 1 Año', 'Nivel senior']
  //   },
  //   {
  //     title: 'UI Developer',
  //     description: 'Desarrollador UI para crear interfaces modernas y eficientes con alta calidad visual...',
  //     logo: 'https://img.icons8.com/color/48/airbnb.png',
  //     tags: ['Tiempo completo', 'Min. 1 Año', 'Nivel senior']
  //   }
  // ];
  constructor(private http:HttpClient, private dialog: MatDialog){}

  displayedColumns: string[] = ['Id','Nombre', 'Correo', 'Telefono','Website','upload','notify'];
  dataSource: any= [
    { id:1, name: 'Jaider',   email: 'jhonnyfelipe1807@gmail.com', phone: 22, website: 0},
    { id:2, name: 'Luis',     email: 'luis@correo.com', phone: 28,website: 0},
    { id:3, name: 'Andres',   email: 'andres@correo.com', phone: 26,website: 0},
    { id:4, name: 'Maria',   email: 'maria@correo.com', phone: 30,website: 0},
    { id:5, name: 'Pedro',   email: 'pedro@correo.com', phone: 24,website: 0}
  ];
  filtros = {
    id: '',
    name: '',
    email:'',
    phone:'',
    website:''
  }
  datafilter= [...this.dataSource]

  consultarDatos(): void{
    this.http.get<any[]>(API_URLS.Crud.Api_crud2)
   .subscribe(
    (data) => {
      console.log('Datos obtenidos correctamente', data);
      this.dataSource=data;
      console.log('Datos correctamente correctamente', data);

     },
     (error)=> {
      console.log('Error al obtener los datos', error);
     }
    );

  }
}