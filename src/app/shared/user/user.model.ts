import { get } from 'lodash';

export class User {

  _id?: string;
  email?: string;
  name?: {
    first: string,
    last: string,
  };

  constructor(params?: User) {
    this._id = get(params, '_id', null);
    this.email = get(params, 'email', null);
    this.name = get(params, 'name', null);
  }

  get fullName(): string {
    const { first, last } = this.name;
    return `${first} ${last}`;
  }

}
