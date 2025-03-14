import StaticMath from "./StaticMath.js";
export default class AssertUtils {
  /**
   *
   * @param {Matrix} actual
   * @param {Matrix} expected
   * @param {number} epsilon
   */
  static assertMatrixEqual(actual, expected, epsilon = 1e-6) {
    if (typeof epsilon !== "number" || isNaN(epsilon) || !isFinite(epsilon))
      throw new Error(
        `Epsilon is not a number, actual: ${epsilon}, is number:${typeof epsilon === "number"
        }, is NaN: ${isNaN(epsilon)}, isFinite:${isFinite(epsilon)}`
      );
    if (!StaticMath.areArraysEqual(actual.dimensions, expected.dimensions))
      throw new Error(
        `Dimensions of matrices aren't the same: ${actual.dimensions}, ${expected.dimensions}`
      );
    for (let i = 0; i < actual.width; i++) {
      if (!StaticMath.isVectorsEqual(actual.getCol(i), expected.getCol(i), epsilon)) {
        throw new Error(
          `Matrices aren't equal in ${i} column. Actual: ${actual}, expected: ${expected}`
        );
      }
    }
  }
  static assertVectorsEqual(v1, v2, epsilon = 1e-6) {
    if (epsilon === undefined || epsilon === null)
      throw new Error("Epsilon has to be defined, current: " + epsilon);
    if (v1.dimensions !== v2.dimensions)
      throw new Error("Vectors must have the same dimensions");
    for (let i = 0; i < v1.dimensions; i++) {
      if (Math.abs(v1.asArray()[i] - v2.asArray()[i]) >= epsilon)
        throw new Error(
          `Vectors aren't equal, vector 1: ${v1.asArray()}, vector 2: ${v2.asArray()}`
        );
    }
  }
  static assertNumbersEqual(actual, expected, epsilon = 10e-4) {
    if (typeof actual !== "number") {
      throw new Error(`Actual is not a number: ${actual}`);
    }
    if (typeof expected !== "number") {
      throw new Error(`Expected is not a number: ${expected}`);
    }

    if (Math.abs(actual - expected) >= epsilon)
      throw new Error(
        `Numbers aren't equal, actual: ${actual}, expected: ${expected}`
      );
  }
}

