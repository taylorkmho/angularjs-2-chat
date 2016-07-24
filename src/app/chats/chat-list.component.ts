import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from './chat.service';
import { ChatPreviewComponent } from './chat-list';
import { ApiService, TimeAgoPipe, ReversePipe, KeysPipe, HandleError } from '../shared';
import { DateFormatPipe } from 'angular2-moment';

@Component({
  selector: 'my-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  directives: [ ChatPreviewComponent ],
  pipes: [KeysPipe, ReversePipe, TimeAgoPipe, DateFormatPipe]
})
export class ChatListComponent implements OnInit, OnDestroy {
  chatList: any;
  users: any;
  private sub: Subscription;

  constructor(
    private router: Router,
    private chatService: ChatService,
    private apiService: ApiService ) {}

  ngOnInit() {
    this.apiService.setTitle('CHAT');

    this.sub = this.chatService.getChatLists()
      .subscribe(
        chatList => this.chatList = chatList,
        error => HandleError(error)
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSelect(chatDetail) {
    this.router.navigate(['/chat-list', chatDetail.id]);
  }

}
