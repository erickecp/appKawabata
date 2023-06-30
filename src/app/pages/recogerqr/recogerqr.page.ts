import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { PersonalAuthService } from 'src/app/services/personal-auth.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { FilaService } from 'src/app/services/fila.service';
import { filter, of } from 'rxjs';
import * as moment from 'moment';
import { SocketsService } from 'src/app/services/sockets.service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { EVENTS, ROOMS } from 'src/app/enums/sockets.enum';
import { Browser } from '@capacitor/browser';

const IMAGE_DIR = 'stored-images';

@Component({
  selector: 'app-recogerqr',
  templateUrl: './recogerqr.page.html',
  styleUrls: ['./recogerqr.page.scss'],
})
export class RecogerqrPage implements OnInit {
  public qrCodeImage!: string;
  student: any;
  authQ!: any;
  userId!: number;
  user: any;
  hora!: any;
  fecha!: any;
  autorizados: any[] = [];
  alumnosTutor: any[] = [];
  alumnosFila: any[] = [];
  alumnosQR: any[] = [];
  constructor(
    private alertS: AlertsService,
    private authS: AuthService,
    private personalS: PersonalAuthService,
    private filaS: FilaService,
    private socketsS: SocketsService
  ) {
    /* this.student = this.utilsS.getInfo();
    console.log(this.student);
    if(this.student){
      this.generateQRCode(this.student.nombres, this.student.apellidos);
    } */

    this.personalS.getActPer.subscribe((data) => {
      if (data) {
        this.obtenerAutorizados();
      }
    });

    this.getAleumnos();
    this.user = this.authS.getUser();
    this.obtenerAutorizados();
    this.socketsS.listen(EVENTS.FILAS).subscribe((res: any) => {
      const replace = this.alumnosFila.findIndex(
        (f) => String(f.studentIds) === String(res[0].studentIds)
      );
      if (replace !== -1) {
        this.alumnosFila[replace] = res[0];
      }
      // this.alumnosFila = res
    });
  }

  ngOnInit() {}

  asignAuth(ev: any) {}

  async descargarImagenBase64(
  ): Promise<void> {
    try {
      // Guarda la imagen en el directorio de descargas del dispositivo
      const fecha = moment().format('DD-MM-YYYY');
      const numeroAleatorio = Math.floor(Math.random() * 1000);
      const result = await Filesystem.writeFile({
        path: `${fecha}${numeroAleatorio}QR.jpeg`,
        data: this.qrCodeImage,
        directory: Directory.Documents,
      });
      this.alertS.generateToastSuccess('Imagen de QR descargada');
      Browser.open({
        url: result.uri,
      });

    } catch (error) {
      this.alertS.generateToastError('Error: ' + error);
    }
  }

  selectAlum(ev: any) {
    const alumno = ev.detail.value;
    const existe = this.alumnosQR.find((al: any) => al.id === alumno.id);
    if (existe) {
      this.alumnosQR = this.alumnosQR.filter((al: any) => al.id !== alumno.id);
    } else {
      this.alumnosQR = [alumno, ...this.alumnosQR];
    }
  }

  generarDataQR() {
    this.fecha = moment().format();
    const horaActual = moment();
    const horaFutura = horaActual.add(5, 'minutes');
    this.hora = horaFutura.format('HH:mm');
    let dataQR: any[] = [];
    let alumnos: any[] = [];
    this.alumnosQR.forEach((alumno: any, index: number) => {
      alumnos.push({
        nombre: alumno.nombres,
        apellido: alumno.apellidos,
        id: alumno.id,
      });
    });
    // dataQR.push({mode: 'byte', data: `"{recoje":"${this.authQ.nombre}"}`});
    //console.log(JSON.parse(dataQR[0].data));
    const obj = {
      alumnos: alumnos,
      autorizado: { nombre: this.authQ.nombre, id: this.authQ.id },
      fecha: this.fecha,
      hora: this.hora,
    };
    const QR = JSON.stringify(obj);
    return QR;
  }

  obtenerAutorizados() {
    this.personalS.getAll(this.userId).subscribe((resp: any) => {
      const items$ = of(...resp);
      items$
        .pipe(filter((item: any) => item.active === true))
        .subscribe((filteredItem) => {
          // Almacenar los items filtrados en el arreglo filteredItems
          this.autorizados.push(filteredItem);
        });
    });
  }

  async imageDw() {
    const writeSecretFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/qr.jpg`,
      data: this.qrCodeImage,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    console.log(writeSecretFile);
  }

  generateQRCode() {
    this.alertS
      .showMessageOkCancel(
        '¿Estas seguro de esta acción?',
        'Deseas recoger a estos alumnos?'
      )
      .then((res: any) => {
        if (res.data === true) {
          const info = this.generarDataQR();
          QRCode.toDataURL(
            info,
            {
              errorCorrectionLevel: 'H',
              type: 'image/jpeg',
              color: {
                dark: '#00394C',
                light: '#ffffff',
              },
            },
            (err, url) => {
              if (err) {
                return;
              }
              this.allToLine(this.alumnosQR);
              this.qrCodeImage = url;
              console.log(this.qrCodeImage);
            }
          );
        }
      });
  }

  allToLine(arrayAlumnos: any[]) {
    const ids: any[] = [];
    arrayAlumnos.map((alumnno) => {
      const n = {
        id: alumnno.id,
        autorizado: this.authQ,
        tutor: this.userId,
        fecha: this.fecha,
        hora: this.hora,
      };

      ids.push(n);
    }),
      this.filaS.postFila(ids).subscribe((alumnFilas: any) => {
        console.log(alumnFilas);
        if (alumnFilas.length) {
          this.alertS.generateToastSuccess('Alumnos en fila');
          // this.getList(this.nivelActivo);
        } else {
          this.qrCodeImage = '';
          this.alertS.generateToastSuccess(
            'Este o estos alumnos ya se encuentran en fila'
          );
        }
      });
  }

  getAleumnos() {
    this.userId = this.authS.getUserId();
    this.getAlumnosFila(this.userId);
    this.personalS.getAlumnos(this.userId).subscribe((resp: any) => {
      this.alumnosTutor = resp[0].estudiantes;

      if (this.alumnosFila.length > 0) {
      }

      // const resFilas = this.alumnosFila.filter(ob1 => this.alumnosTutor.some(ob2 => ob2.studentIds === ob1.id));

      // console.log('RESFILAS', resFilas);
    });
  }

  getAlumnosFila(id: any) {
    this.filaS.getSyudentsFilaTutor(id).subscribe((resp: any) => {
      this.alumnosFila = resp;
    });
  }
}
