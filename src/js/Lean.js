import StaticMath from "./StaticMath.js";
import Rotate from "./Rotate.js";
import Vector from "./Vector.js";
export default class Lean {
    static leanFigure(angleX, angleY, angleZ) {
        //         const angles = StaticMath.calcAngles(axis)
        //     const matrixLean = Rotate.getRotationMatrix(angles.xy, 0, angles.xz);
        //     const matrixLeanInverse = Rotate.getInverseRotationMatrix(
        //       angles.xy,
        //       0,
        //       angles.xz
        //     );
        //             console.log(matrixLean);
        //       return { lean: matrixLean, LeanInverse: matrixLeanInverse}  
        
        return {
          lean: Rotate.getRotationMatrix(angleX, angleY, angleZ),
          inverse: Rotate.getInverseRotationMatrix(angleX, angleY, angleZ),
        };
    }
}