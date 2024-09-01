export class Position {
  x;
  y;

  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  async getPosition() {
    return {
      x: this.x,
      y: this.y,
    };
  }
  async isEqual(somePosition) {
    const isPositionEqualX = somePosition.x === this.x;
    const positionEqualY = somePosition.y === this.y;
    return isPositionEqualX && positionEqualY;
  }
}
