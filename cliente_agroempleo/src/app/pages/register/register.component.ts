import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ApiService } from '../../../Services/api.services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    MatCheckboxModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registroForm!: FormGroup;
  ciudadesFiltradas: string[] = [];

  paises: string[] = ['Colombia', 'Argentina', 'México'];

  departamentos: string[] = [
    'Antioquia',
    'Cundinamarca',
    'Valle del Cauca',
    'Atlántico',
    'Santander'
  ];

  ciudadesPorDepartamento: { [key: string]: string[] } = {
    'Antioquia': ['Medellín', 'Bello', 'Envigado', 'Itagüí'],
    'Cundinamarca': ['Bogotá', 'Soacha', 'Chía', 'Zipaquirá'],
    'Valle del Cauca': ['Cali', 'Palmira', 'Buenaventura', 'Tuluá'],
    'Atlántico': ['Barranquilla', 'Soledad', 'Malambo', 'Puerto Colombia'],
    'Santander': ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta']
  };

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      correo_electronico: ['', [Validators.required, Validators.email]],
      dia: ['', Validators.required],
      mes: ['', Validators.required],
      anio: ['', Validators.required],
      pais: ['Colombia', Validators.required],
      departamento: ['', Validators.required],
      ciudad: [{ value: '', disabled: true }, Validators.required],
      celular: ['', Validators.required],
      contrasena: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
      terminos: [false, Validators.requiredTrue]
    });

    this.registroForm.get('departamento')?.valueChanges.subscribe(depto => {
      this.ciudadesFiltradas = this.ciudadesPorDepartamento[depto] || [];

      const ciudadControl = this.registroForm.get('ciudad');
      ciudadControl?.reset();

      if (this.ciudadesFiltradas.length > 0) {
        ciudadControl?.enable();
      } else {
        ciudadControl?.disable();
      }
    });
  }

  aceptar() {
    if (this.registroForm.valid) {
      const contrasena = this.registroForm.value.contrasena;
      const confirmar = this.registroForm.value.confirmarContrasena;

      if (contrasena !== confirmar) {
        alert('Las contraseñas no coinciden');
        return;
      }

      console.log('Registro exitoso', this.registroForm.value);
      console.log('JSON formateado:\n', JSON.stringify(this.registroForm.value, null, 2));
      const json_register = JSON.stringify(this.registroForm.value);

      this.apiService.postData('registro', json_register).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          alert('Usuario creado');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al enviar POST:', error);
        }
      });

    } else {
      console.log('Formulario inválido');
    }
  }
}