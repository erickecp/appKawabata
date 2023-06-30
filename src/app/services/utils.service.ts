import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  infoEstudent = {};
  public Uri = environment.URLAPI;

  constructor(
    private http: HttpClient,
  ) { }

  enviarinfo(res: any){
    this.infoEstudent = res;
  }

  getInfo(){
    if(this.infoEstudent){
      return this.infoEstudent
    } else {
      return null;
    }
  }

  delete(ruta: string, id: number) {
    return this.http.delete(this.Uri + ruta + '/' + id);
  }

  update<T>(ruta: string, id: number, data: any): Observable<T> {
    return this.http.patch<T>(this.Uri + ruta + '/' + id, data);
  }

  patch<T>(ruta: string, data: any): Observable<T> {
    return this.http.patch<T>(this.Uri + ruta, data);
  }

  put<T>(ruta: string, data: any): Observable<T> {
    return this.http.put<T>(this.Uri + ruta, data);
  }

  post<T>(ruta: string, data: any): Observable<T> {
    return this.http.post<T>(this.Uri + ruta, data);
  }
}
