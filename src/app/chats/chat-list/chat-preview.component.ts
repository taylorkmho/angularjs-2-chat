import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../chat.service';
import { TimeAgoPipe, KeysPipe } from '../../shared';
import { DateFormatPipe } from 'angular2-moment';

@Component({
  selector: 'my-chat-preview',
  templateUrl: './chat-preview.component.html',
  styleUrls: ['./chat-preview.component.scss'],
  pipes: [KeysPipe, TimeAgoPipe, DateFormatPipe]
})
export class ChatPreviewComponent implements OnInit {
  @Input('chatDetail') chatDetail: any;
  authorNames: any;
  message: string;
  timeAgo: string;

  constructor(
    private service: ChatService ) {}

  ngOnInit() {
    this.authorNames = this.chatDetail.users
      .reduce((nameList, user) => {
        nameList.push(user.name);
        return nameList;
      }, []);
    let thisMessage = this.chatDetail.messageThread[0];
    this.message = thisMessage.type === 'image' ? '[Image]' : thisMessage.content;
    this.timeAgo = thisMessage.sentAt;
  }

}
