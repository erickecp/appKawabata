import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComunicadosPageRoutingModule } from './comunicados-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComunicadosPage } from './comunicados.page';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComunicadosPageRoutingModule
  ],
  declarations: [ComunicadosPage]
})
export class ComunicadosPageModule {}
