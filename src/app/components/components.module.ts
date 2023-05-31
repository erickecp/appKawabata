import { ModalNewPersonalComponent } from './modal-new-personal/modal-new-personal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComunicadoComponent } from './modal-comunicado/modal-comunicado.component';



@NgModule({
  declarations: [
    ModalNewPersonalComponent,
    ModalComunicadoComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalNewPersonalComponent,
    ModalComunicadoComponent
  ]
})
export class ComponentsModule { }
