import Vector from "./Vector.js";
import StaticMath from "./StaticMath.js";
import CanvasUtils from "./CanvasUtils.js";
import Rotate from "./Rotate.js";
import {cubic, orthorhombic, tetragonal} from "./LatticeSystem.js";
import {CUBIC_DRAWING, ORTHORHOMBIC_DRAWING, TETRAGONAL_DRAWING} from "./LatticeSystemDrawing.js";

const tetragonalCanvas = TETRAGONAL_DRAWING.canvas
const cubicCanvas = CUBIC_DRAWING.canvas
const orthorhombicCanvas = ORTHORHOMBIC_DRAWING.canvas
const ANGULAR_SPEED = 0.005;
const CAMERA_ROTATION_MATRIX = Rotate.getRotationMatrix(0.4, 0.4, 0);
const btn_rotate_axis111 = document.getElementById("cubic-btn-rotate-axis111")
const btn_rotate_axis1_11 = document.getElementById("cubic-btn-rotate-axis1-11")
const btn_rotate_axis_111 = document.getElementById("cubic-btn-rotate-axis-111")
const btn_rotate_axis11_1 = document.getElementById("cubic-btn-rotate-axis11-1")
const btn_rotate_axis010 = document.getElementById("tetragonal-btn-rotate-axis010")
const ARRAY_OF_BUTTONS = [
  btn_rotate_axis111,
  btn_rotate_axis1_11,
  btn_rotate_axis_111,
  btn_rotate_axis11_1,
  btn_rotate_axis010
]
const figures = {
  cubic: CUBIC_DRAWING,
  tetragonal: TETRAGONAL_DRAWING
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
function leanRotationAxis(matrix, cameraRotation) {
  return Rotate.multiplyByArrayOfMatrices([matrix.numberMultiply(25)], cameraRotation)[0];
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
drawFigures(cubicCanvas, CUBIC_DRAWING.figure, CUBIC_DRAWING.colors, CAMERA_ROTATION_MATRIX);
drawFigures(tetragonalCanvas, TETRAGONAL_DRAWING.figure, TETRAGONAL_DRAWING.colors, CAMERA_ROTATION_MATRIX);
drawFigures(orthorhombicCanvas, ORTHORHOMBIC_DRAWING.figure, ORTHORHOMBIC_DRAWING.colors, CAMERA_ROTATION_MATRIX);

document.querySelectorAll(".rotate-buttons > button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const axisIndex = Number.parseInt(e.currentTarget.getAttribute("data-axis"));
    let figureId = e.currentTarget.dataset.figure
    currentFigure = figures[figureId]
    currentFigure.currentRotationAxis = currentFigure.rotationAxes[axisIndex]
    rotationMatrix = computeRotationMatrix(currentFigure.currentRotationAxis.rotationAxis.getCol(1))
    currentFigure.currentVisibleAxis = currentFigure.rotationAxes[axisIndex];
    drawFrame()
  })
  button.addEventListener("mouseenter", (e) => {
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
})
changeButtonStatus(ARRAY_OF_BUTTONS, false)
function drawFrame() {
  if (currentFigure) {
    /** @type {Matrix[]} */
    currentFigure.canvas.clear()
    if (currentFigure.currentVisibleAxis) {
      const rotationAxis = leanRotationAxis(currentFigure.currentVisibleAxis.rotationAxis, CAMERA_ROTATION_MATRIX);
      CanvasUtils.drawLine(currentFigure.canvas, rotationAxis.getCol(0), rotationAxis.getCol(1));
    }
    if (rotationMatrix) {
      changeButtonStatus(ARRAY_OF_BUTTONS, true)
      rotatingAngle += ANGULAR_SPEED;
      currentFigure.figure = Rotate.multiplyByArrayOfMatrices(currentFigure.figure, rotationMatrix);
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