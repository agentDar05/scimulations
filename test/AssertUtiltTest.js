import Vector from "../src/js/Vector.js";
import AssertUtils from "../src/js/AssertUtils.js";
import { it } from "node:test";
import { describe } from "mocha";
import assert from "assert";
describe("#assertVectorsEqual", () => {
  it("throws Error if vectors don't have the same size", () => {
    const vector1 = new Vector([1, 2, 0]);
    const vector2 = new Vector([1, 2]);

    assert.throws(
      () => {
        AssertUtils.assertVectorsEqual(vector1, vector2, 0.1);
      },
      { message: "Vectors must have the same dimensions" }
    );
  });
  it("throws Error if vector 2 is bigger than vector 1", () => {
    const vector1 = new Vector([0, 0]);
    const vector2 = new Vector([1, 0]);

    assert.throws(
      () => {
        AssertUtils.assertVectorsEqual(vector1, vector2, 0.1);
      },

      { message: "Vectors aren't equal, vector 1: 0,0, vector 2: 1,0" }
    );
  });
  it("throws Error if dimensions of vector 1 are bigger than dimensions of vector 2", () => {
    const vector1 = new Vector([2, 0]);
    const vector2 = new Vector([1, -1]);

    assert.throws(
      () => {
        AssertUtils.assertVectorsEqual(vector1, vector2, 0.1);
      },
      { message: "Vectors aren't equal, vector 1: 2,0, vector 2: 1,-1" }
    );
  });
  it("doesn't throw an error if the difference of 2 components of the vectors is not greater than the epsilon", () => {
    const vector1 = new Vector([2, 0]);
    const vector2 = new Vector([1.999, 0]);

    assert.doesNotThrow(() => {
      AssertUtils.assertVectorsEqual(vector1, vector2, 0.001);
    });
  });
});
