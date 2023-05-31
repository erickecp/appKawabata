import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swiper from 'swiper';
import SwiperCore, { Autoplay } from 'swiper';
SwiperCore.use([Autoplay]);
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit{
  @ViewChild('swiper')
  swiperRef: Swiper | undefined;
  user: any;
  constructor(
    private utilsS:UtilsService,
    private authS: AuthService,
    private navigate: Router,
  ) {
    this.user = this.authS.getTipoUser();
    console.log(this.user);
  }



  ngAfterViewInit() {
}


recoger(){
  console.log(this.user);
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
   else {
    this.navigate.navigateByUrl('tabs/recoger')

  }
}
goToAuth(ruta: string){
  this.navigate.navigateByUrl(`tabs/${ruta}`)
}

}
