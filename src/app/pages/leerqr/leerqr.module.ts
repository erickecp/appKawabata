import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeerqrPageRoutingModule } from './leerqr-routing.module';

import { LeerqrPage } from './leerqr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeerqrPageRoutingModule
  ],
  declarations: [LeerqrPage]
})
export class LeerqrPageModule {}
