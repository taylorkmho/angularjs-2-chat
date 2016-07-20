import { provideRouter, RouterConfig } from '@angular/router';

import { ChatListComponent } from './chats/chat-list.component';

export const routes: RouterConfig = [
  { path: 'chat-list',  component: ChatListComponent },
  { path: '', redirectTo: 'chat-list', pathMatch: 'full' }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
