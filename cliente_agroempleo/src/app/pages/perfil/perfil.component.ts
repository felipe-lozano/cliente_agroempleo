import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-perfil',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})

export class PerfilComponent implements OnInit {
  editMode = false;
  perfilForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: ['María López'],
      titulo: ['Desarrolladora Frontend'],
      ubicacion: ['Ciudad de México, México'],
      correo: ['maria.lopez@example.com'],
      telefono: ['+52 555 123 4567'],
      experiencia: ['3 años en desarrollo Angular y diseño UI/UX.'],
      educacion: ['Licenciatura en Ingeniería en Sistemas - UNAM'],
      habilidades: ['Angular, TypeScript, Figma, Git, REST API']
    });
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
  }

  guardar(): void {
    this.editMode = false;
    console.log('Perfil guardado:', this.perfilForm.value);
  }
}