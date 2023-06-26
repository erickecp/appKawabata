import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { EVENTS } from '../enums/sockets.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  constructor(private socket:Socket) {
    this.checkStatus()
   }

   checkStatus(){
    this.socket.on(EVENTS.CONNECT, () => {
      if(localStorage.getItem(environment.token)){
        this.emit(EVENTS.CONFIG_USER,{id:localStorage.getItem(environment.user)})
      }

    })

    this.socket.on(EVENTS.OFFLINE, () => {
    })
  }

  emit (event:string, payload?:any) {
    this.socket.emit(event, payload, (response: any) => {
      console.log('wsService > request > ' + event + ':', response);
    });
}


listen (event:string){
  return this.socket.fromEvent<number>(event)
}



}


