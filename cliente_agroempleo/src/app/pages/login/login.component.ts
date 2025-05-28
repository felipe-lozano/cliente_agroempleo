import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHeaderComponent } from '../components/user-header/user-header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RecuperarComponent } from '../recuperar/recuperar.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


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
      RouterModule,
      RouterModule
    ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router) {}
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

    const url = 'http://localhost:8080/v1/Usuarios?query=CorreoElectronico:' + this.email;
    this.http.get<any>(url).subscribe({
      next: res => {
        console.log('✔️ Usuario encontrado', res);
        this.password = res.contrasena;
        this.router.navigate(['/biblioteca']);
        },
      error: err => {
        console.error('❌ Error al buscar usuario', err);

    }})
  
    
    //valida la contraseña de los datos cargados del usuario encontrado con la ingresada por el usuario al cliente
    
   
    
    
  }
  recoverPassword(){
    alert('recuperando contraseña...');
  }
}
