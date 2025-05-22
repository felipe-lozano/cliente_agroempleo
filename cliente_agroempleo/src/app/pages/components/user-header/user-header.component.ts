import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../../../usuario.service';

@Component({
  selector: 'app-user-header',
  imports: [
    RouterModule
  ],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
  isMenuOpen = false;
  Nombre: string = '';
  avatarUrl: string = '/img.png';

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    const usuarioId: number = 24;
    console.log("ngOnInit cargado");

    this.usuarioService.obtenerUsuario(usuarioId).subscribe(usuario => {
    console.log("Usuario obtenido:", usuario);
    this.Nombre = usuario["Consulta de id"].Nombre;
    this.avatarUrl = usuario.avatar || '/img.png';
    console.log("Nombre:", this.Nombre);
    });
  }
}

