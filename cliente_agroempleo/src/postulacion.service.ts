import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostulacionService {
  private apiUrl = 'https://tu-api.com/api/postulaciones'; // 🔁 Reemplaza por tu URL real

  constructor(private http: HttpClient) {}

  postularse(idUsuario: number, idOferta: number) {
    const body = {
      id_usuario: idUsuario,
      id_empleo: idOferta
    };
    return this.http.post(this.apiUrl, body);
  }
}