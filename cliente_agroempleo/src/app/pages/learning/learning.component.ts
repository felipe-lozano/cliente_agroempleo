import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { SafeUrlPipe } from './safe-url.pipe';
import { UserHeaderComponent } from "../components/user-header/user-header.component";

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    SafeUrlPipe,
    UserHeaderComponent
],
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit {
  searchText = '';
  learnings: any[] = [];
  filteredLearnings: any[] = [];
  showModal = false;
  newLearningForm!: FormGroup;
  selectedImage: string | null = null;
  IdUsuario = localStorage.getItem('idUsuario');

  constructor(private http: HttpClient, private fb: FormBuilder) {}
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

  ngOnInit(): void {
    this.newLearningForm = this.fb.group({
      TextoAprendizaje: [''],
      Videos: ['']
    });

    this.cargarLearnings();
    this.rol();
  }

  cargarLearnings(): void {
    this.http.get<any>('http://localhost:8088/v1/Learning').subscribe(res => {
      this.learnings = res['usuarios consultados'] || [];
      this.filteredLearnings = this.learnings;
    });
  }

  filterLearnings(): void {
    const term = this.searchText.toLowerCase();
    this.filteredLearnings = this.learnings.filter((learning: any) =>
      learning.TextoAprendizaje.toLowerCase().includes(term)
    );
  }

  abrirModal(): void {
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
    this.newLearningForm.reset();
    this.selectedImage = null;
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  convertirURLaEmbed(url: string): string {
    const regex = /watch\?v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  }

  guardarLearning(): void {
    const formData = this.newLearningForm.value;
    const nuevoLearning = {
      TextoAprendizaje: formData.TextoAprendizaje,
      Videos: this.convertirURLaEmbed(formData.Videos),
      Imagenes: this.selectedImage,
      IdUsuario: this.IdUsuario,
      Activo: true,
      FechaCreacion: new Date(),
      FechaModificacion: new Date()
    };

    this.http.post('http://localhost:8088/v1/Learning', nuevoLearning).subscribe(() => {
      this.cargarLearnings();
      this.cerrarModal();
    });
  }
}