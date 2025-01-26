import assert from "assert";
import { it } from "node:test";
import Vector from "../src/js/Vector.js";
import StaticMath from "../src/js/StaticMath.js";
import Matrix from "../src/js/Matrix.js";
import { describe } from "mocha";
import AssertUtils from "../src/js/AssertUtils.js";
describe("#assertMatrixEqual", () => {
  it("throws Error if matrices aren't equal", () => {
    const matrix1 = new Matrix([
      new Vector([1, 2, 3]),
      new Vector([3, 2, 1]),
      new Vector([4, 0, -1]),
    ]);

    const matrix2 = new Matrix([new Vector([3, 2]), new Vector([3, 2])]);
    let thrown = false;
    try {
      AssertUtils.assertMatrixEqual(matrix1, matrix2, 0.01);
    } catch (error) {
      thrown = true;
    }
    assert.ok(thrown);
  });
});
describe("#projectionOnAxis", () => {
  it("returns vector projection on axis", () => {
    const a = new Vector([1, 0, -3]);
    const actual = a.projectOn(new Vector([0, 0, 1]));
    AssertUtils.assertVectorsEqual(actual, new Vector([0, 0, -3]));
  });
});
describe("#returnAngleBetweenVectors", () => {
  it("returns angle between 2 vectors", () => {
    const axis = new Vector([0, -1, 0]);
    const vector = new Vector([1, -2, 0]);

    assert.strictEqual(
      StaticMath.returnAngleBetweenVectors(vector, axis),
      Math.acos(0.8944271909999159)
    );
  });
});
describe("#angleToPlaneXZ", () => {
  it("returns angle of vector", () => {
    let expected = new Vector([1, 0, 0]);
    expected = StaticMath.getZMatrix(StaticMath.degreesToRadians(30)).vectorMultiply(expected);
    AssertUtils.assertNumbersEqual(
      StaticMath.angleToPlaneXZ(expected),
      StaticMath.degreesToRadians(30),
      1e-5
    );
    AssertUtils.assertNumbersEqual(
      StaticMath.angleToPlaneYZ(expected),
      StaticMath.degreesToRadians(60),
      1e-5
    );
    AssertUtils.assertNumbersEqual(
      StaticMath.angleToPlaneXY(expected),
      0,
      1e-5
    );
  });
  it("returns angle to plane XZ", () => {
    const rotationAxis = new Vector([1, 1, 1]);
    const expected = StaticMath.degreesToRadians(35.26);
    AssertUtils.assertNumbersEqual(StaticMath.angleToPlaneXZ(rotationAxis), expected, 10e-4)
  })
});
describe("#angleToPlaneYZ", () => {
  it("returns angle between vector and plane YZ", () => {
  const rotationAxis = new Vector([1, -1, 1])
    const expected = StaticMath.degreesToRadians(35.26);
    AssertUtils.assertNumbersEqual(
      StaticMath.angleToPlaneYZ(rotationAxis),
      expected,
      10e-4
    );
    
  })
})
describe("#rotationMatrix", () => {
  it("returns rotation matrix", () => {
    const matrixX = StaticMath.getXMatrix(Math.PI / 9);
    const matrixY = StaticMath.getYMatrix(Math.PI / 2);
    const matrixZ = StaticMath.getZMatrix(Math.PI);
    const matrix = matrixZ.matrixMultiply(matrixX.matrixMultiply(matrixY));
    AssertUtils.assertMatrixEqual(
      StaticMath.rotationMatrix(Math.PI / 9, Math.PI / 2, Math.PI),
      matrix
    );
  });
});
