import { Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})

//metodo get general
export class Apiservice{
    constructor(private http: HttpClient){}
    get<T>(url: string): Observable<T>{
        return this.http.get<T>(url);
    }
    //metodo post general
    post<T>(url: string, data: any): Observable<T>{
        return this.http.post<T>(url, data);
    }
    //metodo put general
    put<T>(url: string, data: any): Observable<T>{
        return this.http.put<T>(url, data);
    }
    //metodo delete general
    delete<T>(url: string): Observable<T>{
        return this.http.delete<T>(url);
    }

    

}




