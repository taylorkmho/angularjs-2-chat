import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ApiService {
  private backButton = new Subject<boolean>();
  backButtonSet$ = this.backButton.asObservable();
  private titleSource = new Subject<string>();
  newTitleSet$ = this.titleSource.asObservable();

  displayBackButton(display: boolean) {
    this.backButton.next(display);
  }

  setTitle(newTitle: string) {
    this.titleSource.next(newTitle);
  }

}

export function HandleError (error: any) {
  let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg);
  if (Observable) {
    return Observable.throw(errMsg);
  }
}
