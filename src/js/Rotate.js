import StaticMath from "./StaticMath.js";
import Matrix from "./Matrix.js";
export default class Rotate {
  /**
   * @param {Vector} vector
   * @param {number} ax
   * @param {number} ay
   * @param {number} az
   * @return {Vector}
   */
  static rotateVec(vector, ax, ay, az) {
    return Rotate.getRotationMatrix(ax, ay, az).vectorMultiply(vector);
  }
  static rotationMatrixMultiplyByVector(vector, rotationMatrix) {
    return rotationMatrix.vectorMultiply(vector);
  }
  /**
   *
   * @param {Matrix[]} arrayOfMatrices
   * @param {Matrix} rotationMatrix
   * @returns {Matrix[]}
   */
  static rotationMatrixMultiplyByArrayOfMatrices(
    arrayOfMatrices,
    rotationMatrix
  ) {
    const result = [];
    for (let m = 0; m < arrayOfMatrices.length; m++) {
      const currMatrix = arrayOfMatrices[m].transpose();
      result.push(rotationMatrix.matrixMultiply(currMatrix.transpose()));
    }
    return result;
  }
  static getInverseRotationMatrix(angleX, angleY, angleZ) {
    const matrixX = StaticMath.getXMatrix(-angleX);
    const matrixY = StaticMath.getYMatrix(-angleY);
    const matrixZ = StaticMath.getZMatrix(-angleZ);
    return matrixZ.matrixMultiply(matrixY.matrixMultiply(matrixX));
  }
  /**
   * @param {number} angleX
   * @param {number} angleY
   * @param {number} angleZ
   * @return {Matrix}
   */
  static getRotationMatrix(angleX, angleY, angleZ) {
    const matrixX = StaticMath.getXMatrix(angleX);
    const matrixY = StaticMath.getYMatrix(angleY);
    const matrixZ = StaticMath.getZMatrix(angleZ);
    return matrixX.matrixMultiply(matrixY.matrixMultiply(matrixZ));
  }
}
