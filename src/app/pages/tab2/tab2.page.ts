import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swiper from 'swiper';
import SwiperCore, { Autoplay } from 'swiper';
import { AlertsService } from '../../services/alerts.service';
import { SocketsService } from 'src/app/services/sockets.service';
import { EVENTS } from 'src/app/enums/sockets.enum';
import { Platform } from '@ionic/angular';
import { PushNotificationConfig } from 'src/app/tools/push-notification-configuration';
import { ComunicadosService } from 'src/app/services/comunicados.service';
import { environment } from 'src/environments/environment';
SwiperCore.use([Autoplay]);
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild('swiper')
  swiperRef: Swiper | undefined;
  imgUrl = environment.URLAPIIMG;
  user: any;
  sliders:  any[] = [];
  constructor(
    private platform: Platform,
    private alertsS:AlertsService,
    private blogS: ComunicadosService,
    private socketS: SocketsService,
    private authS: AuthService,
    private pushNotification: PushNotificationConfig,
    private navigate: Router,
  ) {
    this.getsliders();
    this.user = this.authS.getTipoUser();
    this.socketS.listen(EVENTS.CONFIG_USER).subscribe(res => {
      console.log(res);
    });
  }

  ngOnInit(): void {

    if (
      this.platform.is('android') ||
      this.platform.is('ios') ||
      this.platform.is('ipad')
    ) {
      this.pushNotification.init();
    }
  }

  getsliders(){
    this.blogS.getSliders().subscribe((slider: any) => {
      console.log(slider);
      this.sliders = slider
    });
  }

  getImage(name: string){
    return `${this.imgUrl}${name}`;
 // this.gs.get(`http://localhost:3006/api/maestros/file/${name}`).subscribe(
 }



recoger(){
  if(this.user === 'MAESTRO'){
    this.navigate.navigateByUrl('tabs/tab1')
  } else if(this.user === 'LECTOR') {
    this.navigate.navigateByUrl('tabs/leerqr')
  }
  else if(this.user === 'FILA') {
    this.navigate.navigateByUrl('tabs/tab1')
  }
  else if(this.user === 'ENTREGAR') {
    this.navigate.navigateByUrl('tabs/tab1')
  }
   else if(this.user === 'TUTOR'){
    this.navigate.navigateByUrl('tabs/recoger')
  } else{
    this.alertsS.generateToastError('Aun no tienes asignada ninguna responsabilidad, Intentalo mas tarde')
  }
}
goToAuth(ruta: string){
  this.navigate.navigateByUrl(`tabs/${ruta}`)
}

}
