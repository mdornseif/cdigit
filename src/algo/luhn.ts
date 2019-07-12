/**
 * cdigit
 *
 * @copyright 2018-2019 LiosK
 * @license Apache-2.0
 */

import { Algo, helper } from './common';

/** Luhn algorithm implementation */
class Luhn extends Algo {
  name = 'luhn';
  longName = 'Luhn Algorithm';

  compute(num: string): string {
    const ds = String(num).replace(/[^0-9]/g, '');
    const lookup: {[digit: string]: number} = {
      0: 0, 1: 2, 2: 4, 3: 6, 4: 8, 5: 1, 6: 3, 7: 5, 8: 7, 9: 9,
    };

    let sum = 0;
    let odd = 1;
    for (let i = ds.length - 1; i > -1; i -= 1) {
      sum += odd ? lookup[ds[i]] : Number(ds[i]);
      odd ^= 1;
      if (sum > 0xffffffffffff) { // ~2^48 at max
        sum %= 10;
      }
    }

    return String(10 - sum % 10).slice(-1);
  }

  combine(num: string, cc: string): string {
    return `${num}${cc}`;
  }

  parse(num: string): [string, string] {
    return helper.parseTail(num, 1);
  }
}

export const luhn = new Luhn();
