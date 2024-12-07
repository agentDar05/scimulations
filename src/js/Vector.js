import Matrix from "./Matrix.js";
import StaticMath from "./StaticMath.js";

export default class Vector {
  static XAXIS = new Vector([1, 0, 0])
  static YAXIS = new Vector([0, 1, 0])
  static ZAXIS = new Vector([0, 0, 1])

  numbers;

  /** @param {number[]} numbers */
  constructor(numbers) {
    if (!Array.isArray(numbers))
      throw new Error(
        "Must pass an array to class Vector. Currently: " + numbers
      );
    const copy = [];

    for (let i = 0; i < numbers.length; i++) {
      if (typeof numbers[i] !== "number")
        throw new Error("Must pass an array of numbers. Currently: " + numbers);
      if (numbers[i] === -0) copy.push(0);
      else copy.push(numbers[i]);
    }
    this.numbers = copy;
  }
  /**
   *
   * @returns {number}
   */
  get dimensions() {
    return this.numbers.length;
  }
  get(idx) {
    return this.numbers[idx];
  }
  scale(scalar) {
    const output = [];
    for (let i = 0; i < this.numbers.length; i++) {
      output.push(this.numbers[i] * scalar);
    }
    return new Vector(output);
  }
  negate() {
    return this.scale(-1);
  }
  /**
   * @param {Vector} b
   */
  projectOn(b) {
    const square = b.dot(b);
    const dotProduct = this.dot(b);
    return b.scale(dotProduct / square);
  }
  rotation(angleInDegrees) {
    const angleInRadians = StaticMath.degreesToRadians(angleInDegrees);
    const cos = Math.cos(angleInRadians);
    const sin = Math.sin(angleInRadians);
    const matrix = Matrix.fromRowsArray([
      [cos, -sin],
      [sin, cos],
    ]);

    const vector = new Vector(this.numbers);
    return matrix.vectorMultiply(vector);
  }
  toString() {
    return "Vector " + this.numbers;
  }
  dot(secondVector) {
    if (this.dimensions !== secondVector.dimensions)
      throw new Error("Vectors must have the same size");
    let number = 0;
    for (let i = 0; i < secondVector.asArray().length; i++) {
      number = number + this.numbers[i] * secondVector.asArray()[i];
    }
    const output = number;
    return output;
  }
  addSpaces(indexOfVector, numberOfSpaces) {
    let number = this.numbers[indexOfVector] + "";
    for (let i = 0; i < numberOfSpaces; i++) {
      number = number + " ";
    }
    return number;
  }
  /**
   *
   * @returns {string[]}
   */
  convertToString() {
    const output = [];
    for (let i = 0; i < this.numbers.length; i++) {
      output.push(this.numbers[i] + "");
    }
    return output;
  }
  findLongestString(strings) {
    let maxLength = 0;
    let longestString = "";

    for (let i = 0; i < strings.length; i++) {
      if (strings[i].length > maxLength) {
        maxLength = strings[i].length;
        longestString = strings[i];
      }
    }

    return { string: longestString, length: maxLength };
  }
  vectorToArrayOfStrings() {
    const result = [];

    const longestNumber = this.findLongestString(this.convertToString());

    for (let i = 0; i < this.numbers.length; i++) {
      const currString = this.numbers[i] + "";
      let curr = this.numbers[i];
      if (currString.length < longestNumber.length) {
        curr = this.addSpaces(i, longestNumber.length - currString.length);
      }
      result.push(curr + "");
    }
    return result;
  }

  /**
   * @param {Vector} v
   * @return {Vector}
   */
  add(v) {
    const output = [];
    const secondSummand = v.asArray();
    for (let i = 0; i < this.numbers.length; i++) {
      output.push(this.numbers[i] + secondSummand[i]);
    }
    return new Vector(output);
  }
  /**
   *
   * @param {Vector} subtrahend
   * @returns {Vector}
   */
  subtract(subtrahend) {
    if (subtrahend instanceof Vector) return this.add(subtrahend.scale(-1));
    else return this.numbers;
  }

  /** @return {number[]} */
  asArray() {
    return Array.from(this.numbers);
  }

  length() {
    let sum = 0;
    for (const curr of this.numbers) {
      sum += Math.pow(curr, 2);
    }
    return Math.sqrt(sum);
  }
  projectOnYZ() {
    if(this.dimensions !== 3)
      throw new Error("Vector must be in 3D space to project it on XY plane. Current: " + this.asArray());
    const components = this.asArray();
    components[0] = 0;
    return new Vector(components);
  }
}
