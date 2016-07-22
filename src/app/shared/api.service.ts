import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  title = 'Angular 2';
}

export function HandleError (error: any) {
  let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg);
  if (Observable) {
    return Observable.throw(errMsg);
  }
}
