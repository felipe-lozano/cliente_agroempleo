
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-job-board',
  imports: [
    CommonModule
  ],
  templateUrl: './job-board.component.html',
  styleUrls: ['./job-board.component.css']
})
export class JobBoardComponent {
  jobs = [
    {
      title: 'Diseñador UI / UX',
      description: 'La posición de Diseñador de Experiencia de Usuario existe para crear experiencias digitales atractivas...',
      logo: 'https://img.icons8.com/color/48/figma--v1.png',
      tags: ['Tiempo completo', 'Min. 1 Año', 'Nivel senior']
    },
    {
      title: 'Diseñador/a Senior de Producto',
      description: 'Diseñador/a de Experiencia de Usuario para crear experiencias digitales atractivas...',
      logo: 'https://img.icons8.com/color/48/patreon.png',
      tags: ['Tiempo completo', 'Min. 1 Año', 'Nivel senior']
    },
    {
      title: 'UI / UX Designer',
      description: 'La posición de UX Designer busca mejorar la experiencia digital y diseño de productos...',
      logo: 'https://img.icons8.com/color/48/kakaotalk.png',
      tags: ['Tiempo completo', 'Min. 1 Año', 'Nivel senior']
    },
    {
      title: 'UI Developer',
      description: 'Desarrollador UI para crear interfaces modernas y eficientes con alta calidad visual...',
      logo: 'https://img.icons8.com/color/48/airbnb.png',
      tags: ['Tiempo completo', 'Min. 1 Año', 'Nivel senior']
    }
  ];
}