import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoimagePipe } from './noimage.pipe';
import { EstadoPipe } from './estado.pipe';
import { TildesPipe } from './tildes.pipe';



@NgModule({
  declarations: [
    NoimagePipe,
    EstadoPipe,
    TildesPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NoimagePipe,
    EstadoPipe,
    TildesPipe,
  ]
})
export class PipesModule { }
