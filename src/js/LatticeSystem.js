import Matrix from "./Matrix.js";
import Vector from "./Vector.js"

class LatticeSystem {
  /** @type {Matrix[]} */
  sides;
  /** @type {Vector[]} */
  rotationAxes;
  /** @type {{x: number, y: number: z: number}} */
  sideLengths;
  /**
   * @param {Matrix[]} sides
   * @param {{x: number, y: number: z: number}} sideLengths
   * @param {Vector[]} rotationAxes
   */
  constructor(sides, sideLengths, rotationAxes) {
    this.sides = sides;
    this.rotationAxes = rotationAxes;
    this.sideLengths = sideLengths
  }
}

const cubic = { sides: { x: 50, y: 50, z: 50 } };
const tetragonal = { sides: { x: 50, y: 70, z: 50 } };

export const cubicFigure1 = new LatticeSystem([], cubic.sides, [new Vector([1, 1, 1])])
export const tetragonalFigure1 = new LatticeSystem([], tetragonal.sides, [])

const tetragonalFigure = [
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([tetragonal.sides.x, 0, 0]),
    new Vector([tetragonal.sides.x, 0, tetragonal.sides.z]),
    new Vector([0, 0, tetragonal.sides.z]),
  ]),
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([tetragonal.sides.x, 0, 0]),
    new Vector([tetragonal.sides.x, tetragonal.sides.y, 0]),
    new Vector([0, tetragonal.sides.y, 0]),
  ]),
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([0, 0, tetragonal.sides.z]),
    new Vector([0, tetragonal.sides.y, tetragonal.sides.z]),
    new Vector([0, tetragonal.sides.y, 0]),
  ]),
  new Matrix([
    new Vector([tetragonal.sides.x, 0, 0]),
    new Vector([tetragonal.sides.x, 0, tetragonal.sides.z]),
    new Vector([tetragonal.sides.x, tetragonal.sides.y, tetragonal.sides.z]),
    new Vector([tetragonal.sides.x, tetragonal.sides.y, 0]),
  ]),
  new Matrix([
    new Vector([0, 0, tetragonal.sides.z]),
    new Vector([tetragonal.sides.x, 0, tetragonal.sides.z]),
    new Vector([tetragonal.sides.x, tetragonal.sides.y, tetragonal.sides.z]),
    new Vector([0, tetragonal.sides.y, tetragonal.sides.z]),
  ]),
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([0, 0, tetragonal.sides.z]),
    new Vector([tetragonal.sides.x, 0, tetragonal.sides.z]),
    new Vector([tetragonal.sides.x, 0, 0]),
  ]),
  new Matrix([
    new Vector([tetragonal.sides.x, tetragonal.sides.y, 0]),
    new Vector([tetragonal.sides.x, tetragonal.sides.y, tetragonal.sides.z]),
    new Vector([0, tetragonal.sides.y, tetragonal.sides.z]),
    new Vector([0, tetragonal.sides.y, 0]),
  ]),
];
const cubicFigure = [
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([cubic.sides.x, 0, 0]),
    new Vector([cubic.sides.x, 0, cubic.sides.z]),
    new Vector([0, 0, cubic.sides.z]),
  ]),
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([cubic.sides.x, 0, 0]),
    new Vector([cubic.sides.x, cubic.sides.y, 0]),
    new Vector([0, cubic.sides.y, 0]),
  ]),
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([0, 0, cubic.sides.z]),
    new Vector([0, cubic.sides.y, cubic.sides.z]),
    new Vector([0, cubic.sides.y, 0]),
  ]),
  new Matrix([
    new Vector([cubic.sides.x, 0, 0]),
    new Vector([cubic.sides.x, 0, cubic.sides.z]),
    new Vector([cubic.sides.x, cubic.sides.y, cubic.sides.z]),
    new Vector([cubic.sides.x, cubic.sides.y, 0]),
  ]),
  new Matrix([
    new Vector([0, 0, cubic.sides.z]),
    new Vector([cubic.sides.x, 0, cubic.sides.z]),
    new Vector([cubic.sides.x, cubic.sides.y, cubic.sides.z]),
    new Vector([0, cubic.sides.y, cubic.sides.z]),
  ]),
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([0, 0, cubic.sides.z]),
    new Vector([cubic.sides.x, 0, cubic.sides.z]),
    new Vector([cubic.sides.x, 0, 0]),
  ]),
  new Matrix([
    new Vector([cubic.sides.x, cubic.sides.y, 0]),
    new Vector([cubic.sides.x, cubic.sides.y, cubic.sides.z]),
    new Vector([0, cubic.sides.y, cubic.sides.z]),
    new Vector([0, cubic.sides.y, 0]),
  ]),
];
export { tetragonalFigure, cubicFigure, cubic, tetragonal }