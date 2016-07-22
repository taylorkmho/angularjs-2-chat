import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { NgForm }    from '@angular/forms';
import { TimeAgoPipe, DateFormatPipe }                         from 'angular2-moment';
import { KeysPipe, ReversePipe, HandleError }                  from '../shared';
import { ChatService }                                         from './chat.service';


@Component({
  selector: 'my-chat-detail-form',
  templateUrl: './chat-detail-form.component.html',
  styleUrls: ['./chat-detail-form.component.scss'],
  pipes: [ReversePipe, TimeAgoPipe, DateFormatPipe, KeysPipe]
})

export class ChatDetailFormComponent implements OnInit, OnDestroy {
  @ViewChild('text') myTextInput: ElementRef;
  @Output() onSubmit = new EventEmitter<boolean>();

  private textMessage = '';

  constructor(
    private service: ChatService) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  addTextMessage(textMessage) {
    this.onSubmit.emit(textMessage);
    this.textMessage = '';
    this.myTextInput.nativeElement.focus();
  }

}
