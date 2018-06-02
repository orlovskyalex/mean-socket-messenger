import { User } from '../user/user.model';

export class MessageModel {

  sender: User;
  recipient: User;
  message: string;
  sentAt: string;

  constructor({ sender, recipient, message, sentAt }: MessageModel) {
    this.sender = sender;
    this.recipient = recipient;
    this.message = message;
    this.sentAt = sentAt;
  }

}
