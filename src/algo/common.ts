/**
 * cdigit
 *
 * @copyright 2018-2020 LiosK
 * @license Apache-2.0
 */

/** Abstract class for check digit algorithm implementations. */
export abstract class Algo {
  /** cdigit name of the algorithm */
  abstract readonly name: string;

  /** Human-readable name of the algorithm */
  abstract readonly longName: string;

  /**
   * Generate a valid number string from a given string in accordance with the
   * algorithm. The generated string includes the original string and computed
   * check digit(s) that are combined in the manner specified by the algorithm.
   *
   * Note: This method is a shortcut for `combine(num, compute(num))`. Any
   * overriding method must emulate this behavior.
   *
   * @return Number with check digit(s)
   */
  generate(numWithoutCC: string): string {
    return this.combine(numWithoutCC, this.compute(numWithoutCC));
  }

  /**
   * Check if a given string is valid according to the algorithm. The argument
   * must be a combined string of check digit(s) and their original number.
   *
   * Note: This method is a shortcut for `compute(src) === cc` where
   * `[src, cc] = parse(num)`. Any overriding method must emulate this behavior.
   *
   * @return True if valid
   */
  validate(numWithCC: string): boolean {
    const [src, cc] = this.parse(numWithCC);
    return this.compute(src) === cc;
  }

  /**
   * Generate check digit(s) from a given number. Unlike `generate()`, this
   * method returns the check digit(s) only.
   *
   * @return Check digit(s)
   */
  abstract compute(numWithoutCC: string): string;

  /**
   * Combine check digit(s) and their original number to produce a valid number
   * in accordance with the algorithm. Most algorithms just append check
   * digit(s) at the rightmost position of the original number.
   *
   * @return Number with check digit(s)
   */
  abstract combine(numWithoutCC: string, cc: string): string;

  /**
   * Split a number into its original number and check digit(s).
   *
   * @return Tuple of two strings [numWithoutCC, cc]
   */
  abstract parse(numWithCC: string): [string, string];
}

export const helper = {
  parseTail: (num: string, n: number): [string, string] => {
    const ds = String(num);
    return [ds.slice(0, -n), ds.slice(-n)];
  },
  _invCharListMemo: {} as {
    [alphabet: string]: { [character: string]: number };
  },
  invertCharList: (alphabet: string): { [character: string]: number } => {
    if (helper._invCharListMemo[alphabet] == null) {
      helper._invCharListMemo[alphabet] = {};
      const len = alphabet.length;
      for (let i = 0; i < len; i += 1) {
        helper._invCharListMemo[alphabet][alphabet[i]] = i;
      }
      if (len !== Object.keys(helper._invCharListMemo[alphabet]).length) {
        throw new Error("assertion error: chars must be unique");
      }
    }
    return helper._invCharListMemo[alphabet];
  },
  iso7064: {
    numeric: "0123456789X",
    alphabetic: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    alphanumeric: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*",
    /** Implement ISO 7064 pure system recursive method. */
    computePure: (
      num: string,
      mod: number,
      radix: number,
      hasTwoCCs: boolean,
      alphabet: string
    ): string => {
      const ds = `${num}${alphabet[0]}${hasTwoCCs ? alphabet[0] : ""}`;
      const overflowProtection = Math.floor(0xffffffffffff / radix);
      const charmap = helper.invertCharList(alphabet);

      let c = 0;
      for (let i = 0, len = ds.length; i < len; i += 1) {
        c = c * radix + charmap[ds[i]];
        if (c > overflowProtection) {
          c %= mod;
        }
      }
      c = (mod + 1 - (c % mod)) % mod;

      if (hasTwoCCs) {
        return `${alphabet[Math.floor(c / radix)]}${alphabet[c % radix]}`;
      }
      return alphabet[c];
    },
    /** Implement ISO 7064 hybrid system recursive method. */
    computeHybrid: (ds: string, alphabet: string): string => {
      const mod = alphabet.length;
      const charmap = helper.invertCharList(alphabet);

      let c = mod;
      for (let i = 0, len = ds.length; i < len; i += 1) {
        c = (c % (mod + 1)) + charmap[ds[i]];
        c = (c % mod || mod) * 2;
      }
      c %= mod + 1;

      return alphabet[(mod + 1 - c) % mod];
    },
  },
};
