import { Injectable } from '@angular/core';
import * as emojiRegex from 'emoji-regex';

@Injectable()
export class RegexpService {

  private nameRegex = /^([a-zA-Z]{2,})$/;

  // e.g. "my.email@example.com"
  private emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/;

  // at least one small letter, one big letter, one number, no whitespaces
  private passwordRegex = /^(?!.*[\s])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{7,}$/;

  private emojiRegex = emojiRegex();

  get name(): RegExp {
    return this.nameRegex;
  }

  get email(): RegExp {
    return this.emailRegex;
  }

  get password(): RegExp {
    return this.passwordRegex;
  }

  get emoji(): RegExp {
    return this.emojiRegex;
  }

  containsEmoji(...strings: string[]): boolean {
    return strings.some(string => this.emoji.test(string));
  }

}
