import { ChatThread, Message } from './chat-models';


export const CHAT_THREADS: ChatThread[] = [
  {
    'id': 1,
    'userIDs': [1,3],
    'messageThread': [
      new Message(1, 3, 'Donec id elit non mi porta gravida at eget metus.', 'Tue Jul 19 2016 16:33:06 GMT-0700 (PDT)'),
      new Message(2, 1, ' Praesent commodo cursus magna, vel scelerisque nisl consectetur et.', 'Tue Jul 19 2016 16:40:06 GMT-0700 (PDT)')
    ]
  }
]