import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  infoEstudent = {};

  constructor() { }

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
}
