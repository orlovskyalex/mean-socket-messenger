export class MessageModel {

  senderId: string;
  recipientId: string;
  text: string;

  constructor({ senderId, recipientId, text }: MessageModel) {
    this.senderId = senderId;
    this.recipientId = recipientId;
    this.text = text;
  }

}
