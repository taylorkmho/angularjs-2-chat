import { provideRouter, RouterConfig } from '@angular/router';

import { ChatListComponent } from './chats/chat-list.component';
import { ChatDetailComponent } from './chats/chat-detail.component';

export const routes: RouterConfig = [
  { path: 'chat-list',  component: ChatListComponent },
  { path: 'chat-list/:id', component: ChatDetailComponent },
  { path: '', redirectTo: 'chat-list', pathMatch: 'full' }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
