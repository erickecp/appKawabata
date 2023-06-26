import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { FileSaverModule } from 'ngx-filesaver';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = { url: environment.socket, options: {transports:['websocket']} };
@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent,  ],
  imports: [FileSaverModule, BrowserModule, SocketIoModule.forRoot(config), IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ComponentsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {provide:HTTP_INTERCEPTORS, useClass:RequestInterceptor, multi:true}],

  bootstrap: [AppComponent],
})
export class AppModule {}
