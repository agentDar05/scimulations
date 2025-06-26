import Vector from "./Vector.js";
import StaticMath from "./StaticMath.js";
import CanvasUtils from "./CanvasUtils.js";
import Rotate from "./Rotate.js";
import { CUBIC_DRAWING, MONOCLINIC_DRAWING, ORTHORHOMBIC_DRAWING, TETRAGONAL_DRAWING, RHOMBOHEDRAL_DRAWING, TRICLINIC_DRAWING, HEXAGONAL_DRAWING } from "./LatticeSystemDrawing.js";
const ANGULAR_SPEED = 0.005;
// const CAMERA_ROTATION_MATRIX = Rotate.getRotationMatrix(0, 0, 0);
const CAMERA_ROTATION_MATRIX = Rotate.getRotationMatrix(0.4, 0.4, 0);

const ARRAY_OF_BUTTONS = [
  document.getElementById("cubic-btn-rotate-axis111"),
  document.getElementById("cubic-btn-rotate-axis1-11"),
  document.getElementById("cubic-btn-rotate-axis-111"),
  document.getElementById("cubic-btn-rotate-axis11-1"),
  document.getElementById("tetragonal-btn-rotate-axis010"),
  document.getElementById("orthorhombic-btn-rotate-axis100"),
  document.getElementById("orthorhombic-btn-rotate-axis010"),
  document.getElementById("orthorhombic-btn-rotate-axis001"),
  document.getElementById("monoclinic-btn-rotate-axis001"),
  document.getElementById("rhombohedral-btn-rotate-axis001"),
  document.getElementById("triclinic-btn-rotate-axis001"),
  document.getElementById("hexagonal-btn-rotate-axis001")
]
const figures = {
  cubic: CUBIC_DRAWING,
  tetragonal: TETRAGONAL_DRAWING,
  orthorhombic: ORTHORHOMBIC_DRAWING,
  monoclinic: MONOCLINIC_DRAWING,
  rhombohedral: RHOMBOHEDRAL_DRAWING,
  triclinic: TRICLINIC_DRAWING,
  hexagonal: HEXAGONAL_DRAWING
}
/** @type {LatticeSystemDrawing} */
let currentFigure = null;
/** @type {Matrix} */
let rotationMatrix = null;
/** @type {number} */
let rotatingAngle = 0;
/**
 * 
 * @param {Array} arrayOfButtons 
 * @param {Boolean} status 
 */
function changeButtonStatus(arrayOfButtons, status) {
  arrayOfButtons.forEach(button => button.disabled = status);
}

/**
 *
 * @param {Matrix} matrix
 * @param {Matrix} cameraRotation
 * @return {Matrix}
 */
function leanRotationAxis(matrix, cameraRotation, scalar) {  
  return Rotate.multiplyByArrayOfMatrices([matrix.numberMultiply(scalar)], cameraRotation)[0];
}

/**
 *
 * @param {Canvas2D} canvas
 * @param {Matrix[]} figure
 * @param {string[]} colors
 * @param {Matrix} cameraMatrix
 */
function drawFigures(canvas, figure, colors, cameraMatrix) {
  const view = Rotate.multiplyByArrayOfMatrices(figure, cameraMatrix);
  CanvasUtils.drawFilledFigure(canvas, view, colors)
  CanvasUtils.drawFigure(canvas, view);
}
drawFigures(CUBIC_DRAWING.canvas, CUBIC_DRAWING.figure, CUBIC_DRAWING.colors, CAMERA_ROTATION_MATRIX);
drawFigures(TETRAGONAL_DRAWING.canvas, TETRAGONAL_DRAWING.figure, TETRAGONAL_DRAWING.colors, CAMERA_ROTATION_MATRIX);
drawFigures(ORTHORHOMBIC_DRAWING.canvas, ORTHORHOMBIC_DRAWING.figure, ORTHORHOMBIC_DRAWING.colors, CAMERA_ROTATION_MATRIX);
drawFigures(MONOCLINIC_DRAWING.canvas, MONOCLINIC_DRAWING.figure, MONOCLINIC_DRAWING.colors, CAMERA_ROTATION_MATRIX);
drawFigures(RHOMBOHEDRAL_DRAWING.canvas, RHOMBOHEDRAL_DRAWING.figure, RHOMBOHEDRAL_DRAWING.colors, CAMERA_ROTATION_MATRIX);
drawFigures(TRICLINIC_DRAWING.canvas, TRICLINIC_DRAWING.figure, TRICLINIC_DRAWING.colors, CAMERA_ROTATION_MATRIX);
drawFigures(HEXAGONAL_DRAWING.canvas, HEXAGONAL_DRAWING.figure, HEXAGONAL_DRAWING.colors, CAMERA_ROTATION_MATRIX);

