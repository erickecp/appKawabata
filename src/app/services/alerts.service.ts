import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private toastC: ToastController,
    private alertCtrl: AlertController
  ) { }

  async generateToastSuccess(msn:string) {
    const toast = await this.toastC.create({
      header: msn,
      position: 'top',
      color: 'success',
      duration: 1000,
      icon: 'checkmark-circle'
    });
     await toast.present()
  }

  async generateToastError(msn:string) {
    const toast = await this.toastC.create({
      header: msn,
      position: 'top',
      color: 'danger',
      duration: 1000,
      icon: 'close-circle'
    });
     await toast.present()
  }

  async generateToastErrorQR(msn:string) {
    const toast = await this.toastC.create({
      header: msn,
      position: 'middle',
      color: 'danger',
      duration: 1500,
      icon: 'qr-code-outline'
    });
     await toast.present()
  }

  async showMessageOkCancel(title: string, message: string) {
    let choice
    const alert = await this.alertCtrl.create({
        header: title,
        subHeader: message,
        buttons: [ {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
                alert.dismiss(false);
                return false;
            }
        },
        {
          text: 'Aceptar',
          handler: () => {
              alert.dismiss(true)
              return false
          }
      },]
    });

    await alert.present();
    await alert.onDidDismiss().then((data) => {
        choice = data
    })
    return choice
}

async Image() {
  let choice
  const alert = await this.alertCtrl.create({
      header: 'Características para aprobación de fotografia',
      message: `
      <ol>
      <li>Cara descubierta</li>
      <li>Fotografía de frente</li>
      <li>Foto individual</li>
      <li>No selfie</li>
      <li>Fondo claro</li>
      </ol>
      `,
      buttons: [ {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
              alert.dismiss(false);
              return false;
          }
      },
      {
        text: 'Seleccionar',
        handler: () => {
            alert.dismiss(true)
            return false
        }
    },]
  });

  await alert.present();
  await alert.onDidDismiss().then((data) => {
      choice = data
  })
  return choice
}



}
