import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SafeUrlPipe } from './safe-url.pipe'; // <-- Asegúrate que la ruta sea correcta
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hoja-de-vida',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SafeUrlPipe ,// <-- Importa aquí el pipe
    MatIconModule
  ],
  templateUrl: './hoja-de-vida.component.html',
  styleUrls: ['./hoja-de-vida.component.css']
})
export class HojaDeVidaComponent {
  perfilForm: FormGroup;
  imagenPrevia: string | ArrayBuffer | null = null;
  documentoUrl: string | null = null;

  private fb = inject(FormBuilder);

  constructor() {
    this.perfilForm = this.fb.group({
      nombre: [''],
      correo: [''],
      telefono: [''],
      direccion: [''],
      descripcion: ['']
    });
  }

  seleccionarImagen(event: any): void {
    const archivo = event.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onload = () => (this.imagenPrevia = lector.result);
      lector.readAsDataURL(archivo);
    }
  }

  seleccionarDocumento(event: any): void {
    const archivo = event.target.files[0];
    if (archivo) {
      this.documentoUrl = URL.createObjectURL(archivo);
    }
  }

  guardarCambios(): void {
    console.log(this.perfilForm.value);
    alert('Información guardada correctamente');
  }
}