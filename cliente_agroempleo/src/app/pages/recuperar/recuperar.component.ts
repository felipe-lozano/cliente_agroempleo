import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recuperar',
  imports: [
    FormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './recuperar.component.html',
  styleUrl: './recuperar.component.css'
})

export class RecuperarComponent {
  email: string = '';

  onSubmit() {
    console.log('Correo ingresado:', this.email);
    // Aquí puedes hacer una llamada al backend para enviar el enlace de recuperación
  }
}