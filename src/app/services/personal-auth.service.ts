import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PersonalAuthService {
  getNewPer: EventEmitter<any> = new EventEmitter();
  getDelPer: EventEmitter<any> = new EventEmitter();
  getUpdPer: EventEmitter<any> = new EventEmitter();
  URLAPI = environment.URLAPI;
  constructor(
    private http: HttpClient
  ) { }

  getAll(id: number){
    return this.http.get(`${this.URLAPI}/personal-autorizado/porTutor/${id}`);
  }

  postAuth(body: any){
    return this.http.post(`${this.URLAPI}/personal-autorizado/nuevoPersonal`, body);
  }

  deletePersonal(id:number){
    return this.http.delete(`${this.URLAPI}/personal-autorizado/${id}`);
  }

  updatePersonal(id:number, body: any){
    return this.http.put(`${this.URLAPI}/personal-autorizado/updatePersonal/${id}`, body);
  }

  getAlumnos(id:number){
    return this.http.get(`${this.URLAPI}/estudiante/tutor/${id}`);

  }

  setSTU(user: any) {
    this.getNewPer.emit(user);
  }
  setDELPER(user: any) {
    this.getDelPer.emit(user);
  }
  setUPDPER(user:any){
    this.getUpdPer.emit(user)
  }
}
