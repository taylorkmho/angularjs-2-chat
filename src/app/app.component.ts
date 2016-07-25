import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { ApiService, HandleError } from './shared';
import { ChatService } from './chats/chat.service';

import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'my-app', // <my-app></my-app>
  providers: [ApiService, ChatService, HTTP_PROVIDERS],
  directives: [...ROUTER_DIRECTIVES],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {
  title: string;
  displayBackButton: boolean = false;
  titleSub: Subscription;
  backButtonSub: Subscription;

  constructor(
    private apiService: ApiService,
    private location: Location) {
  }

  ngOnInit() {
    this.titleSub = this.apiService.newTitleSet$
      .subscribe(
        title => this.title = title,
        error => HandleError(error)
      );

    this.backButtonSub = this.apiService.backButtonSet$
      .subscribe(
        display => this.displayBackButton = display,
        error => HandleError(error)
      );
  }

  ngOnDestroy() {
    this.titleSub.unsubscribe();
  }

  backClicked() {
    this.location.back();
  }

}
