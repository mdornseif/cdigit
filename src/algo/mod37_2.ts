/**
 * cdigit
 *
 * @copyright 2018-2020 LiosK
 * @license Apache-2.0
 */

import { Algo, helper } from "./common";

/** ISO/IEC 7064, MOD 37-2 implementation */
class Mod37_2 extends Algo {
  name = "mod37_2";
  longName = "ISO/IEC 7064, MOD 37-2";

  private alphabet: string = helper.iso7064.alphanumeric;

  compute(num: string): string {
    const ds = String(num).replace(/[^0-9A-Z]/g, "");
    return helper.iso7064.computePure(ds, 37, 2, false, this.alphabet);
  }

  combine(num: string, cc: string): string {
    return `${num}${cc}`;
  }

  parse(num: string): [string, string] {
    return helper.parseTail(num, 1);
  }
}

export const mod37_2 = new Mod37_2();
