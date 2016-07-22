import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'myReverse'})
export class ReversePipe implements PipeTransform {
  transform(value) {
    return value.slice().reverse();
  }
}

@Pipe({name: 'myKeys'})
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        keys.push({key: key, value: value[key]});
      }
    }
    return keys;
  }
}
