import { Component, OnInit, OnDestroy, ViewChild,
         ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateFormatPipe } from 'angular2-moment';
import { ApiService, KeysPipe, ReversePipe, HandleError } from '../shared';
import { ChatService } from './chat.service';
import { ChatFormComponent } from './chat-detail/chat-form.component';
import { Subscription } from 'rxjs/Subscription';

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
  private routesSub: Subscription;
  private chatDetailSub: Subscription;
  private usersSub: Subscription;

  private users: any;
  @ViewChild('scrollMe') myScrollContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private apiService: ApiService ) {
      apiService.displayBackButton(true);
  }

  ngOnInit() {
    // Subscribe to ActivatedRoute for params
    this.routesSub = this.route.params
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
    this.routesSub.unsubscribe();
    this.chatDetailSub.unsubscribe();
    this.usersSub.unsubscribe();
  }

  fetchData() {
    this.chatDetailSub = this.chatService.getChatDetail(this.chatID)
      .subscribe(
        chatDetail => {
          let title = chatDetail.users.length > 1 ? 'GROUP' : chatDetail.users[0].name;
          this.apiService.setTitle(title);

          this.chatDetail = chatDetail;

          setTimeout( () => {
            this.scrollToBottom();
          }, 250);
        },
        error => HandleError(error)
      );

    this.usersSub = this.chatService.getUsers()
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
}
