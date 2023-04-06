import { Component } from '@angular/core';

import SwiperCore, {SwiperOptions} from 'swiper';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

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

  constructor() {}

}
