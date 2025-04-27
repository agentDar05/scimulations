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
  orthorhombic,
  orthorhombicFigure 
} from "./LatticeSystem.js";
const btn_rotate_axis111 = document.getElementById("cubic-btn-rotate-axis111")
const btn_rotate_axis1_11 = document.getElementById("cubic-btn-rotate-axis1-11")
const btn_rotate_axis_111 = document.getElementById("cubic-btn-rotate-axis-111")
const btn_rotate_axis11_1 = document.getElementById("cubic-btn-rotate-axis11-1")
const btn_rotate_axis010 = document.getElementById("tetragonal-btn-rotate-axis010")

const ANGULAR_SPEED = 0.005;
let cubicIsButtonDisabled = false
let tetragonalIsButtonDisabled = false

/** @type {Matrix} */
const CAMERA_ROTATION_MATRIX = Rotate.getRotationMatrix(0.4, 0.4, 0);
let rotatingAngle = 0;
let cubicCurrDisplayingAxis = null
let cubicCurrRotatingVector = null
let tetragonalCurrDisplayingAxis = null
let tetragonalCurrRotatingVector = null

const CAMERA_VECTOR111 = leanRotationAxis(new Matrix([new Vector([-1, -1, -1]), new Vector([1, 1, 1])]), CAMERA_ROTATION_MATRIX)
const CAMERA_VECTOR_111 = leanRotationAxis(new Matrix([new Vector([-1, 1, 1]), new Vector([1, -1, -1])]), CAMERA_ROTATION_MATRIX)
const CAMERA_VECTOR1_11 = leanRotationAxis(new Matrix([new Vector([1, -1, 1]), new Vector([-1, 1, -1])]), CAMERA_ROTATION_MATRIX)
const CAMERA_VECTOR11_1 = leanRotationAxis(new Matrix([new Vector([1, 1, -1]), new Vector([-1, -1, 1])]), CAMERA_ROTATION_MATRIX)
const CAMERA_VECTOR010 = leanRotationAxis(new Matrix([new Vector([0, 1, 0]), new Vector([0, -1, 0])]), CAMERA_ROTATION_MATRIX)

/**
 * Is set when we click on the rotation, and once the rotation is finished - must be nullified.
 *
 * @type {Matrix | null}
 */
