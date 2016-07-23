import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter,
         Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TimeAgoPipe, DateFormatPipe } from 'angular2-moment';
import { KeysPipe, ReversePipe, HandleError } from '../../shared';
import { ChatDetail } from './../chat-models';
import { ChatService } from './../chat.service';

@Component({
  selector: 'my-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss'],
  pipes: [ReversePipe, TimeAgoPipe, DateFormatPipe, KeysPipe]
})

export class ChatFormComponent implements OnInit, OnDestroy {
  @ViewChild('text') myTextInput: ElementRef;
  @Input('chatDetail') chatDetail: ChatDetail[];
  @Output() onMessageSent = new EventEmitter<boolean>();
  private textMessage = '';

  constructor(
    private route: ActivatedRoute,
    private service: ChatService) {}

  ngOnInit() {
  }

  // TODO: store textMessage in localStorage onDestroy
  ngOnDestroy() {
  }

  addTextMessage(textMessage: string) {
    if (textMessage === '') { return; };
    this.textMessage = '';
    this.myTextInput.nativeElement.focus();
    this.service.postMessage(this.chatDetail, 'text', textMessage)
      .subscribe(
        resolve => this.onMessageSent.emit(resolve),
        error => HandleError(error)
      );
  }

  // TODO: (❕❕❕) create addImageMessage() method
  //       https://github.com/valor-software/ng2-file-upload
  // TODO: create addEmoji() method

}