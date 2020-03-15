/**
 * cdigit
 *
 * @copyright 2018-2020 LiosK
 * @license Apache-2.0
 */

import { Algo, helper } from "./common";

/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/class-name-casing */

/** ISO/IEC 7064, MOD 1271-36 implementation */
class Mod1271_36 extends Algo {
  name = "mod1271_36";
  longName = "ISO/IEC 7064, MOD 1271-36";

  private alphabet: string = helper.iso7064.alphanumeric;

  compute(num: string): string {
    const ds = String(num).replace(/[^0-9A-Z]/g, "");
    return helper.iso7064.computePure(ds, 1271, 36, true, this.alphabet);
  }

  combine(num: string, cc: string): string {
    return `${num}${cc}`;
  }

  parse(num: string): [string, string] {
    return helper.parseTail(num, 2);
  }
}

export const mod1271_36 = new Mod1271_36();
