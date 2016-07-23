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

export class ChatDetail {
  id: string;
  userIDs: Array<string>;
  messageThread: any;
  constructor(
    id?: string,
    userIDs?: Array<string>,
    messageThread?: any
  ) {
    this.id = id;
    this.userIDs = userIDs;
    this.messageThread = messageThread;
  }
}
