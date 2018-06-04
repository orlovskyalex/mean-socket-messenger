import { User } from '../../user/user.model';

export interface Message {

  _id?: string;
  conversation?: string;
  author: User;
  body: string;

}
