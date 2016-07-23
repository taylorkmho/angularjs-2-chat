export class User {
  id: string;
  name: string;
  constructor(
    id?: string,
    name?: string
  ) {
    this.id = id;
    this.name = name;
  }
}

// TODO: Add unread flag
export class ChatDetail {
  id: string;
  userIDs: Array<string>;
  lastUpdated: string;
  messageThread: any;
  constructor(
    id?: string,
    userIDs?: Array<string>,
    lastUpdated?: any,
    messageThread?: any
  ) {
    this.id = id;
    this.userIDs = userIDs;
    this.lastUpdated = lastUpdated;
    this.messageThread = messageThread;
  }
}
