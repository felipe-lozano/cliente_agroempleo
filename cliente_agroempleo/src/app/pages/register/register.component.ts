import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Apiservice } from '../../../Services/api.service';
import { API_URLS } from '../../../config/api-config';



@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private apiService: Apiservice) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required,],
      lastName: ['', Validators.required,],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required,],
      password: ['', [Validators.required, Validators.minLength(6), ]],
      confirmPassword: ['', Validators.required]

    });
  }
  register() {
    if (this.registerForm.valid) {
      console.log('registro exitoso')
      const formData = this.registerForm.value;
      console.log('datos capturador',formData)
      
      const extededData ={
        ...formData,
        fecha_creacion: new Date ().toISOString(),
        role:'user',

        
      }
      console.log('dato extendido',extededData)
      this.apiService.post(API_URLS.Crud.Api_crud, extededData).subscribe({
        next: (response)=>{
          console.log('Registro exitoso', Response)
          alert('se creo el usuario')
          this.goToDashboard()
        }, 
        error:(error) => {
          console.error('Error al crear el usuario',error)
          alert('Hubo un error creando el usuario')
        }
      })
      
      const jsonData = JSON.stringify(formData,null,2)

      console.log("datos json",jsonData)

    }
  }

  goToDashboard(){
    console.log('falta ajustar el constructor de la ruta')  
    this.router.navigate(['/dashboard']); // redirecciona a la pagina de dashboard
  }




}



