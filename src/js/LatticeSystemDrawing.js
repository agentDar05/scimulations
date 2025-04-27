import Matrix from "./Matrix.js";
import Vector from "./Vector.js";
import {cubicFigure1} from "./LatticeSystem.js";


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
    constructor(latticeSystem, rotationAxes) {
        this.latticeSystem = latticeSystem;
        this.rotationAxes = rotationAxes;
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

export const CUBIC_DRAWING = new LatticeSystemDrawing(
        cubicFigure1,
        [
            new RotationAxisDrawing("111", new Matrix([new Vector([-1, -1, -1]), new Vector([1, 1, 1])])),
            new RotationAxisDrawing("-111", new Matrix([new Vector([-1, 1, 1]), new Vector([1, -1, -1])])),
            new RotationAxisDrawing("1-11", new Matrix([new Vector([1, -1, 1]), new Vector([-1, 1, -1])])),
            new RotationAxisDrawing("11-1", new Matrix([new Vector([1, 1, -1]), new Vector([-1, -1, 1])])),
        ]

);