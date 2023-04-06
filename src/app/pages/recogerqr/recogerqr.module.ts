import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecogerqrPageRoutingModule } from './recogerqr-routing.module';

import { RecogerqrPage } from './recogerqr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecogerqrPageRoutingModule
  ],
  declarations: [RecogerqrPage]
})
export class RecogerqrPageModule {}
