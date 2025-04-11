import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHeaderComponent } from '../components/user-header/user-header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    UserHeaderComponent
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData = {
    role: '',
    fullname: '',
    documentType: '',
    documentNumber: '',
    email: '',
    address: '',
    city: '',
    department: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    password: '',
    confirmPassword: ''
  };

  onSubmit(): void {
    if (this.formData.password !== this.formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Aquí podrías enviar los datos a un backend o servicio
    console.log('Formulario enviado:', this.formData);
    alert('¡Formulario enviado correctamente!');
  }

  onReset(): void {
    this.formData = {
      role: '',
      fullname: '',
      documentType: '',
      documentNumber: '',
      email: '',
      address: '',
      city: '',
      department: '',
      birthDay: '',
      birthMonth: '',
      birthYear: '',
      password: '',
      confirmPassword: ''
    };
    alert('¡registro cancelado!');

  }
}
