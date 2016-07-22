import { Component, OnInit }           from '@angular/core';
import { Router }                      from '@angular/router';
import { ChatService }                 from './chat.service';
import { ReversePipe, HandleError }    from '../shared';
import { TimeAgoPipe, DateFormatPipe } from 'angular2-moment';

@Component({
  selector: 'my-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  pipes: [ReversePipe, TimeAgoPipe, DateFormatPipe]
})
export class ChatListComponent implements OnInit {
  chatList: any;
  users: any;

  constructor(
    private router: Router,
    private chatService: ChatService ) {}

  ngOnInit() {
    this.chatService.getChatLists()
      .subscribe(
        chatList => this.chatList = chatList,
        error => HandleError(error),
        () => console.log('getChatLists succeeded')
      );
  }

}
