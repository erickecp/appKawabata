import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComunicadoComponent } from 'src/app/components/modal-comunicado/modal-comunicado.component';
import { EVENTS } from 'src/app/enums/sockets.enum';
import { ComunicadosService } from 'src/app/services/comunicados.service';
import { SocketsService } from 'src/app/services/sockets.service';
import { environment } from 'src/environments/environment';
import SwiperCore, {SwiperOptions} from 'swiper';

@Component({
  selector: 'app-comunicados',
  templateUrl: './comunicados.page.html',
  styleUrls: ['./comunicados.page.scss'],
})
export class ComunicadosPage implements OnInit {

  sliders:any[] = []

  constructor(
    private modalController: ModalController,
    private blogS: ComunicadosService,
    private sockets:SocketsService
  ) {

    this.getsliders();
    this.sockets.listen(EVENTS.CONFIG_USER).subscribe( res => {
    })

  }

  getsliders(){
    this.blogS.getSliders().subscribe((slider: any) => {
      console.log(slider);
      this.sliders = slider
    });
  }

  selectedFilter = '';
  imgUrl = environment.URLAPIIMG;
  comunicados:any[] = [];
  comunicadosFilter: any[] = [];
  arrayNivelAlum: string[] = [];
  config: SwiperOptions = {
    slidesPerView: 3,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 50,
      shadowScale: 0.3,
    },
    spaceBetween: 1,
    loop: true,
    navigation: true,
    pagination: { clickable: true },
  };

  onSwiper(swiper: any) {
    console.log(swiper);
  }


  onSlideChange() {
  }


  genArray(user:any) {

    for( let stu of user.estudiantes){
      if(!this.arrayNivelAlum.includes(stu.nivel)){
        this.arrayNivelAlum.push(stu.nivel)
      }
    }

    return this.arrayNivelAlum;
  }


  async openModalComunicado(infoCom: any) {
    const modal = await this.modalController.create({
      component: ModalComunicadoComponent,
      mode: 'ios',
      // initialBreakpoint: 0.75  ,
      componentProps: {
        doc: infoCom
      }// 'modal-upload-files'
    });
    await modal.present();
  }

  getFill(fill: string) {
    if(this.selectedFilter === fill){
      return 'solid'
    } else {
      return 'outline'
    }
  }


  filtrarEstudiantes(filter: string){
    this.selectedFilter = filter;
    if(filter === ''){
      this.comunicadosFilter = this.comunicados;
    } else {
    this.comunicadosFilter = this.comunicados.filter(
      comunicado => comunicado.categoria === filter
      );
    }


  }


  ngOnInit() {
    let dep
    const user: any = localStorage.getItem('user');
    if (user){
      const userJ = JSON.parse(user);
      if(userJ.departamento){
        dep = userJ.departamento;
      } else {
        dep = this.genArray(JSON.parse(user))
      }
      this.getBlogs(dep);

    }
  }

  getBlogs(dep: any){
    this.blogS.getComunicados(dep).subscribe(
        (resp: any) => {
          this.comunicados = resp;
          this.comunicadosFilter = resp;
        }
      );
  }


  getImage(name: string){
    return `${this.imgUrl}${name}`;
 // this.gs.get(`http://localhost:3006/api/maestros/file/${name}`).subscribe(
 }

}
