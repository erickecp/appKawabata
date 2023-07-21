import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { TutoresService } from 'src/app/services/tutores.service';
import { environment } from 'src/environments/environment';
import { SocketsService } from 'src/app/services/sockets.service';
import { EVENTS } from 'src/app/enums/sockets.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  fotoPerfil = '';
  imgUrl = environment.URLAPIIMG;
  usuario : any;
  idUsuario: any;
  currentFile?: any[] = [];
  picture = './assets/logokawabata.png';
  constructor(
    private compressImg: NgxImageCompressService,
    private authS: AuthService,
    private tutoresS: TutoresService,
    private alertsS: AlertsService,
    private router: Router,
    private socketsS: SocketsService,

  ) {
    this.idUsuario = this.authS.getUserId();
    this.usuario = JSON.parse(localStorage.getItem('user') || '{}')
    this.socketsS.listen(EVENTS.PERFIL).subscribe( (res: any) => {
      const user = this.authS.getUser();
      user.fotoPerfilOk = res.fotoPerfilOk;
      user.fotoPerfil = res.fotoPerfil;
      if(!user.responsabilidad && typeof(res) !== 'string' ){
         localStorage.setItem('user',  JSON.stringify(user));
         this.usuario = JSON.parse(localStorage.getItem('user') || '{}')
         this.router.navigateByUrl('/tabs/perfil');
      } else {

      }


    })
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
    console.log(this.usuario);
    if(this.usuario.responsabilidad) {
      this.alertsS.generateToastSuccess('Tu foto debe ser cambiada desde el administrador')
      return ;
    }

    this.alertsS.Image().then((res: any) => {
      if(res.data === true){
        const formData = new FormData();
        this.compressImg.uploadFile().then(({image, orientation}) => {

        this.generarURL(image)
        const bl = this.dataURItoBlob(image);
        this.currentFile![0] = bl;
        if(this.currentFile){
          formData.append('fotoPerfil', this.currentFile[0]);
          formData.append('email',JSON.stringify( this.usuario.email) )
          formData.append('nombres', JSON.stringify( this.usuario.nombres))
        }
        this.tutoresS.fotoPerfil(this.idUsuario, formData).subscribe(  (res: any) => {
        this.authS.modifyPerfil(res.data.fotoPerfil);
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
    const blob = new Blob([ab], { type: "" });
    // Crear la URL de la imagen
    const imageUrl = URL.createObjectURL(blob);
    this.authS.modifyPerfil(image);
    // Utilizar la URL de la imagen
    document.getElementById("imgProf")!.setAttribute(
      'src', imageUrl);
    }

    getImage(name: string){
      return `${this.imgUrl}${name}`;
   // this.gs.get(`http://localhost:3006/api/maestros/file/${name}`).subscribe(
   }

}
