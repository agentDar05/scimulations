import Canvas2D from "./Canvas2D.js";
import Vector from "./Vector.js";
import StaticMath from "./StaticMath.js";
import CanvasUtils from "./CanvasUtils.js";
import Rotate from "./Rotate.js";
import Matrix from "./Matrix.js";
import {
  cubic,
  cubicFigure,
  tetragonal,
  tetragonalFigure,
} from "./LatticeSystem.js";
const btn_rotate_axis111 = document.getElementById("btn-rotate-axis111")
const btn_rotate_axis1_11 = document.getElementById("btn-rotate-axis1-11")
const btn_rotate_axis_111 = document.getElementById("btn-rotate-axis-111")
const ANGULAR_SPEED = 0.005;
let isButtonDisabled = false
/** @type {Matrix} */
const CAMERA_ROTATION_MATRIX = Rotate.getRotationMatrix(0.4, 0.4, 0);
let rotatingAngle = 0;
let axis = null
/**
 * Is set when we click on the rotation, and once the rotation is finished - must be nullified.
 *
 * @type {Matrix | null}
 */
let rotationMatrix = null;
document.querySelectorAll(".btn-rotate-axis").forEach((button) => {
  button.addEventListener("mouseleave", () => {
    axis = null
  })
})
btn_rotate_axis111.addEventListener("mouseover", () => {
  axis = new Matrix([new Vector([-25, -25, -25]), new Vector([25, 25, 25])]);
  axis = Rotate.multiplyByArrayOfMatrices([axis], CAMERA_ROTATION_MATRIX)[0]
  drawFrame();
});
btn_rotate_axis1_11.addEventListener("mouseover", () => {
  axis = new Matrix([new Vector([25, -25, 25]), new Vector([-25, 25, -25])]);
  axis = Rotate.multiplyByArrayOfMatrices([axis], CAMERA_ROTATION_MATRIX)[0]
  drawFrame();
});
btn_rotate_axis_111.addEventListener("mouseover", () => {
  axis = new Matrix([new Vector([-25, 25, 25]), new Vector([25, -25, -25])]);
  axis = Rotate.multiplyByArrayOfMatrices([axis], CAMERA_ROTATION_MATRIX)[0]
  drawFrame();
});
btn_rotate_axis111.addEventListener("click", () => {  
  rotatingAngle = 0;
  rotationMatrix = computeRotationMatrix(new Vector([1, 1, 1]));
  drawFrame();
});
btn_rotate_axis1_11.addEventListener("click", () => {
  rotatingAngle = 0;
  rotationMatrix = computeRotationMatrix(new Vector([1, -1, 1]));
  drawFrame();
});
btn_rotate_axis_111.addEventListener("click", () => {
  rotatingAngle = 0;
  rotationMatrix = computeRotationMatrix(new Vector([-1, 1, 1]));
  drawFrame();
});
const ARRAY_OF_BUTTONS = [
  btn_rotate_axis111,
  btn_rotate_axis1_11,
  btn_rotate_axis_111
]
/**
 * 
 * @param {Array} arrayOfButtons 
 * @param {Boolean} status 
 */
function changeButtonStatus(arrayOfButtons, status) {
  arrayOfButtons.forEach(button => button.disabled = status);
}


changeButtonStatus(ARRAY_OF_BUTTONS, false)
const CANVAS_HEIGHT = 300;
const CANVAS_WIDTH = 300;
const tetragonalCanvas = new Canvas2D(
  document.querySelector(".rotate-tetragonal"), { width: CANVAS_WIDTH, height: CANVAS_HEIGHT }
);
const cubicCanvas = new Canvas2D(
  document.querySelector(".rotate-cubic"), { width: CANVAS_WIDTH, height: CANVAS_HEIGHT }
);


const tetragonalCenter = new Vector([
  tetragonal.sides.x / 2,
  tetragonal.sides.y / 2,
]);
let cube = StaticMath.moveFigure(cubicFigure, new Vector([ // center of cube is now at the center of coordinates
  cubic.sides.x / 2,
  cubic.sides.y / 2,
  cubic.sides.z / 2,
]));

function drawFrame() {
  cubicCanvas.clear();
  if (axis) {
    CanvasUtils.drawLine(cubicCanvas, axis.getCol(0), axis.getCol(1))
  }
  if (rotationMatrix) {
    isButtonDisabled = "disabled"
    changeButtonStatus(ARRAY_OF_BUTTONS, true)

    rotatingAngle += ANGULAR_SPEED;
    cube = Rotate.multiplyByArrayOfMatrices(cube, rotationMatrix);
  }
  const cubeView = Rotate.multiplyByArrayOfMatrices(cube, CAMERA_ROTATION_MATRIX);
  CanvasUtils.drawFilledFigure(cubicCanvas, cubeView, ["transparent", "transparent", "transparent", "transparent", "transparent", "red", "transparent",])
  CanvasUtils.drawFigure(cubicCanvas, cubeView);

  const rotatingTetragonal = Rotate.multiplyByArrayOfMatrices(tetragonalFigure, CAMERA_ROTATION_MATRIX);
  if (rotatingAngle >= Math.PI * (2 / 3)) {
    changeButtonStatus(ARRAY_OF_BUTTONS, false)
    rotationMatrix = null;
  }

  CanvasUtils.drawFigure(
    tetragonalCanvas,
    StaticMath.moveFigure(rotatingTetragonal, tetragonalCenter)
  );

  if (rotationMatrix) {
    requestAnimationFrame(drawFrame);
  }
  if (axis) {
    requestAnimationFrame(drawFrame);
  }
}
requestAnimationFrame(() => {
  drawFrame();
});

/**
 * @param {Vector} rotationAxis
 * @return {Matrix}
 */
function computeRotationMatrix(rotationAxis) {
  const rotationMatrix = Rotate.getRotationMatrix(ANGULAR_SPEED, 0, 0);
  const angleToXY = StaticMath.angleToPlaneXY(rotationAxis);
  const angleToXZ = StaticMath.angleToPlaneXZ(Rotate.rotateVec(rotationAxis, 0, angleToXY, 0));
  const alignWithXAxis = Rotate.getMatrix(0, angleToXY, angleToXZ);
  return alignWithXAxis.rotateInverse.matrixMultiply(rotationMatrix.matrixMultiply(alignWithXAxis.rotate));
}