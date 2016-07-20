import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

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
export class AppComponent {
  constructor(private api: ApiService) {
  }
}
