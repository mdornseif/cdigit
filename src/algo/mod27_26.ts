/**
 * cdigit
 *
 * @copyright 2018-2020 LiosK
 * @license Apache-2.0
 */

import { Algo, helper } from "./common";

/** ISO/IEC 7064, MOD 27-26 implementation */
class Mod27_26 extends Algo {
  name = "mod27_26";
  longName = "ISO/IEC 7064, MOD 27-26";

  private alphabet: string = helper.iso7064.alphabetic;

  compute(num: string): string {
    const ds = String(num).replace(/[^A-Z]/g, "");
    return helper.iso7064.computeHybrid(ds, this.alphabet);
  }

  combine(num: string, cc: string): string {
    return `${num}${cc}`;
  }

  parse(num: string): [string, string] {
    return helper.parseTail(num, 1);
  }
}

export const mod27_26 = new Mod27_26();
