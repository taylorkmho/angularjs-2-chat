import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { ChatDetail } from './chat-models';
import { HandleError } from '../shared';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {
  private apiChatList = 'http://5792b69b11a91c1100a92743.mockapi.io/api/chatLists';
  private apiUsers    = 'http://5792b69b11a91c1100a92743.mockapi.io/api/users';

  constructor(private http: Http) {}

  getChatLists(): Observable<any> {
    return this.http.get(this.apiChatList)
      .map( response => response.json() as ChatDetail[] );
  }

  getChatDetail(id: string): Observable<any> {
    return this.http.get(this.apiChatList)
      .map( response => {
        return response.json()
          .find(chatDetail => chatDetail.id === id);
      });
  }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUsers)
      .map( response => response.json() );
  }

  postMessage(chatDetail: any, type: string, content: any) {
    let newMessage = {
      'authorID': '0',
      'text': content,
      'sentAt': moment()
    };
    if (type === 'text') {
      console.log('posting text');
    } else if (type === 'image') {
    }
    chatDetail.messageThread.unshift(newMessage);

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(
        this.apiChatList + '/' + chatDetail.id,
        JSON.stringify(chatDetail),
        options
      ).map(response => response.json() );
  }
}
