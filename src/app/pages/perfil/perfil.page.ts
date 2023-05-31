import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { TutoresService } from 'src/app/services/tutores.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  fotoPerfil = '';
  usuario : any;
  idUsuario: any;
  currentFile?: any[] = [];
  picture = './assets/logokawabata.png';
  constructor(
    private compressImg: NgxImageCompressService,
    private authS: AuthService,
    private tutoresS: TutoresService,
    private alertsS: AlertsService,
    private alertCtrl: AlertController
  ) {
    this.idUsuario = this.authS.getUserId();
    this.usuario = JSON.parse(localStorage.getItem('user') || '{}')
    console.log(this.usuario);
  }

  ngOnInit() {
  }

  logout(){
    this.authS.logout();
    this.alertsS.generateToastSuccess(
      'Nos vemos pronto'
    )
  }

  changeProfile(event: any): void {
    this.alertsS.Image().then((res: any) => {
      if(res.data === true){
        const formData = new FormData();
        this.compressImg.uploadFile().then(({image, orientation}) => {
        this.generarURL(image)
        const bl = this.dataURItoBlob(image);
        console.log(bl);
        this.currentFile![0] = bl;
        console.log(this.currentFile)
        if(this.currentFile){
          formData.append('fotoPerfil', this.currentFile[0]);
        }
        this.tutoresS.fotoPerfil(this.idUsuario, formData).subscribe(  res => {
        console.log(res);
        this.alertsS.generateToastSuccess('Foto de perfil Actualizada')
       } )
    });
      }});


  }




  dataURItoBlob(dataURI:any) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString})

  }

  generarURL(image: any){
    const byteString = atob(image.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: "image/png" });
    // Crear la URL de la imagen
    const imageUrl = URL.createObjectURL(blob);
    // Utilizar la URL de la imagen
    document.getElementById("imgProf")!.setAttribute(
      'src', imageUrl);
    }

    getImage(name: string){

      return `http://localhost:3006/api/estudiante/file/${name}`;
   // this.gs.get(`http://localhost:3006/api/maestros/file/${name}`).subscribe(
   }

}
