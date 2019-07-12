/**
 * cdigit
 *
 * @copyright 2018-2019 LiosK
 * @license Apache-2.0
 */

import { Algo, helper } from './common';

/* tslint:disable:class-name variable-name */

/** ISO/IEC 7064, MOD 11-10 implementation */
class Mod11_10 extends Algo {
  name = 'mod11_10';
  longName = 'ISO/IEC 7064, MOD 11-10';

  private alphabet: string = helper.iso7064.numeric.slice(0, -1);

  compute(num: string): string {
    const ds = String(num).replace(/[^0-9]/g, '');
    return helper.iso7064.computeHybrid(ds, this.alphabet);
  }

  combine(num: string, cc: string): string {
    return `${num}${cc}`;
  }

  parse(num: string): [string, string] {
    return helper.parseTail(num, 1);
  }
}

export const mod11_10 = new Mod11_10();
