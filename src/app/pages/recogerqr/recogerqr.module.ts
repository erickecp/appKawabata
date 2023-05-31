import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileSaverModule } from 'ngx-filesaver';
import { IonicModule } from '@ionic/angular';

import { RecogerqrPageRoutingModule } from './recogerqr-routing.module';

import { RecogerqrPage } from './recogerqr.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RecogerqrPageRoutingModule
  ],
  declarations: [RecogerqrPage]
})
export class RecogerqrPageModule {}
