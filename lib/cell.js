class Cell {
  constructor(status = false) {
    this.alive = status;
  }

  die() {
    this.alive = false;
  }

  live() {
    this.alive = true;
  }
}

module.exports = Cell;