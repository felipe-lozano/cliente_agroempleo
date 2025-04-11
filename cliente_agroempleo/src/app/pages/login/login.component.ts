import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHeaderComponent } from '../components/user-header/user-header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RecuperarComponent } from '../recuperar/recuperar.component';

const routes: Routes = [
  { path: 'recuperar', component: RecuperarComponent },
  // otras rutas
];


@Component({
  selector: 'app-login',
   imports: [
      CommonModule,
      UserHeaderComponent,
      FormsModule,
      RouterModule
    ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    // Aquí puedes llamar a un servicio o manejar el login
    console.log({
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe,
    });
  }
  recoverPassword(){
    alert('recuperando contraseña...');
  }
}
