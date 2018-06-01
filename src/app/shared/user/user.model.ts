export class User {

  _id: string;
  email: string;
  name: {
    first: string,
    last: string,
  };

  constructor({ _id, email, name }: User) {
    this._id = _id;
    this.email = email;
    this.name = name;
  }

  get fullName(): string {
    const { first, last } = this.name;
    return `${first} ${last}`;
  }

}
