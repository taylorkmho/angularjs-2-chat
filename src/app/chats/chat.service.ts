import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { ChatDetail } from './chat-models';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {
  private apiChatList = 'http://5792b69b11a91c1100a92743.mockapi.io/api/chatLists';
  private apiUsers    = 'http://5792b69b11a91c1100a92743.mockapi.io/api/users';

  constructor(private http: Http) {}

  public getChatLists(): Observable<any> {
    return this.http.get(this.apiChatList + '?sortBy=lastUpdated&order=desc')
      .map( response => response.json() as ChatDetail[] )
      .catch( this.handleError );
  }

  public getChatDetail(id: string): Observable<any> {
    return this.http.get(this.apiChatList)
      .map( response => response.json().find(chatDetail => chatDetail.id === id) )
      .catch( this.handleError );
  }

  public getUsers(): Observable<any> {
    return this.http.get(this.apiUsers)
      .map( response => response.json() )
      .catch( this.handleError );
  }

  public postMessage(chatDetail: any, type: string, content: any) {
    let newMessage = {
      'userID': '0',
      'type': type,
      'content': content,
      'sentAt': moment()
    };
    chatDetail.messageThread.unshift(newMessage);
    chatDetail.lastUpdated = moment();

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(
        this.apiChatList + '/' + chatDetail.id,
        JSON.stringify(chatDetail),
        options
      ).map(response => response.json() );
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

}
