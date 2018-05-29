export interface TokenPayload {
  email: string;
  password: string;
  name?: {
    first: string;
    last: string;
  };
}
