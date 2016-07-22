import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { TimeAgoPipe, DateFormatPipe }  from 'angular2-moment';
import { ReversePipe, HandleError }     from '../shared';
import { ChatService }                  from './chat.service';


@Component({
  selector: 'my-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss'],
  pipes: [ReversePipe, TimeAgoPipe, DateFormatPipe]
})

export class ChatDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  private chatDetail: any;
  @ViewChild('scrollMe') myScrollContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ChatService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.service.getChatDetail(id).subscribe(
          chatDetail => {
            this.chatDetail = chatDetail;
            this.scrollToBottom();
          },
          error => HandleError(error)
        );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  scrollToBottom(): void {
    try {
      setTimeout( () => {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      }, 250)
    } catch(err) {
      console.log(err);
    }
  }

  gotoChatList() {
    this.router.navigate(['/chat-list']);
  }

}
