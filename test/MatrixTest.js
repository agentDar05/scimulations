import assert from "assert";
import Matrix from "../src/js/Matrix.js";
import Vector from "../src/js/Vector.js";
import { it } from "node:test";
import { describe } from "mocha";

describe("Matrix", () => {
  describe("fromRows", () => {
    it("can create empty Matrix if empty vector array passed", () => {
      assert.deepStrictEqual(new Matrix([]), Matrix.fromRows([]));
    });
    it("creates Matrix from vectors that are rows", () => {
      Matrix.fromRows([]);
    });
  });
    describe("#subtractVector", () => {
      it("subtracts a vector from a matrix", () => {
        const m = new Matrix([
          new Vector([1, 0, -1]),
          new Vector([2, 1, -2]),
          new Vector([3, 0, -3]),
        ]);
        const v = new Vector([1, 0, 0]);
        const expected = console.log(m.subtractVector(v).toString());
        // StaticMath.assertMatrixEqual(m.subtractVector(v), )
      });
    });
  describe("toString", () => {
    it("returns matrix in string", () => {
      const m = new Matrix([
        new Vector([1, 20, 3]),
        new Vector([4, 5, 6]),
        new Vector([7, 8, 9]),
      ]);
      /*
      1  4 7
      20 5 8 
      3  6 9
      */
      const expected = "1  4 7 \n20 5 8 \n3  6 9 ";
      assert.deepStrictEqual(m.toString(), expected);
    });
  });
    describe("transpose", () => {
      it("returns empty matrix if called on an empty matrix", () => {
        assert.deepStrictEqual(new Matrix([]), new Matrix([]).transpose());
      });
      it("transposes matrix", () => {
        const m = new Matrix([
          new Vector([1, 2, 3]),
          new Vector([4, 5, 6]),
          new Vector([7, 8, 9]),
        ]);
        const expected = new Matrix([
          new Vector([1, 4, 7]),
          new Vector([2, 5, 8]),
          new Vector([3, 6, 9]),
        ]);
        assert.deepStrictEqual(m.transpose(), expected);
      });
    });
    describe("#dimensions", () => {
      it("returns string representation of the dimensions", () => {
        let m1x2 = Matrix.fromRowsArray([[3], [4]]);
        assert.strictEqual("1x2", m1x2.dimensionsString);
      });
      it("returns dimensions of matrix", () => {
        const matrix = new Matrix([
          new Vector([5, 3, 6]),
          new Vector([3, 8, 7]),
          new Vector([9, 5, 2]),
          new Vector([1, 0, 0]),
        ]);
        const expected = [4, 3];
        const matrix1 = new Matrix([
          new Vector([5, 3]),
          new Vector([3, 8]),
          new Vector([9, 5]),
          new Vector([1, 0]),
          new Vector([5, 3]),
          new Vector([3, 8]),
          new Vector([9, 5]),
          new Vector([1, 0]),
          new Vector([5, 3]),
          new Vector([3, 8]),
          new Vector([9, 5]),
          new Vector([1, 0]),
        ]);
        const expected1 = [12, 2];
        assert.deepStrictEqual(matrix.dimensions, expected);
        assert.deepStrictEqual(matrix1.dimensions, expected1);
      });
    });


 
  describe("#height", () => {
    it("returns height", () => {
      const matrix = new Matrix([
        new Vector([0, 0, 1]),
        new Vector([0, 0, 1]),
        new Vector([0, 0, 1]),
        new Vector([0, 0, 1]),
      ]);
      const expected = 3;
      assert.deepStrictEqual(matrix.height, expected);
    });
  });
  describe("#width", () => {
    it("returns width", () => {
      const matrix = new Matrix([
        new Vector([0, 0, 1]),
        new Vector([0, 0, 1]),
        new Vector([0, 0, 1]),
        new Vector([0, 0, 1]),
      ]);
      const expected = 4;
      assert.deepStrictEqual(matrix.width, expected);
    });
  });
    describe("#VectorMultiply", () => {
      it("throws an error if incompatible size", () => {
        // add code
        const matrix = new Matrix([
          new Vector([5, 3, 6]),
          new Vector([3, 8, 7]),
          new Vector([9, 5, 2]),
          new Vector([1, 0, 0]),
        ]);
        const vector = new Vector([4, 3, 2]);
        assert.throws(
          () => {
            matrix.vectorMultiply(vector);
          },
          {
            message:
              "matrix and vector have incompatible dimensions: 3x4 and 3",
          }
        );
      });

      it("multiplying by vector", () => {
        const matrix = new Matrix([
          new Vector([5, 3, 6]),
          new Vector([3, 8, 7]),
          new Vector([9, 5, 2]),
        ]);
        const vector = new Vector([4, 3, 2]);
        assert.deepStrictEqual(
          matrix.vectorMultiply(vector),
          new Vector([47, 46, 49])
        );
      });
    });
   describe("#matrixMultiply", () => {
     it("multiplying incompatible matrices throws an error", () => {
       const m2x2 = Matrix.fromRowsArray([
         [1, 1],
         [1, 1],
       ]);
       const m1x1 = new Matrix([new Vector([2])]);
       const m1x2 = Matrix.fromRowsArray([[2], [1]]);
       const m2x1 = Matrix.fromRowsArray([[1, 2]]);
       assert.throws(() => m2x2.matrixMultiply(m1x1), {
         message: "Incompatible matrix dimensions: 2x2 and 1x1",
       });
       assert.throws(() => m2x2.matrixMultiply(m2x1), {
         message: "Incompatible matrix dimensions: 2x2 and 2x1",
       });
       assert.throws(() => m1x1.matrixMultiply(m1x2), {
         message: "Incompatible matrix dimensions: 1x1 and 1x2",
       });
     });
     it("multiplying empty matrix by empty matrix returns an empty matrix", () => {
       assert.deepStrictEqual(
         new Matrix([]).matrixMultiply(new Matrix([])),
         new Matrix([])
       );
     });
     it("multiplying 1x1 by 1x1 returns a 1x1 matrix", () => {
       const actual = new Matrix([new Vector([-3])]).matrixMultiply(
         new Matrix([new Vector([2])])
       );
       assert.deepStrictEqual(actual, new Matrix([new Vector([-6])]));
     });
     it("multiplying 1x1 by 1x1 returns a 1x1 matrix", () => {
       let m2x1 = Matrix.fromRowsArray([[1, 3]]);
       let m1x2 = Matrix.fromRowsArray([[3], [4]]);
       const actual = m2x1.matrixMultiply(m1x2);
       assert.deepStrictEqual(actual, new Matrix([new Vector([15])]));
     });
     it("can multiply matrix by matrix", () => {
       const matrix = Matrix.fromRowsArray([
         [0, 2, 6],
         [-1, 7, -6],
         [2, 3, 11],
       ]);
       const matrix1 = Matrix.fromRowsArray([
         [0, 4, 9],
         [-1, 8, -3],
         [2, 4, 13],
       ]);
       const expected = Matrix.fromRowsArray([
         [10, 40, 72],
         [-19, 28, -108],
         [-3 + 22, 8 + 24 + 44, 9 + 11 * 13],
       ]);
       const actual = matrix.matrixMultiply(matrix1);
       console.log(actual.toString());
       assert.deepStrictEqual(actual, expected);
     });
   });
});
