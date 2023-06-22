import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { PersonalAuthService } from '../../services/personal-auth.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { FilaService } from '../../services/fila.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-leerqr',
  templateUrl: './leerqr.page.html',
  styleUrls: ['./leerqr.page.scss'],
})
export class LeerqrPage implements OnInit {
  info: any;
  imgUrl = environment.URLAPIIMG;
  personaAuth: any;
  alumnos: any[] = [];
  constructor(
    private alerts: AlertsService,
    private authS: PersonalAuthService,
    private filaS: FilaService,
  ) { }

  ngOnInit() {
  }

  closeScanner() {
    BarcodeScanner.stopScan();
  }




  async leerQR(){
    BarcodeScanner.hideBackground();
    document.body.classList.add("qrscanner");
    const fechformat = moment().format();
    const fecha = moment(fechformat, 'YYYY-MM-DD');
    const horaActual = moment();
    const horaExacta = horaActual.format('HH:mm');

    const result = await BarcodeScanner.startScan();// start scanning and wait for a result

    // if the result has content
   if (result.hasContent) {
    document.body.classList.remove("qrscanner");
    document.querySelector('body')?.classList?.remove('scanner-active');
    const datqr = JSON.parse(result.content);
    const formatDate = moment(datqr.fecha, 'YYYY-MM-DD');
    const hora1 = moment(datqr.hora, 'HH:mm');
    const hora2 = moment(horaExacta, 'HH:mm');
    // Verificar si hora1 es anterior a hora2
    const esAnterior = hora1.isBefore(hora2);
    const esIgual = fecha.isSame(formatDate);

      this.info = datqr;
      this.getAutorizado();
    }

  }

  async getAutorizado(){
    document.querySelector('body')!.classList.remove('scanner-active');
    this.authS.getInfoAuth(this.info.autorizado.id).subscribe(info => {
      console.log(info);
      this.personaAuth = info;
    })
  }

  getImage(name: string){
    return `${this.imgUrl}${name}`;
 // this.gs.get(`http://localhost:3006/api/maestros/file/${name}`).subscribe(
 }

 aceptarAutorizado(){

  const data = {
    alumnos : this.info.alumnos,
    autorizado: this.personaAuth,
    estado: 1
  }

  console.log(data);

  this.filaS.changeState(data).subscribe( (res: any) => {
    console.log(res);
    if(res.length){
      this.alerts.generateToastSuccess('Notificacion enviada a SALON!');
      this.personaAuth = null;
      this.info = null;
    }

  });

 }


}
