import { Component } from '@angular/core';

import { Share } from '@capacitor/share';
import { PersonalAuthService } from 'src/app/services/personal-auth.service';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { FilaService } from 'src/app/services/fila.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { environment } from 'src/environments/environment';
import { SocketsService } from 'src/app/services/sockets.service';
import { EVENTS } from 'src/app/enums/sockets.enum';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})



export class Tab1Page {
  backgroundUrl = './assets/descarga.png'
  userId!: number;
  urlImg= environment.URLAPIIMG;
  user!: any;
  color = 'primary';
  alumnosTutor: any[] = [];
  constructor(
    private personalS:PersonalAuthService,
    private alerts: AlertsService,
    private authS: AuthService,
    private utilsS:UtilsService,
    private filaS: FilaService,
    private navigate: Router,
    private sockets: SocketsService
  ) {
    this.sockets.listen(EVENTS.FILAS).subscribe( (res: any) => {
      console.log('REPUESTA SOCKET',  res)
      this.getAleumnos();
    })
    this.getAleumnos();
  }

enviaraFila(alumno: any){
 const alumnosFila = [];
 let msn = '';
 if(alumno.estado === 0){
  msn = 'Notificando al salón!';
 }
 else if(alumno.estado === 1){
  msn = 'Alumno enviado a FILA!';
 }else if(alumno.estado === 2) {
  msn = 'Alumno listo para ser ENTREGADO';
}else if(alumno.estado === 3) {
   msn = `${alumno.student.nombres} ENTREGADO`;

 }
 alumnosFila.push(alumno.student);
 console.log(alumnosFila);
  const data = {
    alumnos : alumnosFila,
    autorizado: alumno.auth,
    estado: alumno.estado + 1
  };

  console.log(data);

  this.filaS.changeState(data).subscribe( (res: any) => {
    console.log(res);
    if(res.length){
      this.alerts.generateToastSuccess(msn);
      this.getAleumnos();
    }

  });
}

recoger(estu: any){
  this.utilsS.enviarinfo(estu);
  this.navigate.navigateByUrl('recogerqr')

}

getAleumnos(){
  const tipouser = this.authS.getTipoUser();
  this.userId = this.authS.getUserId();
  this.user = this.authS.getUser();
  console.log(this.userId);
  console.log(tipouser);
  if(tipouser === 'FILA'){
    this.filaS.alumnosfila().subscribe(
      (resp: any) => {
        console.log(resp);
         this.alumnosTutor = resp;
      }
    )
  }else if(tipouser === 'ENTREGAR'){
    this.filaS.alumnosfila3().subscribe(
      (resp: any) => {
        console.log(resp);
         this.alumnosTutor = resp;
      }
    )
  } else {
    console.log(this.userId)
  this.filaS.getSyudentsFila(this.user.grupoAsignado, this.userId).subscribe(
    (resp: any) => {
      console.log(resp);
       this.alumnosTutor = resp;
    }
  )
}
}

getColor(estado: string){
  const obj: any = {
    0: {
      color: 'medium',
      estate: 'Avisar a Salon'
    },
    1: {
      color: 'medium',
      estate: 'Enviar a Fila'
    },
    2: {
      color: 'tertiary',
      estate: 'Confirmar en Fila'
    },
    3: {
      color: 'warning',
      estate: 'Listo para entregar'
    },
    4: {
      color: 'success',
      estate: 'Entregado'
    },
  }
  return obj[estado];
}



getImage(name: string){
  if(name === null || name === undefined){
    return './assets/descarga.png'
  }
  return `${this.urlImg}${name}`;
// this.gs.get(`http://localhost:3006/api/maestros/file/${name}`).subscribe(
}

}
