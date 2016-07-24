import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter,
         Output, Input } from '@angular/core';
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
  @ViewChild('loaderBar') myLoaderBar: ElementRef;
  @Input('chatDetail') chatDetail: ChatDetail[];
  @Output() onMessageSent = new EventEmitter<boolean>();
  private reader  = new FileReader();
  private showWarning = false;
  private textMessage = '';

  constructor(
    private route: ActivatedRoute,
    private service: ChatService) {}

  ngOnInit() {
  }

  // TODO: store textMessage in localStorage onDestroy
  ngOnDestroy() {
  }

  handleWarning(message) {
    if (message) {
      this.showWarning = true;
      this.myLoaderBar.nativeElement.innerHTML = message;
    } else {
      this.showWarning = false;
    }
  }

  addTextMessage() {
    if (this.textMessage === '') { return; };
    this.service.postMessage(this.chatDetail, 'text', this.textMessage)
      .subscribe(
        resolve => {
          this.onMessageSent.emit(resolve);
        },
        error => {
          this.handleWarning('Ahh, something went wrong there. Please try again.');
          HandleError(error);
        }
      );
    this.textMessage = '';
    this.myTextInput.nativeElement.focus();
  }

  onKeyUp(value: KeyboardEvent) {
    let inputValue = this.myTextInput.nativeElement.value;
    if (value.key !== 'Enter') {
      this.textMessage = inputValue;
    } else {
      this.addTextMessage();
    }
  }

  imageSelected(fileInput: any){
    this.reader.onload = this.imageIsLoaded.bind(this);
    this.reader.readAsDataURL(fileInput.target.files[0]);
  }

  imageIsLoaded(e) {
    let contents = e.target.result,
        error    = e.target.error,
        size     = e.loaded / 1000; // to Megabytes

    if (error != null) {
      HandleError('File could not be read! Code ' + error.code);
      this.handleWarning('Ahh, something went wrong there. Please try again.');
    } else if (size > 1) {
      this.handleWarning('That image is too big! Max file size is 1MB.');
    } else {
      this.addImageMessage(contents)
    }
  }

  addImageMessage(image) {
    this.service.postMessage(this.chatDetail, 'image', image)
      .subscribe(
        resolve => {
          this.onMessageSent.emit(resolve);
        },
        error => {
          this.handleWarning('Ahh, something went wrong there. Please try again.');
          HandleError(error);
        }
      );
  }

  // TODO: create addEmoji() method

}
