import { Component, OnInit } from '@angular/core';
import SwiperCore, {SwiperOptions} from 'swiper';
@Component({
  selector: 'app-comunicados',
  templateUrl: './comunicados.page.html',
  styleUrls: ['./comunicados.page.scss'],
})
export class ComunicadosPage implements OnInit {

  constructor() { }

  config: SwiperOptions = {
    slidesPerView: 1,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 50,
      shadowScale: 0.3,
    },
    spaceBetween: 1,
    loop: true,
    navigation: true,
    pagination: { clickable: true },
  };

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  ngOnInit() {
  }

}
