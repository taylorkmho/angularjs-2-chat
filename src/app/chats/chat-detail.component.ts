import { Component, OnInit, OnDestroy, ViewChild,
         ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DateFormatPipe } from 'angular2-moment';
import { ApiService, KeysPipe, ReversePipe, HandleError } from '../shared';
import { ChatDetail } from './chat-models';
import { ChatService } from './chat.service';
import { ChatFormComponent } from './chat-detail/chat-form.component';

@Component({
  selector: 'my-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss'],
  directives: [ChatFormComponent],
  pipes: [ReversePipe, DateFormatPipe, KeysPipe]
})

export class ChatDetailComponent implements OnInit, OnDestroy {
  private chatDetail: any;
  private chatID: string;
  private sub: any;

  private users: any;
  @ViewChild('scrollMe') myScrollContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    private apiService: ApiService ) {}

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

  fetchData() {
    this.chatService.getChatDetail(this.chatID)
      .subscribe(
        chatDetail => {
          this.chatDetail = chatDetail;

          // TODO: Change "USER" to user name
          let title = this.chatDetail.userIDs.length > 1 ? 'GROUP' : 'USER';
          this.apiService.setTitle(title);

          setTimeout( () => {
            this.scrollToBottom();
          }, 250);
        },
        error => HandleError(error)
      );

    this.chatService.getUsers()
      .subscribe(
        users => this.users = users,
        error => HandleError(error)
      );
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      HandleError(err);
    }
  }

  gotoChatList() {
    this.router.navigate(['/chat-list']);
  }

}
