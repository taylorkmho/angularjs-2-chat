import { Component, OnInit }           from '@angular/core';
import { Router }                      from '@angular/router';
import { ChatService }                 from './chat.service';
import { KeysPipe }                    from '../shared';
import { TimeAgoPipe, DateFormatPipe } from 'angular2-moment';

@Component({
  selector: 'my-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  pipes: [KeysPipe, TimeAgoPipe, DateFormatPipe]
})

export class ChatListComponent implements OnInit {
  private chatList: any;
  private users: any;

  constructor(
    private router: Router,
    private chatService: ChatService ) {}

  ngOnInit() {
    console.log('Hello Chat List');
    this.chatService.getChatLists()
      .subscribe(chatList => this.chatList = chatList );
    this.chatService.getUsers()
      .subscribe(users => this.users = users );
  }

}
