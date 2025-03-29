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
let rotationAxis = null;
let rotatingAngle = 0;
document.querySelector(".btn-rotate-axis111").addEventListener("click", () => {
  rotationAxis = new Vector([1, 1, 1]);
  rotatingAngle = 0
  drawFrame();
});
document.querySelector(".btn-rotate-axis1-11").addEventListener("click", () => {
  rotationAxis = new Vector([1, -1, 1]);
  rotatingAngle = 0;
  drawFrame();
});
document.querySelector(".btn-rotate-axis-111").addEventListener("click", () => {
  rotationAxis = new Vector([-1, 1, 1]);
  rotatingAngle = 0;
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
let cubeToDraw = StaticMath.moveFigure(cubicFigure, cubicCenter)
function drawFrame() {
  cubicCanvas.clear();
  // let cubeToDraw = cubicFigure;
  if (rotationAxis) {
    rotatingAngle += ANGULAR_SPEED;
    const rotationMatrix = Rotate.getRotationMatrix(ANGULAR_SPEED, 0, 0)
    const angleToXY = StaticMath.angleToPlaneXY(rotationAxis)
    const angleToXZ = StaticMath.angleToPlaneXZ(Rotate.rotateVec(rotationAxis, 0, angleToXY, 0))
    const matrix = Rotate.getMatrix(0, angleToXY, angleToXZ);
    cubeToDraw = Rotate.multiplyByArrayOfMatrices(
      Rotate.multiplyByArrayOfMatrices(
        Rotate.multiplyByArrayOfMatrices(cubeToDraw, matrix.rotate),
        rotationMatrix
      ),
      matrix.rotateInverse
    );
  }
  cubeToDraw = Rotate.multiplyByArrayOfMatrices(cubeToDraw, Rotate.getRotationMatrix(angle, angle, 0));

  CanvasUtils.drawFilledFigure(cubicCanvas, cubeToDraw, ["white", "white", "white", "white", "white", "red", "white",])
  CanvasUtils.drawFigure(cubicCanvas, cubeToDraw, ["red", "red", "red", "red"]);
  const rotatingTetragonal = Rotate.multiplyByArrayOfMatrices(
    tetragonalFigure,
    Rotate.getRotationMatrix(angle, angle, 0)
  );
  if (rotatingAngle >= Math.PI * (2 / 3)) {
    rotationAxis = null;
  }

  CanvasUtils.drawFigure(
    tetragonalCanvas,
    StaticMath.moveFigure(rotatingTetragonal, tetragonalCenter)
  );
  if (rotationAxis) {
    requestAnimationFrame(drawFrame);
  }
}
requestAnimationFrame(() => {
  drawFrame();
});
{
  /*
  const rotationAxis = new Vector([1, 1, 1])
  */
}