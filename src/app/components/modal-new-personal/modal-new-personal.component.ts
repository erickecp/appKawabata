import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { PersonalAuthService } from 'src/app/services/personal-auth.service';
import { throwError } from 'rxjs';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-modal-new-personal',
  templateUrl: './modal-new-personal.component.html',
  styleUrls: ['./modal-new-personal.component.scss'],
})
export class ModalNewPersonalComponent implements OnInit {
  fomrPersonal!: FormGroup;
  @Input()
  user:any;
  id = 0;
  constructor(
    private authS: AuthService,
    private personalAuth: PersonalAuthService,
    private modalController: ModalController,
    private fb: FormBuilder,
    private alertS: AlertsService
  ) { }

  ngOnInit() {
    this.generateForm();

    if(this.user){
      this.fomrPersonal.reset(this.user);
    }
    this.id = this.authS.getUserId();
  }

  async close() {
    await this.modalController.dismiss();
  }


  generateForm(){
    this.fomrPersonal = this.fb.group({
      colonia : ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      parentesco: ['', Validators.required],
      telefono: ['', Validators.required],
      telefonoCelular: ['', Validators.required],
      tutorId: [this.id]
    });
  }

  submitForm(){
    if(!this.user){
    this.fomrPersonal.get('tutorId')?.patchValue(this.id);
    this.personalAuth.postAuth(this.fomrPersonal.value).subscribe({
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
    this.fomrPersonal.get('tutorId')?.patchValue(this.id);
    this.personalAuth.updatePersonal(this.user.id, this.fomrPersonal.value).subscribe(
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

  validaControl(control: string){
    return !!this.fomrPersonal.get(control)!.errors && this.fomrPersonal.get(control)!.touched;
  }

}
