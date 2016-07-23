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

// TODO: (❕) Build custom pipe for time sent using moment
// Spec-
// if >= 1, < 2 days old
//  return as `1 day ago`
// if >= 2 days old
//  return as `{{x}} days ago`
// if >= 4 days old
//  return as `Jul 23`
// else
//  return as ``