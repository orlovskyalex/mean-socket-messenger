import { Injectable } from '@angular/core';
import * as emojiRegex from 'emoji-regex';
import { singleLineRegExp } from '../utils/singleLineRegExp.tag';

@Injectable()
export class RegexService {

  private nameRegex = /^([a-zA-Z]{2,})$/;

  // RFC 2822 compliant regex
  private emailRegex = new RegExp(singleLineRegExp`
    ^(?!.*[\\s])[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*
    @(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$
  `);

  // at least one small letter, one big letter, one numeral, seven characters
  // no whitespaces or emoji
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

}
