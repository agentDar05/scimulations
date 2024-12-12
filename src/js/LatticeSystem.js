import Matrix from "./Matrix.js";
import Vector from "./Vector.js"
import { cubic, tetragonal } from "./drawCrystals.js";
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
export { tetragonalFigure, cubicFigure }