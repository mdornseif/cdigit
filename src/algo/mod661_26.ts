/**
 * cdigit
 *
 * @copyright 2018-2019 LiosK
 * @license Apache-2.0
 */

import { Algo, helper } from './common';

/* tslint:disable:class-name variable-name */

/** ISO/IEC 7064, MOD 661-26 implementation */
class Mod661_26 extends Algo {
  name = 'mod661_26';
  longName = 'ISO/IEC 7064, MOD 661-26';

  private alphabet: string = helper.iso7064.alphabetic;

  compute(num: string): string {
    const ds = String(num).replace(/[^A-Z]/g, '');
    return helper.iso7064.computePure(ds, 661, 26, true, this.alphabet);
  }

  combine(num: string, cc: string): string {
    return `${num}${cc}`;
  }

  parse(num: string): [string, string] {
    return helper.parseTail(num, 2);
  }
}

export const mod661_26 = new Mod661_26();
