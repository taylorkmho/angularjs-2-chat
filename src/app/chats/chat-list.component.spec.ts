import { provide } from '@angular/core';
import { describe, expect, beforeEach, it, addProviders } from '@angular/core/testing';
import { HTTP_PROVIDERS, XHRBackend } from '@angular/http';
import { Router } from '@angular/router';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Rx';

import { ChatService } from './chat.service';
import { ChatListComponent } from './chat-list.component';

class ChatServiceMock{
  getChatLists(){
    return Observable.of([
      {
        "id": 1,
        "userIDs": [1,3],
        "messageThread": [
          {
            "id": 2,
            "authorID": 3,
            "text": "Me neither.",
            "sentAt": "2016-07-20T01:40:21.196-0700"
          },
          {
            "id": 1,
            "authorID": 1,
            "text": "I just don't know",
            "sentAt": "2016-07-20T01:32:21.196-0700"
          }
        ]
      }
    ]);
  }
}
describe('Chat List Component', () => {
  let chatListComponent: ChatListComponent,
      chatService,
      router;

  beforeEach(()=>{
    addProviders([
      HTTP_PROVIDERS,
      provide(XHRBackend, {useClass: MockBackend})
    ])
    router = Router;
    chatService = new ChatServiceMock;
    chatListComponent = new ChatListComponent(router, chatService);
  })

  it('should get chat lists on init', () => {
    chatListComponent.ngOnInit();
    expect(chatListComponent.chatList.length).toBeDefined();
  });

});
