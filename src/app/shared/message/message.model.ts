import { get } from 'lodash';

export class MessageModel {

  senderId?: string;
  text?: string;

  constructor(params?: MessageModel) {
    this.senderId = get(params, 'senderId', '');
    this.text = get(params, 'text', '');
  }

}
