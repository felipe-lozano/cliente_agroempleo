import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  CorreoElectronico: string = '';
  ContrasenaCLIENTE: string = '';
  hidePassword: boolean = true;
  error: string = '';

  IdTipoUsuario: any = null;

  constructor(private http: HttpClient, private router: Router) {
    // ✅ Recuperar tipo de usuario guardado (si existe)
    const tipoGuardado = localStorage.getItem('usuarioTipo');
    if (tipoGuardado) {
      try {
        this.IdTipoUsuario = JSON.parse(tipoGuardado);
      } catch (e) {
        console.warn('Error al parsear usuarioTipo:', e);
        this.IdTipoUsuario = null;
      }
    }
  }

  login() {
    this.error = '';

    if (!this.CorreoElectronico || !this.ContrasenaCLIENTE) {
      this.error = '⚠️ Debes llenar todos los campos.';
      return;
    }

    const url = `http://localhost:8080/v1/Usuarios?query=CorreoElectronico:${this.CorreoElectronico}`;

    this.http.get<any>(url).subscribe(
      (response) => {
        const usuarios = response['Consulta de id'];

        if (!usuarios || usuarios.length === 0) {
          this.error = '❌ Correo electrónico no encontrado.';
          return;
        }

        const usuario = usuarios[0];
        const contrasenaBD = usuario.IdContraseñasContraseñas?.Contraseña;

        if (!contrasenaBD) {
          this.error = '❌ No se encontró la contraseña del usuario.';
          return;
        }

        if (this.ContrasenaCLIENTE === contrasenaBD) {
          console.log('✅ Inicio de sesión exitoso.');
          alert('Usuario iniciado con éxito');

          // ✅ Guardar datos del usuario
          localStorage.setItem('usuarioId', usuario.Id?.toString() || '');
          localStorage.setItem('usuarioNombre', usuario.Nombre || '');
          localStorage.setItem('usuarioApellido', usuario.Apellido || '');
          localStorage.setItem('CorreoUsuario', usuario.CorreoElectronico || '');

          // ✅ Guardar tipo de usuario de forma segura
          const tipoNombre = usuario.IdRolRol?.Nombre || '';
          this.IdTipoUsuario = tipoNombre;
          localStorage.setItem('usuarioTipo', JSON.stringify(tipoNombre));


          // ✅ Redirigir al inicio
          this.router.navigate(['/biblioteca']);
        } else {
          this.error = '❌ Contraseña incorrecta.';
        }
      },
      (error) => {
        this.error = '❌ Error al buscar el usuario. Intenta más tarde.';
        console.error('Error del servidor:', error);
      }
    );
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  recoverPassword(): void {
    alert('Función de recuperación aún no implementada.');
    this.router.navigate(['/recuperar']);
  }
}