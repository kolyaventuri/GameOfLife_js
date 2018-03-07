class Cell {
  constructor(status = false) {
    this.alive = status;
    this.lastState = null;
  }

  die() {
    this.lastState = this.alive;
    this.alive = false;
  }

  live() {
    this.lastState = this.alive;
    this.alive = true;
  }

  stay() {
    this.lastState = this.alive;
  }
}

module.exports = Cell;