import Matrix from "./Matrix.js";
import Vector from "./Vector.js";
import Canvas2D from "./Canvas2D.js";
import {cubic, orthorhombic, tetragonal} from "./LatticeSystem.js";
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
    /** {@type Matrix[]} */
    figure;
    /**
     *
     * @param {LatticeSystem} latticeSystem
     * @param {RotationAxisDrawing[]} rotationAxes
     */
    constructor(latticeSystem, rotationAxes, canvas, colors) {
        this.rotationAxes = rotationAxes;
        this.canvas = canvas
        this.colors = colors
        this.latticeSystem = latticeSystem;
        this.figure = StaticMath.moveFigure(latticeSystem.sides, new Vector([ // center of cube is now at the center of coordinates
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
        cubic,
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
    tetragonal,
    [
        new RotationAxisDrawing("010", new Matrix([new Vector([0, 1, 0]), new Vector([0, -1, 0])]))
    ],
    tetragonalCanvas,
    ["transparent", "transparent", "transparent", "transparent", "transparent", "red", "transparent",]

)
export const ORTHORHOMBIC_DRAWING = new LatticeSystemDrawing(
    orthorhombic,
    [],
    orthorhombicCanvas,
    ["transparent", "transparent", "transparent", "transparent", "transparent", "red", "transparent",]

)