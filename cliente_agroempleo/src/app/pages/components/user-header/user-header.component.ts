import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../../../usuario.service';

@Component({
  selector: 'app-user-header',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
  isMenuOpen = false;
  Nombre: string = '';
  avatarUrl: string = '/img.png';
  tipoUsuario: string = localStorage.getItem('usuarioTipo') || '';


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    const nombre = localStorage.getItem('usuarioNombre') || '';
    const apellido = localStorage.getItem('usuarioApellido') || '';
    this.Nombre = `${nombre} ${apellido}`.trim();
    const usuarioId = localStorage.getItem('usuarioId');

    console.log("ngOnInit cargado", usuarioId);
    console.log("ngOnInit cargado", this.Nombre);


  }
  get sesionIniciada(): boolean {
  return !!localStorage.getItem('usuarioId'); // Cambiado a 'usuarioId'
}

  cerrarSesion() {
    localStorage.clear(); // Limpia todo el localStorage
    window.location.href = '/'; // Redirige a home o login
  }

  irAIniciarSesion() {
    window.location.href = '/login'; // Redirige a login
  }
}