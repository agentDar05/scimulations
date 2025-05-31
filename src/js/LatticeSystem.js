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
const trigonalSides = { x: 60, y: 45, z: 30 }
const triclinicSides = { x: 60, y: 45, z: 30 }
const hexagonalSides = { x: 30, y: 51.9, z: 45 }

const monoclinicScalar = 35;

const monoclinicPoints = {
  A: new Vector([1, 0, 0]).scale(monoclinicScalar), // A
  B: new Vector([1, 0, 1]).scale(monoclinicScalar), // B
  C: new Vector([4, 0, 1]).scale(monoclinicScalar), // C
  D: new Vector([4, 0, 0]).scale(monoclinicScalar), // D
  E: new Vector([3, 1.5, 0]).scale(monoclinicScalar), // E
  F: new Vector([0, 1.5, 0]).scale(monoclinicScalar), // F
  G: new Vector([0, 1.5, 1]).scale(monoclinicScalar), // G
  H: new Vector([3, 1.5, 1]).scale(monoclinicScalar) // H
}
const trigonalScalar = 15;
const trigonalPoints = {
  A: new Vector([0, 0, 0]).scale(trigonalScalar), // A
  B: new Vector([2, 3, 0]).scale(trigonalScalar), // B
  C: new Vector([4, 0, 0]).scale(trigonalScalar), // C
  D: new Vector([2, -3, 0]).scale(trigonalScalar), // D
  E: new Vector([2, 6, 2]).scale(trigonalScalar), // E
  F: new Vector([2, 0, 2]).scale(trigonalScalar), // F
  G: new Vector([4, 3, 2]).scale(trigonalScalar), // G
  H: new Vector([0, 3, 2]).scale(trigonalScalar) // H
}
const triclinicScalar = 10
const triclinicPoints = {
  A: new Vector([0, 0, 0]).scale(triclinicScalar), // A
  B: new Vector([4, 0, 0]).scale(triclinicScalar), // B
  C: new Vector([2, 4, 0]).scale(triclinicScalar), // C
  D: new Vector([1, 1, 4]).scale(triclinicScalar), // D
  E: new Vector([6, 4, 0]).scale(triclinicScalar), // E
  F: new Vector([5, 1, 4]).scale(triclinicScalar), // F
  G: new Vector([3, 5, 4]).scale(triclinicScalar), // G
  H: new Vector([7, 5, 4]).scale(triclinicScalar) // H
}
const hexagonalScalar = 15
const hexagonalPoints = {
  A: new Vector([0, 0, 0]).scale(hexagonalScalar),
  B: new Vector([2, 0, 0]).scale(hexagonalScalar),
  C: new Vector([3, 0, 1.73]).scale(hexagonalScalar),
  D: new Vector([2, 0, 3.46]).scale(hexagonalScalar),
  E: new Vector([0, 0, 3.46]).scale(hexagonalScalar),
  F: new Vector([-1, 0, 1.73]).scale(hexagonalScalar),
  G: new Vector([0, 3, 0]).scale(hexagonalScalar),
  H: new Vector([2, 3, 0]).scale(hexagonalScalar),
  I: new Vector([3, 3, 1.73]).scale(hexagonalScalar),
  J: new Vector([2, 3, 3.46]).scale(hexagonalScalar),
  K: new Vector([0, 3, 3.46]).scale(hexagonalScalar),
  L: new Vector([-1, 3, 1.73]).scale(hexagonalScalar),
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
// https://www.geogebra.org/calculator/zebbtnsz
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
// https://www.geogebra.org/calculator/eesen4qa
// https://www.geogebra.org/calculator/mpanwp7h
export const trigonal = new LatticeSystem(trigonalSides, [], [
  new Matrix([
    trigonalPoints.A,// a
    trigonalPoints.B,// b 
    trigonalPoints.C,// c 
    trigonalPoints.D,// d 
    trigonalPoints.A// a
  ]),
  new Matrix([
    trigonalPoints.A,// a
    trigonalPoints.H,// h 
    trigonalPoints.F,// f
    trigonalPoints.D,// d 
    trigonalPoints.A,// a
  ]),
  new Matrix([
    trigonalPoints.A,// a
    trigonalPoints.H,// h 
    trigonalPoints.E,// e
    trigonalPoints.B,// b
  ]),
  new Matrix([
    trigonalPoints.B,// b
    trigonalPoints.E,// e
    trigonalPoints.G,// g
    trigonalPoints.C,// c
  ]),
  new Matrix([
    trigonalPoints.C,// c
    trigonalPoints.G,// g
    trigonalPoints.F,// f
    trigonalPoints.D,// d
  ])
])
export const triclinic = new LatticeSystem(triclinicSides, [], [
  new Matrix([
    triclinicPoints.A,
    triclinicPoints.B,
    triclinicPoints.E,
    triclinicPoints.C,
    triclinicPoints.A
  ]),
  new Matrix([
    triclinicPoints.A,
    triclinicPoints.D,
    triclinicPoints.F,
    triclinicPoints.B,
    triclinicPoints.A
  ]),
  new Matrix([
    triclinicPoints.A,
    triclinicPoints.D,
    triclinicPoints.G,
    triclinicPoints.C
  ]),
  new Matrix([
    triclinicPoints.C,
    triclinicPoints.G,
    triclinicPoints.H,
    triclinicPoints.E
  ]),
  new Matrix([
    triclinicPoints.E,
    triclinicPoints.H,
    triclinicPoints.F,
    triclinicPoints.B
  ]),
  new Matrix([
    triclinicPoints.B,
    triclinicPoints.F,
    triclinicPoints.D,
    triclinicPoints.G,
    triclinicPoints.H,
    triclinicPoints.F
  ])
])
export const hexagonal = new LatticeSystem(hexagonalSides, [], [
  new Matrix([
    hexagonalPoints.A,
    hexagonalPoints.B,
    hexagonalPoints.C,
    hexagonalPoints.D,
    hexagonalPoints.E,
    hexagonalPoints.F,
    hexagonalPoints.A

  ]),
  new Matrix([
    hexagonalPoints.A,
    hexagonalPoints.G,
    hexagonalPoints.H,
    hexagonalPoints.B,
    hexagonalPoints.A
  ]),
  new Matrix([
    hexagonalPoints.A,
    hexagonalPoints.G,
    hexagonalPoints.L,
    hexagonalPoints.F
  ]),
  new Matrix([
    hexagonalPoints.F,
    hexagonalPoints.L,
    hexagonalPoints.K,
    hexagonalPoints.E
  ]),
  new Matrix([
    hexagonalPoints.E,
    hexagonalPoints.K,
    hexagonalPoints.J,
    hexagonalPoints.D
  ]),
  new Matrix([
    hexagonalPoints.D,
    hexagonalPoints.J,
    hexagonalPoints.I,
    hexagonalPoints.C,
  ]),
  new Matrix([
    hexagonalPoints.C,
    hexagonalPoints.I,
    hexagonalPoints.H,
    hexagonalPoints.B,
    hexagonalPoints.C,
    hexagonalPoints.I,
  ]),
  new Matrix([
    hexagonalPoints.H,
    hexagonalPoints.G,
    hexagonalPoints.L,
    hexagonalPoints.K,
    hexagonalPoints.J,
    hexagonalPoints.I,
    hexagonalPoints.H
  ])
])