import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComunicadoComponent } from 'src/app/components/modal-comunicado/modal-comunicado.component';
import { ComunicadosService } from 'src/app/services/comunicados.service';
import { environment } from 'src/environments/environment';
import SwiperCore, {SwiperOptions} from 'swiper';

@Component({
  selector: 'app-comunicados',
  templateUrl: './comunicados.page.html',
  styleUrls: ['./comunicados.page.scss'],
})
export class ComunicadosPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private blogS: ComunicadosService
  ) { }
  selectedFilter = '';
  imgUrl = environment.URLAPI;
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
    console.log('slide change');
  }


  genArray(user:any) {
    console.log(user);

    for( let stu of user.estudiantes){
      if(!this.arrayNivelAlum.includes(stu.nivel)){
        this.arrayNivelAlum.push(stu.nivel)
      }
    }
    console.log('array', this.arrayNivelAlum);

    return this.arrayNivelAlum;
  }


  async openModalComunicado(infoCom: any) {
    console.log(infoCom);
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
      console.log(userJ);

      this.getBlogs(dep);

    }
  }

  getBlogs(dep: any){
    this.blogS.getComunicados(dep).subscribe(
        (resp: any) => {
          console.log(resp);
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
