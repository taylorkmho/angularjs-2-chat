import { provide } from '@angular/core';
import {
  describe,
  expect,
  beforeEach,
  it,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import {Headers, HTTP_PROVIDERS, BaseRequestOptions, XHRBackend, Response} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { ChatService } from './chat.service';

describe('Chat Service', () => {
  let service, mockBackend;

  beforeEachProviders(() => [
    HTTP_PROVIDERS,
    provide(XHRBackend, {useClass: MockBackend}),
    ChatService
  ]);

  beforeEach(inject([ChatService, XHRBackend], (s, xhr) => {
    service = s;
    mockBackend = xhr;
  }));

  it('should refer to a json file', ()=>{
    expect(service.url).toContain('json');
  })

  it('.getChatLists() should return chatThreads', () => {
    let chatThreads;
    service.getChatLists().subscribe((data) => {
      chatThreads = data['chatThreads'];
      expect(chatThreads).toBeDefined();
    });
  });

  it('.getUsers() should return users', () => {
    service.getUsers().subscribe(data => {
      expect(data['users']).toBeDefined();
    });
  });

});
