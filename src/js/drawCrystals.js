import Canvas2D from "./Canvas2D.js";
import Vector from "./Vector.js";
import StaticMath from "./StaticMath.js";
import CanvasUtils from "./CanvasUtils.js";
import Rotate from "./Rotate.js";
import Lean from "./Lean.js";
import {cubic, cubicFigure, tetragonal, tetragonalFigure,} from "./LatticeSystem.js";

let angle = 0.4;
let rotationAxis = null;

document.querySelector(".btn-rotate-axis").addEventListener("click", () => {
  rotationAxis = new Vector([1, 1, 1]);
});

const canvasHeight = 300;
const canvasWidth = 300;
const tetragonalCanvas = new Canvas2D(document.querySelector(".rotate-tetragonal"), {
  width: canvasWidth,
  height: canvasHeight,
});
const cubicCanvas = new Canvas2D(document.querySelector(".rotate-cubic"), {
  width: canvasWidth,
  height: canvasHeight,
});

const cubicCenter = new Vector([cubic.sides.x / 2, cubic.sides.y / 2, cubic.sides.z/2]);

const tetragonalCenter = new Vector([
  tetragonal.sides.x / 2,
  tetragonal.sides.y / 2,
]);

// tetragonal.sides.x
// tetragonal.sides.y
// tetragonal.sides.z

let rotatingAngle = 0;
function drawFrame() {
  cubicCanvas.clear();
  let cubeToDraw = cubicFigure;
  if (rotationAxis) {
    const angles = StaticMath.calcAngles(rotationAxis);
    const leanAroundX = Lean.leanFigure(-angles.xy,0,0);
    const leanAroundZ = Lean.leanFigure(0,0,-angles.xz);
    const lean = leanAroundZ.lean.matrixMultiply(leanAroundX.lean)
    const leanInverse = leanAroundX.inverse.matrixMultiply(leanAroundZ.inverse);

    const rotationMatrix = Rotate.getRotationMatrix((rotatingAngle += .05), 0, 0);
    cubeToDraw = Rotate.multiplyByArrayOfMatrices(
            Rotate.multiplyByArrayOfMatrices(
                    Rotate.multiplyByArrayOfMatrices(cubicFigure, lean),
                    rotationMatrix
            ),
            leanInverse
    );
  }
  cubeToDraw = Rotate.multiplyByArrayOfMatrices(cubeToDraw, Rotate.getRotationMatrix(angle, angle, 0));
  CanvasUtils.drawFigure(cubicCanvas, StaticMath.moveFigure(cubeToDraw, cubicCenter));

  const rotatingTetragonal = Rotate.multiplyByArrayOfMatrices(
    tetragonalFigure,
    Rotate.getRotationMatrix(angle, angle, 0)
  );
  // CanvasUtils.drawLine(
  //   cubicCanvas,
  //   Rotate.rotateVec(new Vector([-25, -25, 0]), angle, angle, 0),
  //   Rotate.rotateVec(new Vector([25, 25, 50]), angle, angle, 0)
  // );
  // CanvasUtils.drawFigure(
  //   cubicCanvas,
  //   StaticMath.moveFigure(rotatingCubic, cubicCenter)
  // );
  CanvasUtils.drawFigure(
    tetragonalCanvas,
    StaticMath.moveFigure(rotatingTetragonal, tetragonalCenter)
  );

  //   angle = angle + 0.01;
  requestAnimationFrame(drawFrame);
}
requestAnimationFrame(() => {
  drawFrame();
});

/*


let rotationAxis = null;

const cubic = [...]
function drawFrame() {
    let rotatingCube = cube;
    if(rotationAxis) {
        rotatingCube = //mathematics
    }
    draw(rotatingCube);
    requestAnimationFrame(...);
}

*/
