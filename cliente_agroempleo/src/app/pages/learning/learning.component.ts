import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserHeaderComponent } from "../components/user-header/user-header.component";

@Pipe({
  name: 'filtroCursos',
  standalone: true
})
export class FiltroCursosPipe implements PipeTransform {
  transform(cursos: any[], curso: string, nivel: string, tiempo: string, extra: string, favoritos: string): any[] {
    return cursos.filter(c => {
      return (!curso || c.titulo.toLowerCase().includes(curso.toLowerCase())) &&
             (!nivel || c.nivel === nivel) &&
             (!tiempo || c.duracion.includes(tiempo)) &&
             (!extra || c.autor.toLowerCase().includes(extra.toLowerCase())) &&
             (!favoritos || c.favorito === (favoritos === 'Sí'));
    });
  }
}

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FiltroCursosPipe,
    MatTableModule,
    UserHeaderComponent
],
  templateUrl: './learning.component.html',
  styleUrl: './learning.component.css'
})
export class LearningComponent implements OnInit {
  usuario = 'Nicolas';

  filtroCurso = '';
  filtroNivel = '';
  filtroTiempo = '';
  filtroExtra = '';
  filtroFavoritos = '';

  recomendaciones = [
    {
      titulo: 'Excel para principiantes',
      autor: 'Isabel Fernández Gutiérrez',
      duracion: '51 min',
      nivel: 'Básico',
      favorito: true,
      videoUrl: 'assets/videos/excel.mp4'
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

  ngOnInit() {
  const favoritosGuardados = localStorage.getItem('favoritos');
  if (favoritosGuardados) {
    this.recomendaciones = JSON.parse(favoritosGuardados);
  }
}

  playVideo(event: MouseEvent): void {
  const video = event.target as HTMLVideoElement;
  video.play();
}

pauseVideo(event: MouseEvent): void {
  const video = event.target as HTMLVideoElement;
  video.pause();
  video.currentTime = 0;
}


 toggleFavorito(curso: any): void {
  curso.favorito = !curso.favorito;
  localStorage.setItem('favoritos', JSON.stringify(this.recomendaciones));
}


  // 🔽 Nueva función agregada aquí
 onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  if (file && ['application/pdf', 'application/msword', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
    // procesar archivo
  } else {
    alert("Formato de archivo no permitido.");
  }
}


}
