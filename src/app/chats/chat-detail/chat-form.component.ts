import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter,
         Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, KeysPipe, ReversePipe } from '../../shared';
import { ChatService } from './../chat.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss'],
  pipes: [ReversePipe,  KeysPipe]
})

export class ChatFormComponent implements OnInit, OnDestroy {
  @ViewChild('text') textEl: ElementRef;
  @ViewChild('warning') warningEl: ElementRef;
  @Input('chatDetail') chatDetail;
  @Output() onMessageSent = new EventEmitter<boolean>();
  private warningVisible: boolean = false;
  private isImage: boolean = false;
  private placeholder: string = 'Write a message';
  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private service: ChatService,
    private apiService: ApiService) {}

  ngOnInit() {
  }

  // TODO: store textMessage in localStorage onDestroy
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  showWarning(warning: any): void {
    if (warning) {
      this.warningVisible = true;
      this.warningEl.nativeElement.innerHTML = warning;
    } else {
      this.warningVisible = false;
      this.textEl.nativeElement.focus();
    }
  }

  addMessage(message: string): void {
    this.showWarning(false);
    if (message === '') {
      return;
    } else if (this.isImage && !/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i.test(message)) {
      this.showWarning('Oops, that doesn&rsquo;t look like a valid image URL. Please try again.');
      return;
    }

    let messageType = this.isImage ? 'image' : 'text';
    this.sub = this.service.postMessage(this.chatDetail, messageType, message)
      .subscribe(
        resolve => {
          this.onMessageSent.emit(resolve);
          this.textEl.nativeElement.value = '';
          this.textEl.nativeElement.focus();
        },
        error => {
          this.apiService.sendError('Oops, something went wrong. Please try later.', error);
        }
      );
  }

  setToImage(e): void {
    let value = e.target.checked;
    this.isImage = value;
    this.textEl.nativeElement.focus();
    if (value) {
      this.placeholder = 'Paste an image URL';
    } else {
      this.placeholder = 'Write a message';
    }
  }

  // TODO: create addEmoji() method

}
