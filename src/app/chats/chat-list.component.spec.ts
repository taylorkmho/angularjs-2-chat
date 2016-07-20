import {
  async,
  inject,
  addProviders
} from '@angular/core/testing';

import { TestComponentBuilder } from '@angular/compiler/testing';

import { ChatListComponent } from './chat-list.component';

describe('Chat List Component', () => {
  beforeEach(() => {
    addProviders([ChatListComponent]);
  });

});
