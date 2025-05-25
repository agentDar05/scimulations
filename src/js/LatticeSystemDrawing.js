import Matrix from "./Matrix.js";
import Vector from "./Vector.js";
import Canvas2D from "./Canvas2D.js";
import { cubic, orthorhombic, tetragonal, monoclinic} from "./LatticeSystem.js";
import StaticMath from "./StaticMath.js";
export class LatticeSystemDrawing {
    /** @type {LatticeSystem} */
    latticeSystem;
    /** @type {RotationAxisDrawing[]} */
    rotationAxes;
    /** @type {RotationAxisDrawing} */
    currentRotationAxis;
    /** @type {RotationAxisDrawing} */
    currentVisibleAxis;
    /** {@type {Matrix[]}} */
    figure;
    /** {@type {number}} */
    rotatingAngle;

    /**
     *
     * @param {LatticeSystem} latticeSystem
     * @param {RotationAxisDrawing[]} rotationAxes
     * @param {Canvas2D} canvas
     * @param {string[]} colors
     */
    constructor(latticeSystem, rotationAxes, rotatingAngle, canvas, colors) {
        this.rotationAxes = rotationAxes;
        this.canvas = canvas
        this.colors = colors
        this.latticeSystem = latticeSystem;
        this.rotatingAngle = rotatingAngle;
        this.figure = StaticMath.moveFigure(latticeSystem.sides, new Vector([ // center of figure is now at the center of coordinates
            latticeSystem.sideLengths.x / 2,
            latticeSystem.sideLengths.y / 2,
            latticeSystem.sideLengths.z / 2,
        ]));
    }
}

class RotationAxisDrawing {
    /** @type {string} */
    label;
    /** @type {Matrix} */
    rotationAxis;
    /**@type {number} */
    scalar
    constructor(label, rotationAxis, scalar) {
        this.label = label;
        this.rotationAxis = rotationAxis;
        this.scalar = scalar
    }
}
const CANVAS_HEIGHT = 300;
const CANVAS_WIDTH = 300;
const tetragonalCanvas = new Canvas2D(
  document.querySelector(".rotate-tetragonal"), { width: CANVAS_WIDTH, height: CANVAS_HEIGHT }
);
const cubicCanvas = new Canvas2D(
  document.querySelector(".rotate-cubic"), { width: CANVAS_WIDTH, height: CANVAS_HEIGHT }
);
const orthorhombicCanvas = new Canvas2D(
  document.querySelector(".rotate-orthorhombic"), { width: CANVAS_WIDTH, height: CANVAS_HEIGHT }
);
const monoclinicCanvas = new Canvas2D(
    document.querySelector(".rotate-monoclinic"), { width: CANVAS_WIDTH, height: CANVAS_HEIGHT }
  );
export const CUBIC_DRAWING = new LatticeSystemDrawing(
        cubic,
        [
            new RotationAxisDrawing("111", new Matrix([new Vector([-1, -1, -1]), new Vector([1, 1, 1])]), 25),
            new RotationAxisDrawing("-111", new Matrix([new Vector([-1, 1, 1]), new Vector([1, -1, -1])]), 25),
            new RotationAxisDrawing("1-11", new Matrix([new Vector([1, -1, 1]), new Vector([-1, 1, -1])]), 25),
            new RotationAxisDrawing("11-1", new Matrix([new Vector([1, 1, -1]), new Vector([-1, -1, 1])]), 25),
    ],
    Math.PI * (2 / 3),
    cubicCanvas, 
    ["transparent", "transparent", "transparent", "transparent", "transparent", "red", "transparent",]


);
export const TETRAGONAL_DRAWING = new LatticeSystemDrawing(
    tetragonal,
    [
        new RotationAxisDrawing("010", new Matrix([new Vector([0, 1, 0]), new Vector([0, -1, 0])]), 35)
    ],
    Math.PI * (1 / 2),
    tetragonalCanvas,
    ["transparent", "transparent", "transparent", "transparent", "transparent", "red", "transparent",]

)
export const ORTHORHOMBIC_DRAWING = new LatticeSystemDrawing(
    orthorhombic,
    [
        new RotationAxisDrawing("100", new Matrix([new Vector([1, 0, 0]), new Vector([-1, 0, 0])]), 35),
        new RotationAxisDrawing("010", new Matrix([new Vector([0, 1, 0]), new Vector([0, -1, 0])]), 35),
        new RotationAxisDrawing("001", new Matrix([new Vector([0, 0, 1]), new Vector([0, 0, -1])]), 35),
    ],
    Math.PI,
    orthorhombicCanvas,
    ["transparent", "transparent", "transparent", "transparent", "transparent", "red", "transparent",]

)
export const MONOCLINIC_DRAWING = new LatticeSystemDrawing(
    monoclinic,
    [
        new RotationAxisDrawing("100", new Matrix([new Vector([0, 0, 1]), new Vector([0, 0, -1])]), 65)
    ],
    Math.PI,
    monoclinicCanvas,
    ["transparent", "transparent", "transparent", "transparent", "transparent", "red", "transparent",]

)