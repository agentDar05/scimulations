import Vector from "./Vector.js";
import Matrix from "./Matrix.js";
export default class StaticMath {
  static moveFigure(figure, center) {
    const output = [];
    for (let c = 0; c < figure.length; c++) {
      const currMatrix = figure[c];
      const arr = [];
      for (let v = 0; v < currMatrix.asArray().length; v++) {
        const currVec = currMatrix.asArray()[v];
        arr.push(currVec.subtract(center));
      }
      output.push(new Matrix(arr));
    }
    return output;
  }

  /**
   *
   * @param {number} degree
   * @returns {number}
   */
  static degreesToRadians(degree) {
    return (degree * Math.PI) / 180;
  }
  static radiansToDegrees(radians) {
    return (radians * 180) / Math.PI;
  }
  /**
   *
   * @param {number} angleXRad
   * @returns {Matrix}
   */
  static getXMatrix(angleXRad) {
    const cos = Math.cos(angleXRad);
    const sin = Math.sin(angleXRad);
    return Matrix.fromRowsArray([
      [1, 0, 0],
      [0, cos, -sin],
      [0, sin, cos],
    ]);
  }
  /**
   *
   * @param {number} angleXRad
   * @returns {Matrix}
   */
  static getZMatrix(angleZRad) {
    return Matrix.fromRowsArray([
      [Math.cos(angleZRad), -Math.sin(angleZRad), 0],
      [Math.sin(angleZRad), Math.cos(angleZRad), 0],
      [0, 0, 1],
    ]);
  }
  /**
   *
   * @param {number} angleXRad
   * @returns {Matrix}
   */
  static getYMatrix(angleYRad) {
    return Matrix.fromRowsArray([
      [Math.cos(angleYRad), 0, Math.sin(angleYRad)],
      [0, 1, 0],
      [-Math.sin(angleYRad), 0, Math.cos(angleYRad)],
    ]);
  }
  /**
   *
   * @param {Vector} vector
   * @returns {number}
   */
  static angleToPlaneXZ(vector) {
    const xzprojection = new Vector([vector.get(0), vector.get(1), 0]);
    const cos = Vector.XAXIS.dot(xzprojection) / xzprojection.length();
    let angle = Math.acos(cos)
    if (vector.get(1) > 0) {
      angle = -angle
    }
    return angle;
  }
  /**
   * 
   * @param {Vector} vector 
   * @returns {Number}
   */
  static angleToPlaneYZ(vector) {
    const xyprojection = new Vector([vector.get(0), vector.get(1), 0]);
    const cos = Vector.YAXIS.dot(xyprojection) / xyprojection.length();
    let angle = Math.acos(cos);
    // If y-axis looks right and x-axis looks up, then the acos() returns correct anticlockwise angle for
    // everything that lies below X-axis. But for everything above we have 2 choices:
    //  - either return a negative angle. When inserted into anti-clockwise rotator this will rotate clockwise. Then
    //    our rotated vector will always lie into the positive Y-direction.
    //  - or just do 180-angle to keep rotating using a positive angle. In such cases the rotated vector will lie in
    //    the negative Y-direction.
    if (vector.get(0) < 0) {
      angle = -angle
    }
    return angle;
  }
  /**
   *
   * @param {Vector} vector
   * @returns {number}
   */
  static angleToPlaneXY(vector) {
    const xyprojection = new Vector([vector.get(0), 0, vector.get(2)]);
    const cos = Vector.XAXIS.dot(xyprojection) / xyprojection.length();
    let angle = Math.acos(cos);
    if (vector.get(2) < 0) {
      angle = -angle
    }
    return angle
  }
  /**
   *
   * @param {Vector} vector
   * @param {Vector} secondVector
   * @returns {number} in radians
   */
  static returnAngleBetweenVectors(vector, secondVector) {
    const cos =
      vector.dot(secondVector) / vector.length() / secondVector.length();
    return Math.acos(cos);
  }

  /**
   *
   * @param {Vector} vector
   *
   */
  static calcAngles(vector) {
    return {
      xz: this.angleToPlaneXZ(vector),
      yz: this.angleToPlaneYZ(vector),
      xy: this.angleToPlaneXY(vector),
    };
  }

  static rotationMatrix(angleXInRad, angleYInRad, angleZInRad) {
    const matrixX = StaticMath.getXMatrix(angleXInRad);
    const matrixY = StaticMath.getYMatrix(angleYInRad);
    const matrixZ = StaticMath.getZMatrix(angleZInRad);
    return matrixZ.matrixMultiply(matrixX.matrixMultiply(matrixY));
  }

  /**
   *
   * @param {Vector} v1
   * @param {Vector} v2
   * @param {number} epsilon acceptable difference between 2 components of the Vectors
   * @returns
   */

  static isVectorsEqual(v1, v2, epsilon) {
    if (v1.dimensions !== v2.dimensions) {
      throw new Error(
        `Vectors must have the same dimensions, vector 1: ${v1.dimensions}, vector 2: ${v2.dimensions}`
      );
    }
    for (let i = 0; i < v1.dimensions; i++) {
      if (Math.abs(v1.asArray()[i] - v2.asArray()[i]) >= epsilon) return false;
    }
    return true;
  }
  static areArraysEqual(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) return false;
    return true;
  }
}
