import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tildes'
})
export class TildesPipe implements PipeTransform {

  transform(value: string): string {
    console.log(value);

    if(value === 'SALON' ){
      return 'SALÓN';
    }
    return 'null';
  }

}