let cubicRotationMatrix = null;
let tetragonalRotationMatrix = null;
document.querySelectorAll(".cubic-btn-rotate-axis").forEach((button) => {
  button.addEventListener("mouseleave", () => {
    cubicCurrDisplayingAxis = null
  })
})
btn_rotate_axis010.addEventListener("mouseleave", () => {
  tetragonalCurrDisplayingAxis = null
});
btn_rotate_axis010.addEventListener("mouseover", () => {
  tetragonalCurrDisplayingAxis = CAMERA_VECTOR010
  drawFrame();
});
btn_rotate_axis111.addEventListener("mouseover", () => {
  cubicCurrDisplayingAxis = CAMERA_VECTOR111
  drawFrame();
});
btn_rotate_axis1_11.addEventListener("mouseover", () => {
  cubicCurrDisplayingAxis = CAMERA_VECTOR1_11
  drawFrame();
});
btn_rotate_axis_111.addEventListener("mouseover", () => {
  cubicCurrDisplayingAxis = CAMERA_VECTOR_111
  drawFrame();
});
btn_rotate_axis11_1.addEventListener("mouseover", () => {
  cubicCurrDisplayingAxis = CAMERA_VECTOR11_1
  drawFrame();
});
btn_rotate_axis010.addEventListener("click", () => {
  rotatingAngle = 0;  
  tetragonalRotationMatrix = StaticMath.getYMatrix(StaticMath.degreesToRadians(90))  
  tetragonalCurrRotatingVector = CAMERA_VECTOR010
  drawFrame();
});
btn_rotate_axis111.addEventListener("click", () => {  
  rotatingAngle = 0;
  cubicRotationMatrix = computeRotationMatrix(new Vector([1, 1, 1]));
  cubicCurrRotatingVector = CAMERA_VECTOR111
  drawFrame();
});
btn_rotate_axis1_11.addEventListener("click", () => {
  rotatingAngle = 0;
  cubicRotationMatrix = computeRotationMatrix(new Vector([1, -1, 1]));
  cubicCurrRotatingVector = CAMERA_VECTOR1_11
  drawFrame();
});
btn_rotate_axis_111.addEventListener("click", () => {
  rotatingAngle = 0;
  cubicRotationMatrix = computeRotationMatrix(new Vector([-1, 1, 1]));
  cubicCurrRotatingVector = CAMERA_VECTOR_111
  drawFrame();
});
btn_rotate_axis11_1.addEventListener("click", () => {
  rotatingAngle = 0;
  cubicRotationMatrix = computeRotationMatrix(new Vector([1, 1, -1]));
  cubicCurrRotatingVector = CAMERA_VECTOR11_1
  drawFrame();
});
const CUBIC_ARRAY_OF_BUTTONS = [
  btn_rotate_axis111,
  btn_rotate_axis1_11,
  btn_rotate_axis_111,
  btn_rotate_axis11_1
]
const TETRAGONAL_ARRAY_OF_BUTTONS = [
  btn_rotate_axis010
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

changeButtonStatus(CUBIC_ARRAY_OF_BUTTONS, false)
changeButtonStatus(TETRAGONAL_ARRAY_OF_BUTTONS, false)

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

let cube = StaticMath.moveFigure(cubicFigure, new Vector([ // center of cube is now at the center of coordinates
  cubic.sides.x / 2,
  cubic.sides.y / 2,
  cubic.sides.z / 2,
]));
let rotatingTetragonal = StaticMath.moveFigure(tetragonalFigure, new Vector([
  tetragonal.sides.x / 2,
  tetragonal.sides.y / 2,
  tetragonal.sides.z / 2,
]));
let rotatingOrthorhombic = StaticMath.moveFigure(orthorhombicFigure, new Vector([
  orthorhombic.sides.x / 2,
  orthorhombic.sides.y / 2,
  orthorhombic.sides.z / 2,
]));
function drawFrame() {
  cubicCanvas.clear();
  tetragonalCanvas.clear();
  orthorhombicCanvas.clear();

  if (cubicCurrDisplayingAxis) {
    CanvasUtils.drawLine(cubicCanvas, cubicCurrDisplayingAxis.getCol(0), cubicCurrDisplayingAxis.getCol(1))
  }
  if (cubicCurrRotatingVector) {
    CanvasUtils.drawLine(cubicCanvas, cubicCurrRotatingVector.getCol(0), cubicCurrRotatingVector.getCol(1))
  }
  if (tetragonalCurrDisplayingAxis) {
    CanvasUtils.drawLine(tetragonalCanvas, tetragonalCurrDisplayingAxis.getCol(0), tetragonalCurrDisplayingAxis.getCol(1))
  }
  if (tetragonalCurrRotatingVector) {
    CanvasUtils.drawLine(tetragonalCanvas, tetragonalCurrRotatingVector.getCol(0), tetragonalCurrRotatingVector.getCol(1))
  }
  if (cubicRotationMatrix) {
    cubicIsButtonDisabled = "disabled"
    changeButtonStatus(CUBIC_ARRAY_OF_BUTTONS, true)

    rotatingAngle += ANGULAR_SPEED;
    cube = Rotate.multiplyByArrayOfMatrices(cube, cubicRotationMatrix);
  }
  if (tetragonalRotationMatrix) {
    tetragonalIsButtonDisabled = "disabled"
    changeButtonStatus(TETRAGONAL_ARRAY_OF_BUTTONS, true)

    rotatingAngle += ANGULAR_SPEED;
    rotatingTetragonal = Rotate.multiplyByArrayOfMatrices(rotatingTetragonal, tetragonalRotationMatrix);
    
  }
  // const cubeView = Rotate.multiplyByArrayOfMatrices(cube, CAMERA_ROTATION_MATRIX);
  // CanvasUtils.drawFilledFigure(cubicCanvas, cubeView, ["transparent", "transparent", "transparent", "transparent", "transparent", "red", "transparent",])
  // CanvasUtils.drawFigure(cubicCanvas, cubeView);
  const cubicColors = ["transparent", "transparent", "transparent", "transparent", "transparent", "red", "transparent",]
  const tetragonalColors = ["transparent", "transparent", "transparent", "transparent", "transparent", "red", "transparent",]
  const orthorhombicColors = ["transparent", "transparent", "transparent", "transparent", "transparent", "red", "transparent",]


  drawFigures(cubicCanvas, cube, cubicColors, CAMERA_ROTATION_MATRIX)
  drawFigures(tetragonalCanvas, rotatingTetragonal, tetragonalColors, CAMERA_ROTATION_MATRIX)
  drawFigures(orthorhombicCanvas, rotatingOrthorhombic, orthorhombicColors, CAMERA_ROTATION_MATRIX)
  if (rotatingAngle >= Math.PI * (2 / 3)) {
    changeButtonStatus(CUBIC_ARRAY_OF_BUTTONS, false)
    changeButtonStatus(TETRAGONAL_ARRAY_OF_BUTTONS, false)
    cubicRotationMatrix = null;
    cubicCurrRotatingVector = null;
    tetragonalRotationMatrix = null;
    tetragonalCurrRotatingVector = null
  }

  if (cubicRotationMatrix) {
    requestAnimationFrame(drawFrame);
  }
  if (cubicCurrDisplayingAxis) {
    requestAnimationFrame(drawFrame);
  }
  if (tetragonalRotationMatrix) {
    requestAnimationFrame(drawFrame);
  }
  if (tetragonalCurrDisplayingAxis) {
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