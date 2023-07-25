import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PersonalAuthService } from 'src/app/services/personal-auth.service';
import { ModalNewPersonalComponent } from '../../components/modal-new-personal/modal-new-personal.component';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  idUser = 0 ;
  autorizados: any[] = [];

  constructor(
    private modalController: ModalController,
    private personalS: PersonalAuthService,
    private alertS: AlertsService
  ) {

    this.personalS.getNewPer.subscribe(user => {
      if(user){
        this.autorizados.push(user);
      }
    })

    this.personalS.getDelPer.subscribe(
      (data) => {
        this.autorizados.splice(this.autorizados.indexOf(data), 1);
      }
    );

    this.personalS.getUpdPer.subscribe(
      (data) => {
        const replace = this.autorizados.findIndex( f => f.id === data.id);
        if(replace !== -1){
          this.autorizados[replace] = data;
        }
      }
    );

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.idUser = user.id;
    this.personalS.getAll(this.idUser).subscribe(
      (resp: any) => {
        this.autorizados =  resp.filter( (user: any) => user.email !== JSON.parse( localStorage.getItem('user') || '{}').email );
      }
    )

  }

  deletePersonal(id: number){
    this.alertS.showMessageOkCancel(
      'Eliminar Personal',
      'Deseas eliminar a esta persona?'
    ).then((res: any) => {
      if(res.data === true){
          this.personalS.deletePersonal(id).subscribe( res => {
            if(res){
              this.alertS.generateToastSuccess('Eliminado correctamente');
              this.personalS.setDELPER(id);
            }
          })
      }
    })
  }




  async newPersonal() {
    const modal = await this.modalController.create({
      component: ModalNewPersonalComponent,
      mode: 'md',
      initialBreakpoint: 0.75,
      cssClass: 'email-component',
      componentProps: {
        mailTo: this.idUser
      }// 'modal-upload-files'
    });
    await modal.present();
  }

  activar(id: any, active: boolean) {
    this.personalS.activar(id, { active: active }).subscribe( res => {
      if(res){
        this.alertS.generateToastSuccess( active ? 'Activo' : 'Inactivo' );
        this.personalS.setACTIVEPER(id);
      }
    })
  }


  async editarPersonal(auth: any) {
    const modal = await this.modalController.create({
      component: ModalNewPersonalComponent,
      mode: 'ios',
      initialBreakpoint: 0.8,
      cssClass: 'email-component',
      componentProps: {
        user: auth
      }// 'modal-upload-files'
    });
    await modal.present();
  }
}
