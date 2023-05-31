import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoimagePipe } from './noimage.pipe';
import { EstadoPipe } from './estado.pipe';



@NgModule({
  declarations: [
    NoimagePipe,
    EstadoPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NoimagePipe,
    EstadoPipe,
  ]
})
export class PipesModule { }
