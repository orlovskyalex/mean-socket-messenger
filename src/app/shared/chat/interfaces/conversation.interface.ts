import { Message } from './message.interface';
import { User } from '../../user/user.model';

export interface Conversation {
  _id?: string;
  title?: string;
  participants?: User[];
  messages?: Message[];
}
