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
   * @param {{x: number, y: number: z: number}} sideLengths
   * @param {Vector[]} rotationAxes
   * @param {Matrix[]} sides
   */
  constructor(sideLengths, rotationAxes, sides) {
    this.sides = sides;
    this.rotationAxes = rotationAxes;
    this.sideLengths = sideLengths
  }
}

const cubicSides = { x: 50, y: 50, z: 50 };
const tetragonalSides = { x: 50, y: 70, z: 50 };
const orthorhombicSides = { x: 50, y: 60, z: 70 };
const monoclinicSides = { x: 140, y: 52.5, z: 35 }
const monoclinicPoints = {
  A: new Vector([1, 0, 0]).scale(35), // A
  B: new Vector([1, 0, 1]).scale(35), // B
  C: new Vector([4, 0, 1]).scale(35), // C
  D: new Vector([4, 0, 0]).scale(35), // D
  E: new Vector([3, 1.5, 0]).scale(35), // E
  F: new Vector([0, 1.5, 0]).scale(35), // F
  G: new Vector([0, 1.5, 1]).scale(35), // G
  H: new Vector([3, 1.5, 1]).scale(35) // H
}
export const cubic = new LatticeSystem(cubicSides, [new Vector([1, 1, 1])], [
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([cubicSides.x, 0, 0]),
    new Vector([cubicSides.x, 0, cubicSides.z]),
    new Vector([0, 0, cubicSides.z]),
  ]),
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([cubicSides.x, 0, 0]),
    new Vector([cubicSides.x, cubicSides.y, 0]),
    new Vector([0, cubicSides.y, 0]),
  ]),
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([0, 0, cubicSides.z]),
    new Vector([0, cubicSides.y, cubicSides.z]),
    new Vector([0, cubicSides.y, 0]),
  ]),
  new Matrix([
    new Vector([cubicSides.x, 0, 0]),
    new Vector([cubicSides.x, 0, cubicSides.z]),
    new Vector([cubicSides.x, cubicSides.y, cubicSides.z]),
    new Vector([cubicSides.x, cubicSides.y, 0]),
  ]),
  new Matrix([
    new Vector([0, 0, cubicSides.z]),
    new Vector([cubicSides.x, 0, cubicSides.z]),
    new Vector([cubicSides.x, cubicSides.y, cubicSides.z]),
    new Vector([0, cubicSides.y, cubicSides.z]),
  ]),
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([0, 0, cubicSides.z]),
    new Vector([cubicSides.x, 0, cubicSides.z]),
    new Vector([cubicSides.x, 0, 0]),
  ]),
  new Matrix([
    new Vector([cubicSides.x, cubicSides.y, 0]),
    new Vector([cubicSides.x, cubicSides.y, cubicSides.z]),
    new Vector([0, cubicSides.y, cubicSides.z]),
    new Vector([0, cubicSides.y, 0]),
  ]),
]);
export const tetragonal = new LatticeSystem(tetragonalSides, [], [
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([tetragonalSides.x, 0, 0]),
    new Vector([tetragonalSides.x, 0, tetragonalSides.z]),
    new Vector([0, 0, tetragonalSides.z]),
  ]),
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([tetragonalSides.x, 0, 0]),
    new Vector([tetragonalSides.x, tetragonalSides.y, 0]),
    new Vector([0, tetragonalSides.y, 0]),
  ]),
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([0, 0, tetragonalSides.z]),
    new Vector([0, tetragonalSides.y, tetragonalSides.z]),
    new Vector([0, tetragonalSides.y, 0]),
  ]),
  new Matrix([
    new Vector([tetragonalSides.x, 0, 0]),
    new Vector([tetragonalSides.x, 0, tetragonalSides.z]),
    new Vector([tetragonalSides.x, tetragonalSides.y, tetragonalSides.z]),
    new Vector([tetragonalSides.x, tetragonalSides.y, 0]),
  ]),
  new Matrix([
    new Vector([0, 0, tetragonalSides.z]),
    new Vector([tetragonalSides.x, 0, tetragonalSides.z]),
    new Vector([tetragonalSides.x, tetragonalSides.y, tetragonalSides.z]),
    new Vector([0, tetragonalSides.y, tetragonalSides.z]),
  ]),
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([0, 0, tetragonalSides.z]),
    new Vector([tetragonalSides.x, 0, tetragonalSides.z]),
    new Vector([tetragonalSides.x, 0, 0]),
  ]),
  new Matrix([
    new Vector([tetragonalSides.x, tetragonalSides.y, 0]),
    new Vector([tetragonalSides.x, tetragonalSides.y, tetragonalSides.z]),
    new Vector([0, tetragonalSides.y, tetragonalSides.z]),
    new Vector([0, tetragonalSides.y, 0]),
  ]),
]);
export const orthorhombic = new LatticeSystem(orthorhombicSides, [], [
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([orthorhombicSides.x, 0, 0]),
    new Vector([orthorhombicSides.x, 0, orthorhombicSides.z]),
    new Vector([0, 0, orthorhombicSides.z]),
  ]),
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([orthorhombicSides.x, 0, 0]),
    new Vector([orthorhombicSides.x, orthorhombicSides.y, 0]),
    new Vector([0, orthorhombicSides.y, 0]),
  ]),
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([0, 0, orthorhombicSides.z]),
    new Vector([0, orthorhombicSides.y, orthorhombicSides.z]),
    new Vector([0, orthorhombicSides.y, 0]),
  ]),
  new Matrix([
    new Vector([orthorhombicSides.x, 0, 0]),
    new Vector([orthorhombicSides.x, 0, orthorhombicSides.z]),
    new Vector([orthorhombicSides.x, orthorhombicSides.y, orthorhombicSides.z]),
    new Vector([orthorhombicSides.x, orthorhombicSides.y, 0]),
  ]),
  new Matrix([
    new Vector([0, 0, orthorhombicSides.z]),
    new Vector([orthorhombicSides.x, 0, orthorhombicSides.z]),
    new Vector([orthorhombicSides.x, orthorhombicSides.y, orthorhombicSides.z]),
    new Vector([0, orthorhombicSides.y, orthorhombicSides.z]),
  ]),
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([0, 0, orthorhombicSides.z]),
    new Vector([orthorhombicSides.x, 0, orthorhombicSides.z]),
    new Vector([orthorhombicSides.x, 0, 0]),
  ]),
  new Matrix([
    new Vector([orthorhombicSides.x, orthorhombicSides.y, 0]),
    new Vector([orthorhombicSides.x, orthorhombicSides.y, orthorhombicSides.z]),
    new Vector([0, orthorhombicSides.y, orthorhombicSides.z]),
    new Vector([0, orthorhombicSides.y, 0]),
  ]),
]);
export const monoclinic = new LatticeSystem(monoclinicSides, [], [
  // right side
  new Matrix([
    monoclinicPoints.A,
    monoclinicPoints.B,
    monoclinicPoints.G,
    monoclinicPoints.F,
    monoclinicPoints.A
  ]),
  //back
  new Matrix([
    monoclinicPoints.A,
    monoclinicPoints.F,
    monoclinicPoints.E,
    monoclinicPoints.D,
    monoclinicPoints.A
  ]),
  // bottom
  new Matrix([
    monoclinicPoints.A,
    monoclinicPoints.D,
    monoclinicPoints.C,
    monoclinicPoints.B,
    monoclinicPoints.A,
  ]),
  //front
  new Matrix([
    monoclinicPoints.B,
    monoclinicPoints.G,
    monoclinicPoints.H,
    monoclinicPoints.C,
    monoclinicPoints.B,
  ]),
  // left side
  new Matrix([
    monoclinicPoints.B,
    monoclinicPoints.C,
    monoclinicPoints.D,
    monoclinicPoints.E,
    monoclinicPoints.H,
    monoclinicPoints.C,
  ]),
  //top
  new Matrix([
    monoclinicPoints.C,
    monoclinicPoints.H,
    monoclinicPoints.E,
    monoclinicPoints.F,
    monoclinicPoints.G,
    monoclinicPoints.H,
  ])
])
