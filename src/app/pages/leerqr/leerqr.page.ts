import { Component, OnInit } from '@angular/core';
import {
  BarcodeScanner,
  SupportedFormat,
} from '@capacitor-community/barcode-scanner';
import { PersonalAuthService } from '../../services/personal-auth.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { FilaService } from '../../services/fila.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { App } from '@capacitor/app';
import { AlertController } from '@ionic/angular';
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
    private readonly alertController: AlertController
  ) {}

  ngOnInit() {}

  closeScanner() {
    BarcodeScanner.stopScan();
  }

  async leerQR() {
    const resultPermisos = await BarcodeScanner.checkPermission({
      force: true,
    });

    if (resultPermisos.denied) {
      const alert = await this.alertController.create({
        header: 'Permisos',
        message:
          'La aplicación necesita permisos para acceder a la cámara, ¿Desea ir a configuración?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {},
          },
          {
            text: 'Ir a configuración',
            handler: () => {
              BarcodeScanner.openAppSettings();
            },
          },
        ],
      });

      await alert.present();

      return;
    }

    BarcodeScanner.prepare();
    App.addListener('backButton', () => {
      this.detenerEscanner();
    });

    BarcodeScanner.hideBackground();

    document.body.classList.add('qrscanner');
    document.querySelector('body')?.classList?.add('scanner-active');

    const fechformat = moment().format();
    const fecha = moment(fechformat, 'YYYY-MM-DD');
    const horaActual = moment();

    const result = await BarcodeScanner.startScan({
      targetedFormats: [SupportedFormat.QR_CODE],
    }); // start scanning and wait for a result

    this.detenerEscanner();

    // if the result has content
    if (result.hasContent) {
      const datqr = JSON.parse(result.content);
      const horaQRPOST = moment(datqr.hora, 'HH:mm').add(5, 'hours').toDate();
      const dateQR = moment(datqr.fecha, 'YYYY-MM-DD');

      // Verificar si hora1 es anterior a hora2
      const esIgualFecha = fecha.isSame(dateQR);
      const esHoraAnterior = horaActual.isBefore(horaQRPOST);
      if (!esIgualFecha || !esHoraAnterior) {
        this.alerts.generateToastErrorQR('El QR ha expirado!');
        return;
      }

      this.info = datqr;
      this.getAutorizado();
    }
  }

  async leerQR2() {
    const resultPermisos = await BarcodeScanner.checkPermission({
      force: true,
    });

    const fechformat = moment().format();
    const fecha = moment(fechformat, 'YYYY-MM-DD');
    const horaActual = moment();

    const result = await BarcodeScanner.startScan({}); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      const datqr = JSON.parse(result.content);
      const horaQRPOST = moment(datqr.hora, 'HH:mm').add(1, 'hours').toDate();
      const dateQR = moment(datqr.fecha, 'YYYY-MM-DD');

      // Verificar si hora1 es anterior a hora2
      const esIgualFecha = fecha.isSame(dateQR);
      const esHoraAnterior = horaActual.isBefore(horaQRPOST);
      if (!esIgualFecha || !esHoraAnterior) {
        this.alerts.generateToastErrorQR('El QR ha expirado!');
        return;
      }

      this.info = datqr;
      this.getAutorizado();
    }
  }

  async detenerEscanner() {
    await BarcodeScanner.stopScan();
    await BarcodeScanner.showBackground();
    document.body.classList.remove('qrscanner');
    document.querySelector('body')?.classList?.remove('scanner-active');

    await App.removeAllListeners();
  }

  async getAutorizado() {
    document.querySelector('body')!.classList.remove('scanner-active');
    this.authS.getInfoAuth(this.info.autorizado.id).subscribe((info) => {
      this.personaAuth = info;
    });
  }

  getImage(name: string) {
    return `${this.imgUrl}${name}`;
    // this.gs.get(`http://localhost:3006/api/maestros/file/${name}`).subscribe(
  }

  aceptarAutorizado() {
    const data = {
      alumnos: this.info.alumnos,
      autorizado: this.personaAuth,
      estado: 1,
    };

    this.filaS.changeState(data).subscribe((res: any) => {
      if (res.length) {
        this.alerts.generateToastSuccess('Notificacion enviada a SALON!');
        this.personaAuth = null;
        this.info = null;
      }
    });
  }
}
