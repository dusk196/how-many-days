import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'negToPos'
})

export class NegToPosPipe implements PipeTransform {

  transform(value: number): number {
    return Math.abs(value);
  }

}
