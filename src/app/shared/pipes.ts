import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'reverse'})
export class ReversePipe implements PipeTransform {
  transform(value) {
    return value.slice().reverse();
  }
}

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}
