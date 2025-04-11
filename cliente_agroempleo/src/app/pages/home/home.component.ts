
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFooterComponent } from '../components/user-footer/user-footer.component';
import { UserHeaderComponent } from '../components/user-header/user-header.component';


@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    UserFooterComponent,
    UserHeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // o puedes importar un CSS externo aquí
})
export class HomeComponent {}