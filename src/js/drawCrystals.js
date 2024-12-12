import Matrix from "./Matrix.js";
import Canvas2D from "./Canvas2D.js";
import Vector from "./Vector.js";
import StaticMath from "./StaticMath.js";
import CanvasUtils from "./CanvasUtils.js";
import Rotate from "./Rotate.js";
import { tetragonalFigure, cubicFigure } from "./LatticeSystem.js";
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
const cubic = { sides: { x:  50, y: 50, z: 50 } };
const tetragonal = { sides: { x: 50, y: 70, z: 50 } };
export{cubic, tetragonal}
const cubicCenter = new Vector([cubic.sides.x / 2, cubic.sides.y / 2]);
const tetragonalCenter = new Vector([
  tetragonal.sides.x / 2,
  tetragonal.sides.y / 2,
]);

// tetragonal.sides.x
// tetragonal.sides.y
// tetragonal.sides.z

let angle = 0.4;
function drawFrame() {
  cubicCanvas.clear();
  const rotatingCubic = Rotate.rotationMatrixMultiplyByArrayOfMatrices(
    cubicFigure,
    Rotate.getRotationMatrix(angle, angle, 0)
  );
  const rotatingTetragonal = Rotate.rotationMatrixMultiplyByArrayOfMatrices(
    tetragonalFigure,
    Rotate.getRotationMatrix(angle, angle, 0)
  );
  CanvasUtils.drawFigure(cubicCanvas, StaticMath.moveFigure(rotatingCubic, cubicCenter));
  CanvasUtils.drawFigure(tetragonalCanvas, StaticMath.moveFigure(rotatingTetragonal, tetragonalCenter));

  //   angle = angle + 0.01;
  requestAnimationFrame(drawFrame);
}
requestAnimationFrame(() => {
  drawFrame();
});
