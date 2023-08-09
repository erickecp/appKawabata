import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { PersonalAuthService } from 'src/app/services/personal-auth.service';
import { throwError } from 'rxjs';
import { AlertsService } from '../../services/alerts.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-new-personal',
  templateUrl: './modal-new-personal.component.html',
  styleUrls: ['./modal-new-personal.component.scss'],
})
export class ModalNewPersonalComponent implements OnInit {
  fomrPersonal!: FormGroup;
  @Input()
  user:any;
  imgUrl = environment.URLAPIIMG;
  id = 0;
  nofoto = false;
  picture = './assets/logokawabata.png';
  currentFile?: any[] = [];
  constructor(
    private compressImg: NgxImageCompressService,
    private authS: AuthService,
    private personalAuth: PersonalAuthService,
    private modalController: ModalController,
    private fb: FormBuilder,
    private alertS: AlertsService
  ) { }

  ngOnInit() {
    this.generateForm();

    if(this.user){
      if(this.user.fotoPerfil !== null){
        this.picture = this.getImage(this.user.fotoPerfil);
      }
      this.fomrPersonal.reset(this.user);
    }
    this.id = this.authS.getUserId();
  }

  async close() {
    await this.modalController.dismiss();
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
    this.picture = imageUrl;
    this.nofoto = false;
    // Utilizar la URL de la imagen
    document.getElementById("imgProfMod")!.setAttribute(
      'src', imageUrl);
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
      return new Blob([ab], {type: mimeString});
    }


  changeProfile(): void {
    this.compressImg.uploadFile().then(({image, orientation}) => {
      this.generarURL(image)
      const bl = this.dataURItoBlob(image);
      this.currentFile![0] = bl;
      });
  }


  generateForm(){
    this.fomrPersonal = this.fb.group({
      colonia : ['', Validators.required],
      fotoPerfil: [''],
      nombre: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      direccion: ['', Validators.required],
      parentesco: ['', Validators.required],
      telefono: ['', Validators.required],
      telefonoCelular: ['', Validators.required],
      tutorId: [this.id]
    });
  }

  submitForm(){

    if(this.picture === './assets/logokawabata.png'){
      this.nofoto =  true
    }
    console.log(this.fomrPersonal.invalid);
    console.log(this.nofoto);
    if(this.fomrPersonal.invalid || this.nofoto){
      this.fomrPersonal.markAllAsTouched();
      console.log(this.picture);
      return;
    }
    const formData = new FormData();
    this.fomrPersonal.get('tutorId')?.patchValue(this.id);
    let form = this.fomrPersonal.value;


     for(const dataKey in form) {
      console.log(dataKey);
      formData.append(dataKey, JSON.stringify(form[dataKey]));
    }

    console.log(formData);

    if(this.currentFile){
      formData.append('fotoPerfil', this.currentFile[0]);
     }

    if(!this.user){
    console.log(formData);
    this.personalAuth.postAuth(formData).subscribe({
      next: (ev) => {
        console.log(ev);
        this.alertS.generateToastSuccess('Persona autorizada creada correctamente');
        this.close();
        this.personalAuth.setSTU(ev);
      },
      error: (err) => {
        console.log('Ocurrio un error')
        this.alertS.generateToastError('Ocurrio un error'+ err)
      }
    })
  } else {
    this.personalAuth.updatePersonal(this.user.id, formData).subscribe(
      {
        next: (ev) => {
          this.close();
          this.personalAuth.setUPDPER(ev);
          this.alertS.generateToastSuccess('Persona actualizada correctamente')
        },
        error: (err) => {
          this.alertS.generateToastError('Error:'+ err)
        }
      }
    )
  }

  }


  getImage(name: string){

    return `${this.imgUrl}${name}`;
 // this.gs.get(`http://localhost:3006/api/maestros/file/${name}`).subscribe(
 }

  validaControl(control: string){
    return !!this.fomrPersonal.get(control)!.errors && this.fomrPersonal.get(control)!.touched;
  }


}
