export default class Canvas2D {
  constructor(parentElement, { width = 150, height = 150 } = {}) {
    this.root = this.#createCanvas(parentElement, { width, height });
    this.size = { width, height };
    this.context = this.root
      .querySelector(".canvas-component_canvas-2d")
      .getContext("2d");
  }

  /**
   * Arc direction is clockwise, starting from 3 o'clock. To draw a counter-clockwise arc, use negative values.
   * @param x - x coordinate of the center of the circle
   * @param y - y coordinate of the center of the circle
   * @param radius - radius of the circle
   * @param startAngle - start angle of the arc, in radians
   * @param endAngle - end angle of the arc, in radians
   * @param stroke - stroke color
   */
  drawArc(
    x,
    y,
    radius,
    startAngle,
    endAngle,
    stroke = "black",
    counterclockwise = true
  ) {
    this.context.beginPath();
    this.context.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    this.context.strokeStyle = stroke;
    this.context.stroke();
  }

  /**
   * @param x - x coordinate of the center of the circle
   * @param y - y coordinate of the center of the circle
   * @param radius - radius of the circle
   * @param stroke - stroke color
   */
  drawCircle(x, y, radius, stroke = "black") {
    this.drawArc(x, y, radius, 0, Math.PI * 2, stroke);
  }

  drawFilledCircle(x, y, radius, color) {
    this.drawCircle(x, y, radius);
    this.context.fillStyle = color;
    this.context.fill();
    this.context.fillStyle = "black";
  }
  setAlpha(alpha) {
    this.context.globalAlpha = alpha;
  }
  /**
   *
   * @param {number[][]} coords - e.g. [[0,0], [0,50], [50,50], [50,0], [0,0]]
   * @param {string} color
   */
  drawFilledPath(coords, color = "black") {
    this.context.beginPath();
    const startPoint = coords[0];
    this.context.moveTo(startPoint[0], startPoint[1]);
    for (let index = 1; index < coords.length; index++) {
      const nextPoint = coords[index];
      this.context.lineTo(nextPoint[0], nextPoint[1]);
    }
    this.context.fillStyle = color;
    this.context.fill();
    this.context.fillStyle = "black";
  }
  /**
   * x1, y1 - start point; x2, y2 - end point
   * @param x1
   * @param y1
   * @param x2
   * @param y2
   * @param stroke - line color
   */
  drawLine(x1, y1, x2, y2, stroke = "black") {
    // console.log(x1, y1, x2, y2, stroke);
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.strokeStyle = stroke;
    this.context.stroke();
  }

  /**
   * ax, ay - first point; bx, by - second point; cx, cy - third point
   * @param ax
   * @param ay
   * @param bx
   * @param by
   * @param cx
   * @param cy
   * @param stroke - triangle color
   */
  drawTriangle(ax, ay, bx, by, cx, cy, stroke = "black") {
    this.context.beginPath();
    this.context.moveTo(ax, ay);
    this.context.lineTo(bx, by);
    this.context.lineTo(cx, cy);
    this.context.closePath();
    this.context.strokeStyle = stroke;
    this.context.stroke();
  }
  drawText(x, y, text, stroke = "black") {
    this.context.textAlign = "center";
    this.context.fillText(text, x, y,100);
  }

  clear() {
    this.context.clearRect(0, 0, this.size.width, this.size.height);
  }

  getCenter() {
    return { x: this.size.width / 2, y: this.size.height / 2 };
  }

  #createCanvas(parentElement, { width, height }) {
    parentElement.insertAdjacentHTML(
      "beforeend",
      this.#htmlTemplate({ width, height })
    );
    return parentElement.lastElementChild;
  }

  #htmlTemplate({ width, height }) {
    return `<div class="canvas-component">
                    <canvas class="canvas-component_canvas-2d" width="${width}" height="${height}"></canvas>
                </div>`;
  }
}
