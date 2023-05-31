import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-comunicado',
  templateUrl: './modal-comunicado.component.html',
  styleUrls: ['./modal-comunicado.component.scss'],
})
export class ModalComunicadoComponent implements OnInit {
  @Input()
  doc:any;
  constructor(
    private mc: ModalController
  ) {
   }

  ngOnInit() {
    console.log(this.doc)
  }

  getImage(name: string){
    return `http://localhost:3006/api/estudiante/file/${name}`;
 // this.gs.get(`http://localhost:3006/api/maestros/file/${name}`).subscribe(
 }

  async close() {
    await this.mc.dismiss();
  }

}
