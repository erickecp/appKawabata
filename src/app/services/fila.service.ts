import { HttpClient } from '@angular/common/http';
import { Injectable , EventEmitter} from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FilaService {
  getDelFil: EventEmitter<any> = new EventEmitter();
  URLAPI = environment.URLAPI;
  constructor(
    private http: HttpClient,
  ) { }

  postFila(alumnos: any[]){
    return this.http.post(`${this.URLAPI}/filas/alltoline`, alumnos);
  }

  getSyudentsFila(term: any, id: any){
    return this.http.get(`${this.URLAPI}/filas/alumnos/${id}?term=${term}`);
  }
  getSyudentsFilaTutor(id: any){
    return this.http.get(`${this.URLAPI}/filas/alumnos/${id}`);
  }
  alumnosfila(){
    return this.http.get(`${this.URLAPI}/filas/alumnosfila`);
  }
  alumnosfila3(){
    return this.http.get(`${this.URLAPI}/filas/alumnosfila3`);
  }

  changeState(data: any) {
    return this.http.patch(`${this.URLAPI}/filas/changeState`, data);
  }

  setDELFILA(fila: any) {
    this.getDelFil.emit(fila);
  }
}
