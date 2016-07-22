import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute }                              from '@angular/router';
import { TimeAgoPipe, DateFormatPipe }                         from 'angular2-moment';
import { KeysPipe, ReversePipe, HandleError }                  from '../shared';
import { ChatService }                                         from './chat.service';

import { ChatDetailFormComponent }                             from './chat-detail-form.component';

@Component({
  selector: 'my-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss'],
  directives: [ChatDetailFormComponent],
  pipes: [ReversePipe, TimeAgoPipe, DateFormatPipe, KeysPipe]
})

export class ChatDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  private chatDetail: any;
  private users: any;
  @ViewChild('scrollMe') myScrollContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ChatService) {}

  ngOnInit() {
    // Pulls in Chat Detail ID based on URL
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      // Observes chat detail data via service,
      // updates `this.chatDetail` on success
      this.service.getChatDetail(id).subscribe(
        chatDetail => {
          this.chatDetail = chatDetail;
          this.scrollToBottom();
        },
        error => HandleError(error)
      );
      // Observes user data via service,
      // updates `this.users` on success
      this.service.getUsers().subscribe(
        users => this.users = users,
        error => HandleError(error)
      );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addTextMessage(content) {
    console.log('ChatDetailComponent addTextMessage() 🔥 w/ `' + content + '`');
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