document.querySelectorAll('[data-axis]').forEach((button) => {
  button.addEventListener("click", (e) => {
    const axisIndex = Number.parseInt(e.currentTarget.getAttribute("data-axis"));
    let figureId = e.currentTarget.dataset.figure
    currentFigure = figures[figureId]
    currentFigure.currentRotationAxis = currentFigure.rotationAxes[axisIndex]
    rotationMatrix = computeRotationMatrix(currentFigure.currentRotationAxis.rotationAxis.getCol(1))
    currentFigure.currentVisibleAxis = currentFigure.rotationAxes[axisIndex];
    drawFrame()
  });
  button.addEventListener("mouseover", (e) => {
    let figureId = e.currentTarget.dataset.figure
    currentFigure = figures[figureId]
    const axisIndex = Number.parseInt(e.target.getAttribute("data-axis"));
    currentFigure.currentVisibleAxis = currentFigure.rotationAxes[axisIndex];
    drawFrame();
  })
  button.addEventListener("mouseleave", (e) => {
    let figureId = e.currentTarget.dataset.figure
    currentFigure = figures[figureId]
    currentFigure.currentVisibleAxis = null;
    drawFrame()
  });
});
changeButtonStatus(ARRAY_OF_BUTTONS, false)
function drawFrame() {
  if (currentFigure) {
    /** @type {Matrix[]} */
    currentFigure.canvas.clear()
    if (currentFigure.currentVisibleAxis) {
      const rotationAxis = leanRotationAxis(currentFigure.currentVisibleAxis.rotationAxis, CAMERA_ROTATION_MATRIX, currentFigure.currentVisibleAxis.scalar);
      CanvasUtils.drawLine(currentFigure.canvas, rotationAxis.getCol(0), rotationAxis.getCol(1));

    }
    if (rotationMatrix) {
      changeButtonStatus(ARRAY_OF_BUTTONS, true)
      rotatingAngle += ANGULAR_SPEED;
      currentFigure.figure = Rotate.multiplyByArrayOfMatrices(currentFigure.figure, rotationMatrix);
    }
    if (rotatingAngle >= currentFigure.rotatingAngle) {
      changeButtonStatus(ARRAY_OF_BUTTONS, false)
      rotationMatrix = null
      rotatingAngle = 0
    }
    drawFigures(currentFigure.canvas, currentFigure.figure, currentFigure.colors, CAMERA_ROTATION_MATRIX);
  }
  requestAnimationFrame(() => drawFrame());
}
requestAnimationFrame(() => drawFrame());

function computeRotationMatrix(rotationAxis) {
  const rotationMatrix = Rotate.getRotationMatrix(ANGULAR_SPEED, 0, 0);
  const angleToXY = StaticMath.angleToPlaneXY(rotationAxis);
  const angleToXZ = StaticMath.angleToPlaneXZ(Rotate.rotateVec(rotationAxis, 0, angleToXY, 0));
  const alignWithXAxis = Rotate.getMatrix(0, angleToXY, angleToXZ);
  return alignWithXAxis.rotateInverse.matrixMultiply(rotationMatrix.matrixMultiply(alignWithXAxis.rotate));
}