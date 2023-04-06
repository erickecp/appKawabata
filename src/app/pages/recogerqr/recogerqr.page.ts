import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { UtilsService } from '../../services/utils.service';
@Component({
  selector: 'app-recogerqr',
  templateUrl: './recogerqr.page.html',
  styleUrls: ['./recogerqr.page.scss'],
})
export class RecogerqrPage implements OnInit {
  public qrCodeImage!: string;
  student: any;
  constructor(
    private utilsS: UtilsService
  ) {
    this.student = this.utilsS.getInfo();
    console.log(this.student);
    if(this.student){
      this.generateQRCode(this.student.nombres, this.student.apellidos);
    }
  }

  ngOnInit() {
  }

  generateQRCode(firsname: string, lastname:string){
    console
    const text = `${firsname} ${lastname}`;
    QRCode.toDataURL(text, {
      errorCorrectionLevel: 'H'
    }, (err, url) => {
      if(err){
        console.error(err);
        return;
      }
      this.qrCodeImage = url
    })
  }

}
