import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {
  private url = '/data/chat-data.json';

  constructor(private http: Http) { }

    getChatLists() {
      return this.http.get(this.url)
        .map( response => response.json().data.chatThreads );
    }
    getUsers() {
      return this.http.get(this.url)
        .map( response => response.json().data.users );
    }

}
