import { Component, OnInit, OnDestroy, ViewChild,
         ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateFormatPipe } from 'angular2-moment';
import { ApiService, KeysPipe, ReversePipe } from '../shared';
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
        error => this.apiService.sendError('Oops, something went wrong. Please try later.', error)
      );
  }

  ngOnDestroy() {
    this.routesSub.unsubscribe();
    this.chatDetailSub.unsubscribe();
    this.usersSub.unsubscribe();
    this.apiService.sendError(false);
  }

  fetchData() {
    this.chatDetailSub = this.chatService.getChatDetail(this.chatID)
      .subscribe(
        chatDetail => {
          this.chatDetail = chatDetail;

          let title = chatDetail.users.length > 1 ? 'GROUP (' + chatDetail.users.length + ')' : chatDetail.users[0].name;
          this.apiService.setTitle(title);

          if (chatDetail.id === '1337') {
            this.apiService.sendError('This room will be used for e2e tests! Carry on.');
          }

          setTimeout( () => {
            this.scrollToBottom();
          }, 250);
        },
        error => this.apiService.sendError('Oops, something went wrong. Please try later.', error)
      );

    this.usersSub = this.chatService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.apiService.sendError('Oops, something went wrong. Please try later.', error)
      );
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

}
