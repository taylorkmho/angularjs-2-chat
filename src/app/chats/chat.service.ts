import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ChatDetail } from './chat-models';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {
  private url = 'http://localhost:8080/api/chat-data.json';
  constructor(private http: Http) {}

  getChatLists(): Observable<any> {
    return this.http.get(this.url)
      .map( response => {
        return response.json().data.chatThreads as ChatDetail[];
      });
  }

  getChatDetail(id: number): Observable<any> {
    return this.http.get(this.url)
      .map( response => {
        return response.json().data.chatThreads
          .find(chatDetail => chatDetail.id === +id);
      });
  }

  getUsers(): Observable<any> {
    return this.http.get(this.url)
      .map( response => {
        return response.json().data.users;
      });
  }

}
