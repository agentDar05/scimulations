import Canvas2D from "./Canvas2D.js";
import Vector from "./Vector.js";
import StaticMath from "./StaticMath.js";
import CanvasUtils from "./CanvasUtils.js";
import Rotate from "./Rotate.js";
import {
  cubic,
  cubicFigure,
  tetragonal,
  tetragonalFigure,
} from "./LatticeSystem.js";

const ORIGINAL_ANGLE = 0.4
const ANGULAR_SPEED = 0.01;
let angle = ORIGINAL_ANGLE;
let rotatingAngle = 0;

/**
 * Is set when we click on the rotation, and once the rotation is finished - must be nullified.
 *
 * @type {Matrix | null}
 */
let rotationMatrix = null;

document.querySelector(".btn-rotate-axis111").addEventListener("click", () => {
  rotatingAngle = 0;
  rotationMatrix = computeRotationMatrix(new Vector([1, 1, 1]));
  drawFrame();
});
document.querySelector(".btn-rotate-axis1-11").addEventListener("click", () => {
  rotatingAngle = 0;
  rotationMatrix = computeRotationMatrix(new Vector([1, -1, 1]));
  drawFrame();
});
document.querySelector(".btn-rotate-axis-111").addEventListener("click", () => {
  rotatingAngle = 0;
  rotationMatrix = computeRotationMatrix(new Vector([-1, 1, 1]));
  drawFrame();
});
const canvasHeight = 300;
const canvasWidth = 300;
const tetragonalCanvas = new Canvas2D(
  document.querySelector(".rotate-tetragonal"),
  {
    width: canvasWidth,
    height: canvasHeight,
  }
);
const cubicCanvas = new Canvas2D(document.querySelector(".rotate-cubic"), {
  width: canvasWidth,
  height: canvasHeight,
});

const cubicCenter = new Vector([
  cubic.sides.x / 2,
  cubic.sides.y / 2,
  cubic.sides.z / 2,
]);

const tetragonalCenter = new Vector([
  tetragonal.sides.x / 2,
  tetragonal.sides.y / 2,
]);
let cube = StaticMath.moveFigure(cubicFigure, cubicCenter);
function drawFrame() {
  cubicCanvas.clear();
  // let cube = cubicFigure;
  if (rotationMatrix) {
    rotatingAngle += ANGULAR_SPEED;
    cube = Rotate.multiplyByArrayOfMatrices(cube, rotationMatrix);
  }
  const cubeView = Rotate.multiplyByArrayOfMatrices(cube, Rotate.getRotationMatrix(angle, angle, 0));

  CanvasUtils.drawFilledFigure(cubicCanvas, cubeView, ["transparent", "transparent", "transparent", "transparent", "transparent", "red", "transparent",])
  CanvasUtils.drawFigure(cubicCanvas, cubeView);
  const rotatingTetragonal = Rotate.multiplyByArrayOfMatrices(tetragonalFigure, Rotate.getRotationMatrix(angle, angle, 0));
  if (rotatingAngle >= Math.PI * (2 / 3)) {
    rotationMatrix = null;
  }

  CanvasUtils.drawFigure(
    tetragonalCanvas,
    StaticMath.moveFigure(rotatingTetragonal, tetragonalCenter)
  );
  if (rotationMatrix) {
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