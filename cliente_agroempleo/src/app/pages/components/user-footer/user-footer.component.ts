import { Component } from '@angular/core';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.css']
})
export class UserFooterComponent {
  email: string = '';

  suscribirse() {
    if (this.email) {
      console.log('Correo suscrito:', this.email);
      // Aquí podés conectar con un servicio para manejar la suscripción real.
    } else {
      alert('Por favor ingresa un correo electrónico válido.');
    }
  }
}
