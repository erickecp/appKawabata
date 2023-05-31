import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { filter } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PersonalAuthService {
  getNewPer: EventEmitter<any> = new EventEmitter();
  getDelPer: EventEmitter<any> = new EventEmitter();
  getUpdPer: EventEmitter<any> = new EventEmitter();
  getActPer: EventEmitter<any> = new EventEmitter();
  URLAPI = environment.URLAPI;
  constructor(
    private http: HttpClient
  ) { }

  getAll(id: number){
    return this.http.get(`${this.URLAPI}/personal-autorizado/porTutor/${id}`)
  }

  getAllFilter(id: number){
    console.log('LLAMADO');
    return this.http.get(`${this.URLAPI}/personal-autorizado/porTutor/${id}`).pipe(
      filter((response: any) => response.active === true)
    )
  }

  getAllAuth(id: number){
    return this.http.get(`${this.URLAPI}/personal-autorizado/porTutor/${id}`)
  }

  getInfoAuth(id: number | string) {
    console.log('LLEGO POR ACA!')
    return this.http.get(`${this.URLAPI}/personal-autorizado/auth/${id}`)
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

  activar(id:number | string , body: { active : boolean }){
    return this.http.patch(`${this.URLAPI}/personal-autorizado/active/${id}`, body);
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

  setACTIVEPER(user: any){
    this.getActPer.emit(user)
  }
}
