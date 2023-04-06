import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComunicadosPageRoutingModule } from './comunicados-routing.module';

import { ComunicadosPage } from './comunicados.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    IonicModule,
    ComunicadosPageRoutingModule
  ],
  declarations: [ComunicadosPage]
})
export class ComunicadosPageModule {}
