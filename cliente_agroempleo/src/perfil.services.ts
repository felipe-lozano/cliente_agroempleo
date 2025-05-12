import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface informacion {
  nombre: string;
  ciudad: string;
  email: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://localhost:8080/v1/Usuarios';
  

  constructor(private http: HttpClient) {}

  
}