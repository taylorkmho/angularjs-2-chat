import { Component, OnInit, OnDestroy, ViewChild,
         ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TimeAgoPipe, DateFormatPipe } from 'angular2-moment';
import { KeysPipe, ReversePipe, HandleError } from '../shared';
import { ChatDetail } from './chat-models';
import { ChatService } from './chat.service';
import { ChatDetailFormComponent } from './chat-detail-form.component';

@Component({
  selector: 'my-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss'],
  directives: [ChatDetailFormComponent],
  pipes: [ReversePipe, TimeAgoPipe, DateFormatPipe, KeysPipe]
})

export class ChatDetailComponent implements OnInit, OnDestroy {
  private chatDetail: ChatDetail[];
  private chatID: string;
  private sub: any;

  private users: any;
  @ViewChild('scrollMe') myScrollContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ChatService) {}

  ngOnInit() {
    // Subscribe to ActivatedRoute for params
    this.sub = this.route.params
      .subscribe(
        params => {
          let id = params['id'];
          this.chatID = id.toString();
          this.fetchData();
        },
        error => HandleError(error)
      );
  }

  ngOnDestroy() {
    // TODO: (❕) Unsubscribe from all subscriptions on destroy
    //            also apply to chatListComponent subs
  }

  // TODO: (❕) connect to socket.io for chat data
  fetchData() {
    this.service.getChatDetail(this.chatID)
      .subscribe(
        chatDetail => {
          this.chatDetail = chatDetail;
          this.scrollToBottom();
        },
        error => HandleError(error)
      );

    this.service.getUsers()
      .subscribe(
        users => this.users = users,
        error => HandleError(error)
      );
  }

  scrollToBottom(): void {
    try {
      setTimeout( () => {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      }, 250);
    } catch (err) {
      HandleError(err);
    }
  }

  gotoChatList() {
    this.router.navigate(['/chat-list']);
  }

}
