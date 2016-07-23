import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChatService } from '../chat.service';
import { KeysPipe, HandleError } from '../../shared';
import { TimeAgoPipe, DateFormatPipe } from 'angular2-moment';

@Component({
  selector: 'my-chat-preview',
  templateUrl: './chat-preview.component.html',
  styleUrls: ['./chat-preview.component.scss'],
  pipes: [KeysPipe, TimeAgoPipe, DateFormatPipe]
})
export class ChatPreviewComponent implements OnInit, OnDestroy {
  @Input('chatDetail') chatDetail: any;
  authorNames: any;
  message: string;
  timeAgo: string;
  private sub: any;

  constructor(
    private service: ChatService ) {}

  ngOnInit() {
    this.sub = this.service.getUsers()
      .subscribe(
        users => {
          this.authorNames = this.chatDetail.userIDs
            .reduce( (userNames, userID) => {
              let user = users.find(user => user.id === userID);
              userNames.push(user.name);
              return userNames;
            }, []);
        },
        error => HandleError(error)
      );
    this.message = this.chatDetail.messageThread[0].text;
    this.timeAgo = this.chatDetail.messageThread[0].sentAt;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
