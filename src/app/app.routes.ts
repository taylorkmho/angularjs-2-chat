import { provideRouter, RouterConfig } from '@angular/router';

import { ChatListComponent } from './chats/chat-list.component';
import { ChatDetailComponent } from './chats/chat-detail.component';

export const routes: RouterConfig = [
  { path: '',  component: ChatListComponent },
  { path: ':id', component: ChatDetailComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
