import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter,
         Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeysPipe, ReversePipe, HandleError } from '../../shared';
import { ChatDetail } from './../chat-models';
import { ChatService } from './../chat.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss'],
  pipes: [ReversePipe,  KeysPipe]
})

export class ChatFormComponent implements OnInit, OnDestroy {
  @ViewChild('text') myTextInput: ElementRef;
  @ViewChild('loaderBar') myLoaderBar: ElementRef;
  @Input('chatDetail') chatDetail: ChatDetail[];
  @Output() onMessageSent = new EventEmitter<boolean>();
  private showWarning: boolean = false;
  private isImage: boolean = false;
  private placeholder: string = 'Write a message';
  private message = '';
  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private service: ChatService) {}

  ngOnInit() {
  }

  // TODO: store textMessage in localStorage onDestroy
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  handleWarning(warning: any) {
    if (warning) {
      this.showWarning = true;
      this.myLoaderBar.nativeElement.innerHTML = warning;
    } else {
      this.showWarning = false;
    }
  }

  addMessage(message: string) {
    if (this.message === '') {
      return;
    } else if (this.isImage && !/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i.test(this.message)) {
      this.handleWarning('Oops, that doesn&rsquo;t look like a valid URL. Please try again.');
      return;
    }
    let messageType = this.isImage ? 'image' : 'text';
    this.sub = this.service.postMessage(this.chatDetail, messageType, this.message)
      .subscribe(
        resolve => {
          this.onMessageSent.emit(resolve);
        },
        error => {
          this.handleWarning('Ahh, something went wrong there. Please try again.');
          HandleError(error);
        }
      );
    this.message = '';
    this.myTextInput.nativeElement.focus();
  }

  onKeyUp(value: KeyboardEvent) {
    let inputValue = this.myTextInput.nativeElement.value;
    if (value.key !== 'Enter') {
      this.message = inputValue;
    } else {
      this.addMessage(this.message);
    }
  }

  setToImage(e) {
    let value = e.target.checked;
    this.isImage = value;
    this.myTextInput.nativeElement.focus();
    if (value) {
      this.placeholder = 'Paste an image URL';
    } else {
      this.placeholder = 'Write a message';
    }
  }

  // TODO: create addEmoji() method

}
