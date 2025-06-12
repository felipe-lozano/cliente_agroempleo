import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { UserHeaderComponent } from "../components/user-header/user-header.component";

@Component({
  selector: 'app-postulacion',
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    UserHeaderComponent
],
  templateUrl: './postulacion.component.html',
  styleUrl: './postulacion.component.css'
})
export class PostulacionComponent {
 postulacionForm!: FormGroup;
  Id_usuarios = localStorage.getItem('usuarioId') || '';
 

  constructor(private fb: FormBuilder, private http: HttpClient ) {
   this.postulacionForm = this.fb.group({
    TituloPuesto: ['', Validators.required],
    Cargo: ['', Validators.required],
    DescripcionTrabajo: ['', Validators.required],
    Salario: ['', Validators.required],
    Modalidad: ['', Validators.required],
    NivelRequerido: ['', Validators.required],
    ExperienciaRequrida: ['', Validators.required],
    NumeroVacantes: ['', Validators.required],
    Horario: ['', Validators.required],
    IdtipoempleoTipodeempleo: ['', Validators.required],
    Idciudadtrabajociudad: ['', Validators.required]
  });
  }

  onSubmit() {
  
  if (this.postulacionForm.valid) {
    const form = this.postulacionForm.value;

    const datos = {
      TituloPuesto: form.TituloPuesto,
      Cargo: form.Cargo,
      DescripcionTrabajo: form.DescripcionTrabajo,
      Salario: form.Salario,
      Modalidad: form.Modalidad,
      NivelRequerido: form.NivelRequerido,
      ExperienciaRequrida: form.ExperienciaRequrida,
      NumeroVacantes: form.NumeroVacantes,
      Horario: form.Horario,
      Idciudadtrabajociudad: {
        Id: Number(form.Idciudadtrabajociudad)
      },
      IdtipoempleoTipodeempleo: {
        Id: Number(form.IdtipoempleoTipodeempleo)
      },
      Id_usuarios: Number(this.Id_usuarios)

    };

    console.log('Enviando datos:', datos);
    const json_register = JSON.stringify(datos);
    console.log('JSON formateado:\n', json_register);


    this.http.post('http://localhost:8083/v1/Vacantes', datos).subscribe(
      res => console.log('✔️ Enviado correctamente', res),
      err => console.error('❌ Error al enviar', err)
    );
    }
  }
}

