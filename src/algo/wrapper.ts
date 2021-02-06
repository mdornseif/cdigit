/**
 * cdigit
 *
 * @copyright 2018-2020 LiosK
 * @license Apache-2.0
 */

import { Algo } from "./common";

type Filter = (input: string) => string;

export class AlgoWrapper extends Algo {
  name: string;
  longName: string;

  constructor(readonly algo: Algo, name?: string, longName?: string) {
    super();
    this.name = name || `wrapper(${algo.name})`;
    this.longName = longName || `AlgoWrapper(${algo.longName})`;
  }

  compute(num: string): string {
    return this.algo.compute(num);
  }

  combine(num: string, cc: string): string {
    return this.algo.combine(num, cc);
  }

  parse(num: string): [string, string] {
    return this.algo.parse(num);
  }

  readonly numWithCCInputFilters = [];
  readonly numWithoutCCInputFilters = [];
  readonly numWithoutCCOutputFilters = [];
  readonly checkCharsOutputFilters = [];
  readonly numFormatters = [];

  static buildRegExpValidator(re: RegExp): Filter {
    return (num: string) => {
      if (!re.test(num)) {
        throw new Error(`invalid format: ${num}`);
      }
      return num;
    };
  }

  /**
   * @return tuple of filters [tr s1 s2, tr s2 s1] in Unix's tr terms
   */
  static buildCharTranslators(s1: string, s2?: string): [Filter, Filter] {
    const len = s1.length;
    const ns2 = s2 || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, len);
    if (len !== ns2.length) {
      throw new Error("assertion error: s1 and s2 must have same length");
    }

    type CharMap = { [character: string]: string };

    const map1: CharMap = {};
    const map2: CharMap = {};
    for (let i = 0; i < len; i += 1) {
      map1[s1[i]] = ns2[i];
      map2[ns2[i]] = s1[i];
    }
    if (len !== Object.keys(map1).length || len !== Object.keys(map2).length) {
      throw new Error("assertion error: chars must be unique");
    }

    const build = (map: CharMap) => (num: string): string => {
      let buffer = "";
      for (let i = 0, len = num.length; i < len; i += 1) {
        // CharMap[x] won't be falsy unless it's undefined
        buffer += map[num[i]] || num[i];
      }
      return buffer;
    };

    return [build(map1), build(map2)];
  }
}
