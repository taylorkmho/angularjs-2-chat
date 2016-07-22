export class User {
  id: number;
  name: string;
  avatarSrc: string;
  constructor(
    id?: number,
    name?: string,
    avatarSrc?: string
  ) {
    this.id = id;
    this.name = name;
    this.avatarSrc = avatarSrc;
  }
}

export class Message {
  id: number;
  authorID: number;
  text: string;
  sentAt: string;
  constructor(
    id?: number,
    authorID?: number,
    text?: string,
    sentAt?: string
  ) {
    this.id = id;
    this.authorID = id;
    this.text = text;
    this.sentAt = sentAt;
  }
}

export class ChatDetail {
  id: number;
  userIDs: Array<number>;
  messageThread: any;
  constructor(
    id?: number,
    userIDs?: Array<number>,
    messageThread?: any
  ) {
    this.id = id;
    this.userIDs = userIDs;
    this.messageThread = messageThread;
  }
}
