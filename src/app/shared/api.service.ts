import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ApiService {
  private backButton = new Subject<boolean>();
  backButtonSet$ = this.backButton.asObservable();
  private titleSource = new Subject<string>();
  newTitleSet$ = this.titleSource.asObservable();
  private errorSource = new Subject<string>();
  errorSent$ = this.errorSource.asObservable();

  displayBackButton(display: boolean) {
    this.backButton.next(display);
  }

  setTitle(newTitle: string) {
    this.titleSource.next(newTitle);
  }

  sendError(message: any, error?: string) {
    this.errorSource.next(message);
    console.log(error);
  }

}
