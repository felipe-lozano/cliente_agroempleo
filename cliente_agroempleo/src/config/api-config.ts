import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OfertaLaboral {
    id: number;
    titulo: string;
    empresa: string;
    experiencia: string;
    tipoContrato: string;
    jornada: string;
    modalidad: string;
}

@Injectable({
    providedIn: 'root'
})
export class Apiconfig {
    private apiUrl = 'http://localhost:3000/ofertas'; // URL de la API JSON
  
    constructor(private http: HttpClient) {}
  
    obtenerOfertas(): Observable<OfertaLaboral[]> {
      return this.http.get<OfertaLaboral[]>(this.apiUrl);
    }
}
export const API_URLS = {
    Mid:{
        Api_mid:'localhost:8085/v1'
        
    },
    Crud:{
        Api_crud:'https://postman-echo.com/post',
        Api_crud2:'https://jsonplaceholder.typicode.com/users'
    }
};