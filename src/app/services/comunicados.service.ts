import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComunicadosService {
  URLAPI = environment.URLAPI;
  constructor(
    private http: HttpClient
  ) { }

  getComunicados(dep:string | string[]) {
    return this.http.get(`${this.URLAPI}/blog/filter/?dep=${dep}`);

  }
}
