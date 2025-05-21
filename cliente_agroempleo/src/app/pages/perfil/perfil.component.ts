import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserHeaderComponent } from "../components/user-header/user-header.component";

interface UserProfile {
  Nombre: string;
  Apellido: string;
  NDocumento: string;
  FechaNacimiento: string;  // ISO string
  CorreoElectronico: string;
  Ciudad: string;
  Departamento: string;
  Pais: string;
  Telefono: string;
}
@Component({
  selector: 'app-perfil',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserHeaderComponent
],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})

export class PerfilComponent implements OnInit {

  user?: UserProfile;
  loading = true;
  error = '';
  userId = 13;

  private apiUrl = 'http://localhost:8080/v1/Usuarios/' + this.userId;

   constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ "Consulta de id": UserProfile }>(this.apiUrl).subscribe({
      next: (data) => {
        // Extraemos el objeto que está dentro de "Consulta de id"
        this.user = data["Consulta de id"];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando perfil:', err);
        this.error = 'Error al cargar el perfil.';
        this.loading = false;
      }
    });
  }
  calcularEdad(fechaNacimiento: string): number {
    if (!fechaNacimiento) return 0; // No hay fecha, edad 0 o "sin datos"

    const fecha = new Date(fechaNacimiento);
    if (isNaN(fecha.getTime())) return 0; // Fecha inválida

    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const m = hoy.getMonth() - fecha.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) {
      edad--;
    }
    return edad;
  }



  nombreCompleto(): string {
    if (!this.user) return '';
    return `${this.user.Nombre} ${this.user.Apellido}`;
  }

  ubicacionCompleta(): string {
    if (!this.user) return '';
    return `${this.user.Ciudad}, ${this.user.Departamento}, ${this.user.Pais}`;
  }
}