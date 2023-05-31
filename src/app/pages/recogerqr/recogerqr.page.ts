import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { UtilsService } from '../../services/utils.service';
import { PersonalAuthService } from 'src/app/services/personal-auth.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { FilaService } from 'src/app/services/fila.service';
import { FileSaverService } from 'ngx-filesaver';
import { filter, of } from 'rxjs';
import * as moment from 'moment';
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
  user:any;
  hora!: any;
  fecha!: any;
  autorizados: any[] = [];
  alumnosTutor: any[] = [];
  alumnosFila: any[] = [];
  alumnosQR: any[] = [];
  constructor(
    private alertS: AlertsService,
    private authS: AuthService,
    private personalS:PersonalAuthService,
    private filaS: FilaService,
    private _FileSaverService: FileSaverService
  ) {
    /* this.student = this.utilsS.getInfo();
    console.log(this.student);
    if(this.student){
      this.generateQRCode(this.student.nombres, this.student.apellidos);
    } */

    this.personalS.getActPer.subscribe(data => {
      if(data){
        this.obtenerAutorizados();
      }
    })

    this.getAleumnos();
    this.user = this.authS.getUser();
    this.obtenerAutorizados();
  }

  ngOnInit() {
  }

  asignAuth(ev: any){

  }

  selectAlum(ev: any){
    const alumno = ev.detail.value;
    const existe = this.alumnosQR.find((al: any) => al.id === alumno.id);
    if(existe){
      this.alumnosQR = this.alumnosQR.filter((al: any)=> al.id !== alumno.id);
    } else{
      this.alumnosQR = [alumno, ...this.alumnosQR];
    }

  }


  generarDataQR(){
    this.fecha = moment().format();
    const horaActual = moment();
    const horaFutura = horaActual.add(5, 'minutes');
    this.hora = horaFutura.format('HH:mm');
    console.log(this.hora);
    console.log(this.fecha);
    let dataQR: any[] = [];
    let alumnos: any[] = [];
    this.alumnosQR.forEach((alumno: any, index: number) => {
      alumnos.push({nombre: alumno.nombres , apellido: alumno.apellidos, id: alumno.id});
    });
    // dataQR.push({mode: 'byte', data: `"{recoje":"${this.authQ.nombre}"}`});
    //console.log(JSON.parse(dataQR[0].data));
    const obj = {
      alumnos : alumnos,
      autorizado: {nombre: this.authQ.nombre, id: this.authQ.id},
      fecha: this.fecha,
      hora: this.hora,
    }
    const QR = JSON.stringify(obj); ;
    return QR;
  }

  obtenerAutorizados(){
    this.autorizados = []
    this.personalS.getAll(this.userId).subscribe(
      (resp: any) => {
        const items$ = of(...resp);
        items$
        .pipe(filter((item: any) => item.active === true))
        .subscribe(filteredItem => {
          // Almacenar los items filtrados en el arreglo filteredItems
          this.autorizados.push(filteredItem);
        });
        const newobj = { nombre: this.user.nombres, id: this.user.id}
        this.autorizados.push(newobj);
      }
    )
  }


  imageDw(){
    const link = document.createElement('a');
    link.href = this.qrCodeImage ; // Reemplaza 'ruta_de_tu_imagen' por la URL o ruta de la imagen generada
    link.download = 'nombre_imagen.png'; // Reemplaza 'nombre_imagen.png' por el nombre que deseas darle a la imagen descargada
    link.click();
  }




  generateQRCode(){


    this.alertS.showMessageOkCancel(
      '¿Estas seguro de esta acción?',
      'Deseas recoger a estos alumnos?'
    ).then((res: any) => {
      if(res.data === true){
        const  info = this.generarDataQR();
        QRCode.toDataURL(
        info ,
         {
        errorCorrectionLevel : 'H',
        type : 'image/jpeg' ,
        color: {
          dark : '#00394C',
          light : '#ffffff'
        }
    } , (err, url) => {
      if(err){
        return;
      }
      console.log(this.alumnosQR);
      this.allToLine(this.alumnosQR);
      this.qrCodeImage = url;
      // console.log(this.qrCodeImage);
    })
      }
    })


  }


  allToLine(arrayAlumnos: any[]){

    const ids:any[] = [];
    arrayAlumnos.map(alumnno => {
      const n = {
        id: alumnno.id ,
        autorizado: this.authQ,
        tutor: this.userId,
        fecha: this.fecha,
        hora: this.hora
      }

      ids.push(n)
     }),
     console.log(ids);

    this.filaS.postFila(ids).subscribe(
      (alumnFilas: any) => {
        if(alumnFilas.length){
          console.log('Info', alumnFilas)
          this.alertS.generateToastSuccess(
            'Alumnos en fila'
          );
          // this.getList(this.nivelActivo);
        } else {
          this.qrCodeImage = '';
          this.alertS.generateToastSuccess(
            'Este o estos alumnos ya se encuentran en fila'
          );
        }
      }
     )
  }

  getAleumnos(){
    this.userId = this.authS.getUserId();
    this.getAlumnosFila(this.userId);
    this.personalS.getAlumnos(this.userId).subscribe(
      (resp: any) => {
        this.alumnosTutor = resp[0].estudiantes;

        if(this.alumnosFila.length > 0){
      }

          // const resFilas = this.alumnosFila.filter(ob1 => this.alumnosTutor.some(ob2 => ob2.studentIds === ob1.id));

          // console.log('RESFILAS', resFilas);


      }
      )
    }

    getAlumnosFila(id: any){
      this.filaS.getSyudentsFilaTutor(id).subscribe(
        (resp: any) => {
          this.alumnosFila = resp;
          console.log('RESFILAS', this.alumnosFila)
      }
    )
  }

}
