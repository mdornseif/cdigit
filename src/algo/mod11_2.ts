/**
 * cdigit
 *
 * @copyright 2018-2019 LiosK
 * @license Apache-2.0
 */

import { Algo, helper } from './common';

/* tslint:disable:class-name variable-name */

/** ISO/IEC 7064, MOD 11-2 implementation */
class Mod11_2 extends Algo {
  name = 'mod11_2';
  longName = 'ISO/IEC 7064, MOD 11-2';

  private alphabet: string = helper.iso7064.numeric;

  compute(num: string): string {
    const ds = String(num).replace(/[^0-9]/g, '');
    return helper.iso7064.computePure(ds, 11, 2, false, this.alphabet);
  }

  combine(num: string, cc: string): string {
    return `${num}${cc}`;
  }

  parse(num: string): [string, string] {
    return helper.parseTail(num, 1);
  }
}

export const mod11_2 = new Mod11_2();
