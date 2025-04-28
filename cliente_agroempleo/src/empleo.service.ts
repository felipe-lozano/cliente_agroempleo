import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OfertaLaboral {
  id: number;
  TituloPuesto: string;
  DescripcionTrabajo: string;
  Cargo: string;
  Salario: string;
  Modalidad: string;
  NivelRequerido: string;
  ExperienciaRequrida: string;
  NumeroVacantes: string;
  IdTipoEmpleoTipoDeEmpleo: string;
  IdCiudadTrabajoCiudad: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmpleoService {
  private apiUrl = 'http://localhost:3000/ofertas'; // URL de la API JSON

  constructor(private http: HttpClient) {}

  obtenerOfertas(): Observable<OfertaLaboral[]> {
    return this.http.get<OfertaLaboral[]>(this.apiUrl);
  }
}