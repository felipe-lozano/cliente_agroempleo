import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './learning.component.html',
  styleUrl: './learning.component.css'
})
export class LearningComponent implements OnInit {
  usuario = 'Nicolas';

  recomendaciones = [
    {
      titulo: 'Excel para principiantes: Tablas dinámicas (365/2019)',
      autor: 'Isabel Fernández Gutiérrez',
      duracion: '51 min'
    },
    {
      titulo: 'Inglés de negocios: Trucos y consejos semanales',
      autor: 'Speexx',
      duracion: '26 min'
    },
    {
      titulo: 'Adobe After Effects esencial',
      autor: 'Jorge Mochón',
      duracion: '4 h 3 min'
    },
    {
      titulo: 'Marketing B2B: generación de demanda',
      autor: 'Jordi Marca',
      duracion: 'Desconocido'
    }
  ];

  ngOnInit() {
    // Puedes obtener el nombre del usuario desde almacenamiento o servicio si quieres
    // this.usuario = localStorage.getItem('usuario') || 'Invitado';
  }
}
