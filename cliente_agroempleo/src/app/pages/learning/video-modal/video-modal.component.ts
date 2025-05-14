import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-video-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.css']
})
export class VideoModalComponent {
  safeUrl: SafeResourceUrl;
  recomendaciones = [
  {
    titulo: 'Excel para principiantes',
    autor: 'Isabel Fernández Gutiérrez',
    duracion: '51 min',
    nivel: 'Básico',
    favorito: true,
    videoUrl: 'assets/videos/excel.mp4'  // Verifica que esta URL esté correcta
  },
  {
    titulo: 'Inglés de negocios',
    autor: 'Speexx',
    duracion: '26 min',
    nivel: 'Intermedio',
    favorito: false,
    videoUrl: 'assets/videos/ingles.mp4'
  },
  {
    titulo: 'After Effects esencial',
    autor: 'Jorge Mochón',
    duracion: '4 h 3 min',
    nivel: 'Avanzado',
    favorito: true,
    videoUrl: 'assets/videos/after.mp4'
  },
  {
    titulo: 'Marketing B2B',
    autor: 'Jordi Marca',
    duracion: 'Desconocido',
    nivel: 'Intermedio',
    favorito: false,
    videoUrl: 'assets/videos/marketing.mp4'
  }
];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { videoUrl: string },
    private sanitizer: DomSanitizer
  ) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.videoUrl);
  }
}
