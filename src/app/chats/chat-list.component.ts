import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from './chat.service';
import { ChatPreviewComponent } from './chat-list';
import { ApiService, TimeAgoPipe, ReversePipe, KeysPipe } from '../shared';
import { DateFormatPipe } from 'angular2-moment';
import { Subscription } from 'rxjs/Subscription';

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
    private apiService: ApiService ) {
      apiService.displayBackButton(false);
      apiService.setTitle('CHAT');
  }

  ngOnInit() {
    this.sub = this.chatService.getChatLists()
      .subscribe(
        chatList => this.chatList = chatList,
        error => {
          this.apiService.sendError('Uh oh, something went wrong. Try again later!', error);
        }
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.apiService.sendError(false);
  }

  onSelect(chatDetail) {
    this.router.navigate([chatDetail.id]);
  }

}
