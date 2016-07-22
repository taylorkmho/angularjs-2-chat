import { provide } from '@angular/core';
import { describe, expect, beforeEach, it, inject, addProviders } from '@angular/core/testing';
import { HTTP_PROVIDERS, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ChatService } from './chat.service';

describe('Chat Service', () => {

  beforeEach(() => {
    addProviders([
      HTTP_PROVIDERS,
      provide(XHRBackend, {useClass: MockBackend}),
      ChatService
    ]);
  });

  it('should refer to a json file', inject([ChatService],(service)=>{
    expect(service.url).toContain('json');
  }))

  it('.getChatLists() should return (multiple) chatThreads', inject([ChatService], (service) => {
     return service.getChatLists().subscribe(data => {
       let chatThreads = data['chatThreads'];
       expect(chatThreads).toBeDefined();
       expect(chatThreads.length).toBeGreaterThan(1);
     });
   }));

  it('.getChatDetail() should return a single chatThread', inject([ChatService], (service) => {
    service.getChatDetail().subscribe((data) => {
      let chatThread = data;
      expect(chatThread).toBeDefined();
      expect(chatThread.length).toBe(1);
    });
  }));

  it('.getUsers() should return users', inject([ChatService], (service) => {
    service.getUsers().subscribe(data => {
      expect(data['users']).toBeDefined();
    });
  }));

});
