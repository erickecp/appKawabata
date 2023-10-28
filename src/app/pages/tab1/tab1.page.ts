import { Component, ViewChild } from '@angular/core';

import { PersonalAuthService } from 'src/app/services/personal-auth.service';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { FilaService } from 'src/app/services/fila.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { environment } from 'src/environments/environment';
import { SocketsService } from 'src/app/services/sockets.service';
import { EVENTS } from 'src/app/enums/sockets.enum';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
@ViewChild('segment', { static: true }) segment!: IonSegment

  backgroundUrl = './assets/descarga.png';
  userId!: number;
  urlImg = environment.URLAPIIMG;
  user!: any;
  color = 'primary';
  salidas = ['Puerta 1', 'Puerta 2'];
  alumnosTutor: any[] = [];
  puerta = '';
  alumnosTutorFiltrados: any[] = [];
  constructor(
    private personalS: PersonalAuthService,
    private alerts: AlertsService,
    private authS: AuthService,
    private utilsS: UtilsService,
    private filaS: FilaService,
    private navigate: Router,
    private sockets: SocketsService
  ) {
    this.sockets.listen(EVENTS.FILAS).subscribe((res: any) => {
      this.getAleumnos();
      if (res) {
        if (
          res[0].student &&
          Number(res[0]?.student?.nivel) === 11 &&
          Number(res[0]?.student?.grado) >= 3
        ) {
          this.segmentChanged({ detail: { value: 'Puerta 2' } });
        } else {
          this.segmentChanged({ detail: { value: 'Puerta 1' } });
        }
      }
    });
    this.getAleumnos();
  }


  segmentChanged(e: any) {
    this.segment.value = e.detail.value;
    this.alumnosTutorFiltrados = this.alumnosTutor;
    this.puerta = e.detail.value;
    if (this.puerta === 'Puerta 2') {
      this.alumnosTutorFiltrados = this.alumnosTutorFiltrados.filter(
        (al) => Number(al.student.nivel) === 11 && Number(al.student.grado) >= 3
      );
    } else {
      this.alumnosTutorFiltrados = this.alumnosTutorFiltrados.filter(
        (al) => Number(al.student.nivel) !== 11 && Number(al.student.grado) < 3
      );
      console.log('Filtrados', this.alumnosTutorFiltrados);
    }
    // this.alumnosTutorFiltrados = [];
  }

  enviaraFila(alumno: any) {
    const alumnosFila = [];
    let msn = '';
    if (alumno.estado === 0) {
      msn = 'Notificando al salón!';
    } else if (alumno.estado === 1) {
      msn = 'Alumno enviado a FILA!';
    } else if (alumno.estado === 2) {
      msn = 'Alumno listo para ser ENTREGADO';
    } else if (alumno.estado === 3) {
      msn = `${alumno.student.nombres} ENTREGADO`;
    }
    alumnosFila.push(alumno.student);
    const data = {
      alumnos: alumnosFila,
      autorizado: alumno.auth,
      estado: alumno.estado + 1,
    };

    this.filaS.changeState(data).subscribe((res: any) => {
      if (res.length) {
        this.alerts.generateToastSuccess(msn);
        this.getAleumnos();
      }
    });
  }

  recoger(estu: any) {
    this.utilsS.enviarinfo(estu);
    this.navigate.navigateByUrl('recogerqr');
  }

  getAleumnos() {
    const tipouser = this.authS.getTipoUser();
    this.userId = this.authS.getUserId();
    this.user = this.authS.getUser();
    if (tipouser === 'FILA') {
      this.filaS.alumnosfila().subscribe((resp: any) => {
        console.log('REPS', resp);
        this.alumnosTutor = resp;
        this.alumnosTutorFiltrados = resp;
      });
    } else if (tipouser === 'ENTREGAR') {
      this.filaS.alumnosfila3().subscribe((resp: any) => {
        this.alumnosTutor = resp;
        this.alumnosTutorFiltrados = resp;
      })
    } else {
      this.filaS
        .getSyudentsFila(this.user.grupoAsignado, this.userId)
        .subscribe((resp: any) => {
          this.alumnosTutor = resp;
          this.alumnosTutorFiltrados = resp;
          console.log(this.alumnosTutorFiltrados);
        });
    }
  }

  getNivel(nivel: any, grado: any) {
    if (Number(nivel) === 11) {
      if (Number(grado) <= 3) {
        return 'Primaria Baja';
      } else {
        return 'Primaria Alta';
      }
    } else if (Number(nivel) === 9) {
      return 'Preescolar';
    } else {
      return 'Secundaria';
    }

    return 'default';
  }

  getColor(estado: string) {
    const obj: any = {
      0: {
        color: 'medium',
        estate: 'Avisar a Salón',
      },
      1: {
        color: 'medium',
        estate: 'Enviar a Fila',
      },
      2: {
        color: 'tertiary',
        estate: 'Confirmar en Fila',
      },
      3: {
        color: 'warning',
        estate: 'Listo para entregar',
      },
      4: {
        color: 'success',
        estate: 'Entregado',
      },
    };
    return obj[estado];
  }

  getImage(name: string) {
    if (name === null || name === undefined) {
      return './assets/descarga.png';
    }
    return `${this.urlImg}${name}`;
    // this.gs.get(`http://localhost:3006/api/maestros/file/${name}`).subscribe(
  }
}
