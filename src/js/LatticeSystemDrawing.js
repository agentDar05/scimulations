import Matrix from "./Matrix.js";
import Vector from "./Vector.js";
import Canvas2D from "./Canvas2D.js";
import { cubic, orthorhombic, tetragonal, monoclinic, rhombohedral, triclinic, hexagonal} from "./LatticeSystem.js";
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
        // this.figure = StaticMath.centerFigure(latticeSystem.sides)
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
const rhombohedralCanvas = new Canvas2D(
    document.querySelector(".rotate-rhombohedral"), { width: CANVAS_WIDTH, height: CANVAS_HEIGHT }
);
const triclinicCanvas = new Canvas2D(
    document.querySelector(".rotate-triclinic"), { width: CANVAS_WIDTH, height: CANVAS_HEIGHT }
);
const hexagonalCanvas = new Canvas2D(
    document.querySelector(".rotate-hexagonal"), { width: CANVAS_WIDTH, height: CANVAS_HEIGHT }
);
// const color = "#66adff78";   // light blue with some transparency
// const color = "#D3D3D3CC" // dark gray with some transparency
// const color = "#ffff"
// const color = "#CCCCCC55"; // light gray with some transparency
// const color = "#66CCFF44" // light blue with some transparency
const color = "#AA88FF44" // light purple with some transparency
// const color = "#88FFCC44" // light green with some transparency


export const CUBIC_DRAWING = new LatticeSystemDrawing(
    cubic,
    cubic.rotationAxes,
    Math.PI * (2 / 3),
    cubicCanvas,
    [color, color, color, color, color, color]


);
export const TETRAGONAL_DRAWING = new LatticeSystemDrawing(
    tetragonal,
    tetragonal.rotationAxes,
    Math.PI * (1 / 2),
    tetragonalCanvas,
    [color, color, color, color, color, color, color,]

)
export const ORTHORHOMBIC_DRAWING = new LatticeSystemDrawing(
    orthorhombic,
    orthorhombic.rotationAxes,
    Math.PI,
    orthorhombicCanvas,
    [color, color, color, color, color, color, color,]

)
export const MONOCLINIC_DRAWING = new LatticeSystemDrawing(
    monoclinic,
    monoclinic.rotationAxes,
    Math.PI,
    monoclinicCanvas,
    [color, color, color, color, color, color, color,]

)
export const RHOMBOHEDRAL_DRAWING = new LatticeSystemDrawing(
    rhombohedral,
    rhombohedral.rotationAxes,
    Math.PI * (2 / 3),
    rhombohedralCanvas,
    [color, color, color, color, color, color, color,]

)
export const TRICLINIC_DRAWING = new LatticeSystemDrawing(
    triclinic, 
    triclinic.rotationAxes,
    Math.PI * 2,
    triclinicCanvas,
    [color, color, color, color, color, color, color,]
)
export const HEXAGONAL_DRAWING = new LatticeSystemDrawing(
    hexagonal,
    hexagonal.rotationAxes,
    Math.PI/3,
    hexagonalCanvas,
    [color, color, color, color, color, color, color, color]
)