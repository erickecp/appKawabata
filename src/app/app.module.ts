import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { FileSaverModule } from 'ngx-filesaver';


@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent,  ],
  imports: [FileSaverModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ComponentsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
