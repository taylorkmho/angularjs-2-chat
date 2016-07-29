import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { ApiService } from './shared';
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
  @ViewChild('error') errorEl: ElementRef;
  private title: string;
  private errorVisible: boolean = false;
  private errorMessage: string;
  private backButtonVisible: boolean = false;
  private titleSub: Subscription;
  private backButtonSub: Subscription;
  private errorSub: Subscription;

  constructor(
    private apiService: ApiService,
    private router: Router) {
  }

  ngOnInit() {
    this.titleSub = this.apiService.newTitleSet$
      .subscribe(
        title => this.title = title,
        error => this.handleSubError(error)
      );

    this.backButtonSub = this.apiService.backButtonSet$
      .subscribe(
        display => this.backButtonVisible = display,
        error => this.handleSubError(error)
      );

    this.errorSub = this.apiService.errorSent$
      .subscribe(
        message => {
          if (message) {
            this.errorVisible = true;
            this.errorMessage = message;
          } else {
            this.errorVisible = false;
          }
        },
        error => this.handleSubError(error)
      );
  }

  ngOnDestroy() {
    this.titleSub.unsubscribe();
  }

  private goBack() {
    this.router.navigate(['/']);
  }

  private hideError(): void {
    this.errorVisible = false;
  }

  private handleSubError (error: any) {
    console.error(error);
  }

}