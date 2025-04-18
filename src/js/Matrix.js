import Vector from "./Vector.js";

export default class Matrix {
  vectors;

  constructor(cols) {
    if (!cols || !Array.isArray(cols))
      throw new Error(
        "The Matrix must be initialized with vectors, but got: " + cols
      );
    this.vectors = cols;
  }
  /**
   *
   * @param {Vector[]} rows
   * @returns {Matrix}
   */
  static fromRows(rows) {
    const cols = new Matrix(rows);
    return cols.transpose();
  }

  /**
   *
   * @param {number[][]} rows
   * @returns {Matrix}
   */
  static fromRowsArray(rows) {
    const rowVectors = [];
    for (let row of rows) {
      rowVectors.push(new Vector(row));
    }
    return Matrix.fromRows(rowVectors);
  }
  /**
   *
   * @param {Vector} v
   * @returns {Matrix}
   */
  addVector(v) {
    const translated = [];
    for (let i = 0; i < this.vectors.length; i++) {
      translated.push(this.vectors.asArray()[i].add(v));
    }
    return new Matrix(translated);
  }

  /**
   * @return {number[][]} each element of the outer array is a column of the matrix
   */
  to2dArray() {
    const arr = []
    for (let i = 0; i < this.vectors.length; i++) {
      arr.push(this.vectors[i].asArray())
    }
    return arr
  }
  /**
   *
   * @returns {Vector[]}
   */
  asArray() {
    return this.vectors;
  }
  /**
   *
   * @param {Vector} vector
   * @returns {Vector}
   */
  subtractVector(vector) {
    const arr = [];
    for (let i = 0; i < this.vectors.length; i++) {
      arr.push(this.getCol(i).subtract(vector));
    }
    return new Matrix(arr);
  }
  /**
   *
   * @returns {string}
   */
  toString() {
    let output = "";
    for (let a = 0; a < this.height; a++) {
      let row = "";
      for (let i = 0; i < this.width; i++) {
        row = row + this.vectors[i].vectorToArrayOfStrings()[a] + " ";
      }

      output = output + row + "\n";
    }

    return output.substring(0, output.length - 1);
  }
  /**
   * @param {Vector}
   * @returns {boolean}
   */
  canMultiplyByVector(vector) {
    return this.width === vector.dimensions;
  }
  /**
   * @returns {Matrix}
   */
  transpose() {
    let rows = [];
    for (let r = 0; r < this.height; r++) {
      const row = [];
      for (let c = 0; c < this.width; c++) {
        row.push(this.vectors[c].asArray()[r]);
      }
      rows.push(new Vector(row));
    }
    return new Matrix(rows);
  }
  /**
   * @returns {Array}
   */
  get dimensions() {
    return [this.width, this.height];
  }
  /**
   * @returns {String}
   */
  get dimensionsString() {
    return this.width + "x" + this.height;
  }
  /**
   *
   * @param {number} colIndex
   * @returns {Vector}
   */
  getCol(colIndex) {
    if (colIndex >= this.width || colIndex < 0)
      throw new Error(
        `Column index ${colIndex} is out of bounds, matrix has ${this.width} columns`
      );

    return this.vectors[colIndex];
  }
  /**
   * @returns {number}
   */
  get height() {
    if (this.vectors.length === 0) return 0;
    return this.vectors[0].dimensions;
  }
  /**
   * @returns {number}
   */
  get width() {
    return this.vectors.length;
  }
  /**
   * @param {Vector} vector
   * @returns {Vector}
   */
  vectorMultiply(vector) {
    if (!vector || vector.constructor.name !== "Vector")
      throw new Error("Vector was expected, got: " + vector);
    if (this.canMultiplyByVector(vector)) {
      const matrix = this.transpose();
      let outputVector = [];
      for (let i = 0; i < this.height; i++) {
        outputVector.push(matrix.asArray()[i].dot(vector));
      }
      return new Vector(outputVector);
    } else
      throw new Error(
        `matrix and vector have incompatible dimensions: ${this.height}x${this.width} and ${vector.dimensions}`
      );
  }

  /**
   *
   * @param {Matrix} right
   * @returns {Matrix}
   */
  matrixMultiply(right) {
    if (this.width !== right.height)
      throw new Error(
        `Incompatible matrix dimensions: ${this.dimensionsString} and ${right.dimensionsString}`
      );
    let array = [];
    let thatArray = right.asArray();
    for (let i = 0; i < right.width; i++) {
      array.push(this.vectorMultiply(thatArray[i]));
    }
    return new Matrix(array);
  }
  numberMultiply(number) {
    const output = []
    for (let i = 0; i < this.vectors.length; i++) {
      /** @type {Vector} */
      let currVector = this.vectors[i];
      currVector = currVector.scale(number)
      output.push(currVector)
    }
    return new Matrix(output)
  }
}
