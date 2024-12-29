import Matrix from "./Matrix.js";
import Canvas2D from "./Canvas2D.js";
import Vector from "./Vector.js";
import StaticMath from "./StaticMath.js";
import CanvasUtils from "./CanvasUtils.js";
import Rotate from "./Rotate.js";
import Lean from "./Lean.js";
import {
  tetragonalFigure,
  cubicFigure,
  cubic,
  tetragonal,
} from "./LatticeSystem.js";
let angle = 0.4;
let rotationAxis = null;
let rotatingCubic = Rotate.rotationMatrixMultiplyByArrayOfMatrices(
  cubicFigure,
  Rotate.getRotationMatrix(angle, angle, 0)
);
const rotationaxis1 = document.querySelector(".btn-rotate-axis");
rotationaxis1.addEventListener("click", () => {
  // const axis = new Vector([50, 50, 50])
  // const angles = StaticMath.calcAngles(axis)
  // const lean = Lean.leanFigure(angles.xy, angles.yz, angles.xz)
  // const rotateCubic = Rotate.rotationMatrixMultiplyByArrayOfMatrices(
  //   cubic,
  //   lean.lean);
  // CanvasUtils.drawFigure(
  //   cubicCanvas,
  //   StaticMath.moveFigure(rotateCubic, cubicCenter)
  // );
  rotationAxis = new Vector([50, 50, 50]);
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

const cubicCenter = new Vector([cubic.sides.x / 2, cubic.sides.y / 2]);

const tetragonalCenter = new Vector([
  tetragonal.sides.x / 2,
  tetragonal.sides.y / 2,
]);

// tetragonal.sides.x
// tetragonal.sides.y
// tetragonal.sides.z

function drawFrame() {
  cubicCanvas.clear();
  let rotatingCube = Rotate.rotationMatrixMultiplyByArrayOfMatrices(
    cubicFigure,
    Rotate.getRotationMatrix(angle, angle, 0)
  );
  if (rotationAxis) {

    const angles = StaticMath.calcAngles(rotationAxis);
    const lean = Lean.leanFigure(angles.xy, angles.yz, angles.xz);
    const rotateCubic = Rotate.rotationMatrixMultiplyByArrayOfMatrices(
      cubicFigure,
      lean.lean
    );
    rotatingCube = StaticMath.moveFigure(rotateCubic, cubicCenter);
  }
  CanvasUtils.drawFigure(
    cubicCanvas,
    StaticMath.moveFigure(rotatingCube, cubicCenter)
  );

  const rotatingTetragonal = Rotate.rotationMatrixMultiplyByArrayOfMatrices(
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
