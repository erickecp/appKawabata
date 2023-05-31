import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TutoresService {
  URLAPI = environment.URLAPI;

  constructor(
    private http: HttpClient
  ) {

   }
   fotoPerfil(id: number | string , data: any){
    return this.http.patch(`${this.URLAPI}/tutores/fotoPerfil/${id}`, data)
  }
}
