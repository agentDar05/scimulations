import Matrix from "./Matrix.js";
import Vector from "./Vector.js";
import Canvas2D from "./Canvas2D.js";
import {cubicFigure1, orthorhombicFigure1, tetragonalFigure1} from "./LatticeSystem.js";


export class LatticeSystemDrawing {
    /** @type {LatticeSystem} */
    latticeSystem;
    /** @type {RotationAxisDrawing[]} */
    rotationAxes;
    /** @type {RotationAxisDrawing} */
    currentRotationAxis;
    /** @type {RotationAxisDrawing} */
    currentVisibleAxis;
    /**
     *
     * @param {LatticeSystem} latticeSystem
     * @param {RotationAxisDrawing[]} rotationAxes
     */
    constructor(latticeSystem, rotationAxes, canvas, colors) {
        this.latticeSystem = latticeSystem;
        this.rotationAxes = rotationAxes;
        this.canvas = canvas
        this.colors = colors

    }
}

class RotationAxisDrawing {
    /** @type {string} */
    label;
    /** @type {Matrix} */
    rotationAxis;

    constructor(label, rotationAxis) {
        this.label = label;
        this.rotationAxis = rotationAxis;
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
export const CUBIC_DRAWING = new LatticeSystemDrawing(
        cubicFigure1,
        [
            new RotationAxisDrawing("111", new Matrix([new Vector([-1, -1, -1]), new Vector([1, 1, 1])])),
            new RotationAxisDrawing("-111", new Matrix([new Vector([-1, 1, 1]), new Vector([1, -1, -1])])),
            new RotationAxisDrawing("1-11", new Matrix([new Vector([1, -1, 1]), new Vector([-1, 1, -1])])),
            new RotationAxisDrawing("11-1", new Matrix([new Vector([1, 1, -1]), new Vector([-1, -1, 1])])),
    ],
    cubicCanvas, 
    ["transparent", "transparent", "transparent", "transparent", "transparent", "red", "transparent",]


);
export const TETRAGONAL_DRAWING = new LatticeSystemDrawing(
    tetragonalFigure1,
    [
        new RotationAxisDrawing("010", new Matrix([new Vector([0, 1, 0]), new Vector([0, -1, 0])]))
    ],
    tetragonalCanvas,
    ["transparent", "transparent", "transparent", "transparent", "transparent", "red", "transparent",]

)
export const ORTHORHOMBIC_DRAWING = new LatticeSystemDrawing(
    orthorhombicFigure1,
    [],
    orthorhombicCanvas,
    ["transparent", "transparent", "transparent", "transparent", "transparent", "red", "transparent",]

)