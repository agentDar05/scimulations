import assert from "assert";
import Vector from "../src/js/Vector.js";
import StaticMath from "../src/js/StaticMath.js";
import Matrix from "../src/js/Matrix.js";
import { describe } from "mocha";
import AssertUtils from "../src/js/AssertUtils.js";
import { log } from "console";
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
describe("#angleToPlaneYZ", () => {
  it("returns angle between vector and plane YZ", () => {
    function testAngleToPlaneYZ(vector, degreeInRad) {
      return AssertUtils.assertNumbersEqual(StaticMath.angleToPlaneYZ(vector), degreeInRad, 10e-4);
    }
    const A = new Vector([3, -2, 3]);
    const B = new Vector([2, -3, -3]);
    const C = new Vector([-1, 1, -3]);
    const D = new Vector([-2, 1, 3]);
    const E = new Vector([2, 2, -3]);
    const F = new Vector([2, 1, 3]);
    const G = new Vector([-1, -3, -3]);
    const H = new Vector([-2, -3, 3]);
    const I = new Vector([0, 1, 1]);
    const J = new Vector([1, 0, 0]);
    const K = new Vector ([0, 0, 1])
    //https://www.geogebra.org/calculator/mxzkwwrm
    testAngleToPlaneYZ(A, 2.158798)
    testAngleToPlaneYZ(B, 2.5535)
    testAngleToPlaneYZ(C, -0.785398)
    testAngleToPlaneYZ(D, -1.1070623)
    testAngleToPlaneYZ(E, Math.PI / 4)
    testAngleToPlaneYZ(F, 1.1070623445)
    testAngleToPlaneYZ(G, -2.8199284724)
    testAngleToPlaneYZ(H, -2.553)
    testAngleToPlaneYZ(I, 0)
    testAngleToPlaneYZ(J, Math.PI / 2)
    testAngleToPlaneYZ(K, 0)
  });
});
describe("#angleToPlaneXZ", () => {
  it("returns angle between vector and plane XZ", () => {
    function testAngleToPlaneXZ(vector, degreeInRad) {
      return AssertUtils.assertNumbersEqual(StaticMath.angleToPlaneXZ(vector), degreeInRad, 10e-4);
    }
    const A = new Vector([3, -2, 3]);
    const B = new Vector([2, -3, -3]);
    const C = new Vector([-1, 1, -3]);
    const D = new Vector([-2, 1, 3]);
    const E = new Vector([2, 2, -3]);
    const F = new Vector([2, 1, 3]);
    const G = new Vector([-1, -3, -3]);
    const H = new Vector([-2, -3, 3]);
    const I = new Vector([1, 0, 1]);
    const J = new Vector([0, 1, 0]);
    const K = new Vector([0, 0, 1])

    //https://www.geogebra.org/calculator/mxzkwwrm
    testAngleToPlaneXZ(A, 0.588)
    testAngleToPlaneXZ(B, 0.9827)
    testAngleToPlaneXZ(C, -2.356)
    testAngleToPlaneXZ(D, -2.677) //.
    testAngleToPlaneXZ(E, -(Math.PI / 4));
    testAngleToPlaneXZ(F, -0.4637) 
    testAngleToPlaneXZ(G, 1.8924)
    testAngleToPlaneXZ(H, 2.158)
    testAngleToPlaneXZ(I, 0)
    testAngleToPlaneXZ(J, -(Math.PI / 2))
    testAngleToPlaneXZ(K, 0)
  });
});
describe("#angleToPlaneXY", () => {
  it("returns angle between vector and plane XY", () => {
    function assertVectorAtAngleToXYPlane(vector, degree) {
      return AssertUtils.assertNumbersEqual(StaticMath.angleToPlaneXY(vector), StaticMath.degreesToRadians(degree), 10e-4);
    }
    const A = new Vector([3, -2, 3]);
    const B = new Vector([2, -3, -3]);
    const C = new Vector([-1, 1, -3]);
    const D = new Vector([-2, 1, 3]);
    const E = new Vector([2, 2, -3]);
    const F = new Vector([2, 1, 3]);
    const G = new Vector([-1, -3, -3]);
    const H = new Vector([-2, -3, 3]);
    const I = new Vector([0, 1, 1]);
    const J = new Vector([1, 0, 0]);
    const K = new Vector([0, 1, 0])

    //https://www.geogebra.org/calculator/mxzkwwrm
    assertVectorAtAngleToXYPlane(A, 45)
    assertVectorAtAngleToXYPlane(B, -56.31)
    assertVectorAtAngleToXYPlane(C, -108.43)
    assertVectorAtAngleToXYPlane(D, 123.69)
    assertVectorAtAngleToXYPlane(E, -56.31)
    assertVectorAtAngleToXYPlane(F, 56.31)
    assertVectorAtAngleToXYPlane(G, -108.43)
    assertVectorAtAngleToXYPlane(H, 123.69)
    assertVectorAtAngleToXYPlane(I, 90)
    assertVectorAtAngleToXYPlane(J, 0)
    assertVectorAtAngleToXYPlane(K, 0)

  });
});

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
