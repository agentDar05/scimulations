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
const btn_rotate_axis11_1 = document.getElementById("btn-rotate-axis11-1")
const ANGULAR_SPEED = 0.005;
let isButtonDisabled = false
/** @type {Matrix} */
const CAMERA_ROTATION_MATRIX = Rotate.getRotationMatrix(0.4, 0.4, 0);
let rotatingAngle = 0;
let currDisplayingAxis = null
let currRotatingVector = null
const CAMERA_VECTOR111 = leanRotationAxis(new Matrix([new Vector([-1, -1, -1]), new Vector([1, 1, 1])]), CAMERA_ROTATION_MATRIX)
const CAMERA_VECTOR_111 = leanRotationAxis(new Matrix([new Vector([-1, 1, 1]), new Vector([1, -1, -1])]), CAMERA_ROTATION_MATRIX)
const CAMERA_VECTOR1_11 = leanRotationAxis(new Matrix([new Vector([1, -1, 1]), new Vector([-1, 1, -1])]), CAMERA_ROTATION_MATRIX)
const CAMERA_VECTOR11_1 = leanRotationAxis(new Matrix([new Vector([1, 1, -1]), new Vector([-1, -1, 1])]), CAMERA_ROTATION_MATRIX)
/**
 * Is set when we click on the rotation, and once the rotation is finished - must be nullified.
 *
 * @type {Matrix | null}
 */
let rotationMatrix = null;
document.querySelectorAll(".btn-rotate-axis").forEach((button) => {
  button.addEventListener("mouseleave", () => {
    currDisplayingAxis = null
  })
})
btn_rotate_axis111.addEventListener("mouseover", () => {
  currDisplayingAxis = CAMERA_VECTOR111
  drawFrame();
});
btn_rotate_axis1_11.addEventListener("mouseover", () => {
  currDisplayingAxis = CAMERA_VECTOR1_11
  drawFrame();
});
btn_rotate_axis_111.addEventListener("mouseover", () => {
  currDisplayingAxis = CAMERA_VECTOR_111
  drawFrame();
});
btn_rotate_axis11_1.addEventListener("mouseover", () => {
  currDisplayingAxis = CAMERA_VECTOR11_1
  drawFrame();
});
btn_rotate_axis111.addEventListener("click", () => {  
  rotatingAngle = 0;
  rotationMatrix = computeRotationMatrix(new Vector([1, 1, 1]));
  currRotatingVector = CAMERA_VECTOR111
  drawFrame();
});
btn_rotate_axis1_11.addEventListener("click", () => {
  rotatingAngle = 0;
  rotationMatrix = computeRotationMatrix(new Vector([1, -1, 1]));
  currRotatingVector = CAMERA_VECTOR1_11
  drawFrame();
});
btn_rotate_axis_111.addEventListener("click", () => {
  rotatingAngle = 0;
  rotationMatrix = computeRotationMatrix(new Vector([-1, 1, 1]));
  currRotatingVector = CAMERA_VECTOR_111
  drawFrame();
});
btn_rotate_axis11_1.addEventListener("click", () => {
  rotatingAngle = 0;
  rotationMatrix = computeRotationMatrix(new Vector([1, 1, -1]));
  currRotatingVector = CAMERA_VECTOR11_1
  drawFrame();
});
const ARRAY_OF_BUTTONS = [
  btn_rotate_axis111,
  btn_rotate_axis1_11,
  btn_rotate_axis_111,
  btn_rotate_axis11_1
]
function drawFigures(canvas, figure, colors, cameraMatrix) {
  const view = Rotate.multiplyByArrayOfMatrices(figure, cameraMatrix);
  CanvasUtils.drawFilledFigure(canvas, view, colors)
  CanvasUtils.drawFigure(canvas, view);
}
/**
 * 
 * @param {Array} arrayOfButtons 
 * @param {Boolean} status 
 */
function changeButtonStatus(arrayOfButtons, status) {
  arrayOfButtons.forEach(button => button.disabled = status);
}
function leanRotationAxis(matrix, cameraRotation) {
    let axis = Rotate.multiplyByArrayOfMatrices([matrix.numberMultiply(25)], cameraRotation)[0];
    return axis;
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
  if (currDisplayingAxis) {
    CanvasUtils.drawLine(cubicCanvas, currDisplayingAxis.getCol(0), currDisplayingAxis.getCol(1))
  }
  if (currRotatingVector) {
    CanvasUtils.drawLine(cubicCanvas, currRotatingVector.getCol(0), currRotatingVector.getCol(1))
  }
  if (rotationMatrix) {
    isButtonDisabled = "disabled"
    changeButtonStatus(ARRAY_OF_BUTTONS, true)

    rotatingAngle += ANGULAR_SPEED;
    cube = Rotate.multiplyByArrayOfMatrices(cube, rotationMatrix);
  }
  // const cubeView = Rotate.multiplyByArrayOfMatrices(cube, CAMERA_ROTATION_MATRIX);
  // CanvasUtils.drawFilledFigure(cubicCanvas, cubeView, ["transparent", "transparent", "transparent", "transparent", "transparent", "red", "transparent",])
  // CanvasUtils.drawFigure(cubicCanvas, cubeView);
  const cubicColors = ["transparent", "transparent", "transparent", "transparent", "transparent", "red", "transparent",]
  drawFigures(cubicCanvas, cube, cubicColors, CAMERA_ROTATION_MATRIX)
  const rotatingTetragonal = Rotate.multiplyByArrayOfMatrices(tetragonalFigure, CAMERA_ROTATION_MATRIX);
  if (rotatingAngle >= Math.PI * (2 / 3)) {
    changeButtonStatus(ARRAY_OF_BUTTONS, false)
    rotationMatrix = null;
    currRotatingVector = null;
  }

  CanvasUtils.drawFigure(
    tetragonalCanvas,
    StaticMath.moveFigure(rotatingTetragonal, tetragonalCenter)
  );

  if (rotationMatrix) {
    requestAnimationFrame(drawFrame);
  }
  if (currDisplayingAxis) {
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