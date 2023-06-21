import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  imgUrl = environment.URLAPIIMG;
  transform(value: any): any {

    if(value === null || value === ''){
      return './assets/logokawabata.png'
    } else{
      return `${this.imgUrl}${value}`;
    }
  }

}
