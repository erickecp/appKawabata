import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
  Channel,
} from '@capacitor/push-notifications';
import { Platform, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { UtilsService } from '../services/utils.service';

@Injectable({ providedIn: 'root' })
export class PushNotificationConfig {
  constructor(
    private genericS: UtilsService,
    private router: Router,
    private toast: ToastController
  ) {}

  private token: string = '';

  async init() {
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then((result: any) => {
      if (result.state === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      console.log(token);
        //! Realizar el cambio por el id
      if (!localStorage.getItem('M081l3')) {
        const user: any = localStorage.getItem('user');
        this.genericS
          .post(
            'user/mobile-token/' +
              user.id,
            token.value
          )
          .subscribe();
      }
      localStorage.setItem('M081l3', token.value);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        const toast = await this.toast.create({
          color: 'dark',
          message: notification.title,
          duration: 3000,
          position: 'top',
        });
        toast.present();
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        if (notification.notification.data) {
          this.router.navigateByUrl(notification.notification.data.ruta);
        }
      }
    );
  }
}
