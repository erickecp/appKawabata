import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(value: any): any {

    if(value === null || value === ''){
      return './assets/logokawabata.png'
    } else{
      return `http://localhost:3006/api/estudiante/file/${value}`;
    }
  }

}
