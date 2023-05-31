import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { Tab3PageRoutingModule } from './tab3-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { NoimagePipe } from 'src/app/pipes/noimage.pipe';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  imports: [
  IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    PipesModule,
    Tab3PageRoutingModule
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
