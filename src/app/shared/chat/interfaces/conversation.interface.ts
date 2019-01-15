import { User } from '../../user/user.model';

export interface Conversation {
  _id: string;
  participants: User[];
  title?: string;
}
