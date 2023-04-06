import { Component } from '@angular/core';

import { Share } from '@capacitor/share';
import { PersonalAuthService } from 'src/app/services/personal-auth.service';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  backgroundUrl = './assets/descarga.png'
  userId!: number;
  alumnosTutor: any[] = [];
  constructor(
    private personalS:PersonalAuthService,
    private authS: AuthService,
    private utilsS:UtilsService,
    private navigate: Router,
  ) {
    this.getAleumnos();
  }

  async compartir(){
await Share.share(
  {
    title: 'Compartida',
    text: 'Algun texto',
    url: 'http://ionicframework.com/',
    dialogTitle: 'Share with Buddies'
  }
);

}

recoger(estu: any){
  this.utilsS.enviarinfo(estu);
  this.navigate.navigateByUrl('recogerqr')


}

getAleumnos(){
  this.userId = this.authS.getUserId();
  this.personalS.getAlumnos(this.userId).subscribe(
    (resp: any) => {
      console.log(resp[0].estudiantes);
      this.alumnosTutor = resp[0].estudiantes;
    }
  )
}
}
