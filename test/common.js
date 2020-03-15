const assert = require("assert").strict;

module.exports = {
  /**
   * Execute common tests on an Algo instance
   * @param {Algo} algo
   * @param {[validString, sourceString, checkCharacter][]} validCases
   * @param {invalidString[]} invalidStrings
   */
  testAlgo: (algo, validCases, invalidStrings) => {
    describe("Algo type", () => {
      it("implements name", () => {
        assert.equal(typeof algo.name, "string", "typeof algo.name");
      });
      it("implements longName", () => {
        assert.equal(typeof algo.longName, "string", "typeof algo.longName");
      });
      it("implements generate()", () => {
        assert.equal(typeof algo.generate, "function", "typeof algo.generate");
      });
      it("implements validate()", () => {
        assert.equal(typeof algo.validate, "function", "typeof algo.validate");
      });
      it("implements compute()", () => {
        assert.equal(typeof algo.compute, "function", "typeof algo.compute");
      });
      it("implements combine()", () => {
        assert.equal(typeof algo.combine, "function", "typeof algo.combine");
      });
      it("implements parse()", () => {
        assert.equal(typeof algo.parse, "function", "typeof algo.parse");
      });
    });

    describe("generate()", () => {
      it("generates a valid number", () => {
        // eslint-disable-next-line no-unused-vars
        validCases.forEach(([num, src, cc]) => {
          assert.equal(algo.generate(src), num, `generate(${src})`);
        });
      });
      it("generates a valid number that validate() accepts", () => {
        // eslint-disable-next-line no-unused-vars
        validCases.forEach(([num, src, cc]) => {
          assert.ok(
            algo.validate(algo.generate(src)),
            `validate(generate(${src}))`
          );
        });
      });
      it("generates a valid number that parse() can parse", () => {
        // eslint-disable-next-line no-unused-vars
        validCases.forEach(([num, src, cc]) => {
          assert.deepEqual(
            algo.parse(algo.generate(src)),
            [src, cc],
            `parse(generate(${src}))`
          );
        });
      });
      it("is a shortcut for `combine(num, compute(num))`", () => {
        // eslint-disable-next-line no-unused-vars
        validCases.forEach(([num, src, cc]) => {
          assert.equal(
            algo.generate(src),
            algo.combine(src, algo.compute(src)),
            `generate(${src})`
          );
        });
      });
    });

    describe("validate()", () => {
      it("returns true if a number is valid", () => {
        // eslint-disable-next-line no-unused-vars
        validCases.forEach(([num, src, cc]) => {
          assert.ok(algo.validate(num), `validate(${num})`);
        });
      });
      it("returns false if a number is invalid", () => {
        invalidStrings.forEach(num => {
          assert.ok(!algo.validate(num), `validate(${num})`);
        });
      });
      it("is a shortcut for `compute(src) === cc`", () => {
        // eslint-disable-next-line no-unused-vars
        validCases.forEach(([num, src, cc]) => {
          assert.equal(
            algo.validate(num),
            algo.compute(src) === cc,
            `validate(${num})`
          );
        });
      });
    });

    describe("compute()", () => {
      it("computes correct check digit(s)", () => {
        // eslint-disable-next-line no-unused-vars
        validCases.forEach(([num, src, cc]) => {
          assert.equal(algo.compute(src), cc, `compute(${src})`);
        });
      });
    });

    describe("combine()", () => {
      it("constructs a valid number from a source number and check digit(s)", () => {
        // eslint-disable-next-line no-unused-vars
        validCases.forEach(([num, src, cc]) => {
          assert.equal(algo.combine(src, cc), num, `combine(${src}, ${cc})`);
        });
      });
      it("combines `parse(num)`", () => {
        // eslint-disable-next-line no-unused-vars
        validCases.forEach(([num, src, cc]) => {
          assert.equal(
            algo.combine(...algo.parse(num)),
            num,
            `combine(...parse(${num}))`
          );
        });
      });
    });

    describe("parse()", () => {
      it("extracts the source number and check digit(s)", () => {
        // eslint-disable-next-line no-unused-vars
        validCases.forEach(([num, src, cc]) => {
          assert.deepEqual(algo.parse(num), [src, cc], `parse(${num})`);
        });
      });
      it("parses `combine(src, cc)`", () => {
        // eslint-disable-next-line no-unused-vars
        validCases.forEach(([num, src, cc]) => {
          assert.deepEqual(
            algo.parse(algo.combine(...[src, cc])),
            [src, cc],
            `parse(combine(...[${src}, ${cc}]))`
          );
        });
      });
    });
  }
};
