import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
        return 'NOTIFICADO A SALON';
      case 1:
        return 'SALON';
      case 2:
        return 'CONFIRMAR EN FILA';
      case 3:
        return 'LISTO PARA ENTREGAR';
      case 4:
        return 'ENTREGADO';
      default:
       return 'EN EsPERA'

    }
  }

}
