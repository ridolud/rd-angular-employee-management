import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idr_currency',
})
export class IdrCurrency implements PipeTransform {
  transform(value: any, ...args: any[]) {
    if (typeof value != 'number') return value;

    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  }
}
