class Cell {
  constructor(status = false) {
    this.alive = status;
    this.lastState = null;
    this.timeInThisState = 0;
  }

  die() {
    this.lastState = this.alive;
    this.alive = false;
    this.resetTimeAlive();
  }

  live() {
    this.lastState = this.alive;
    this.alive = true;
    this.resetTimeAlive();
  }

  stay() {
    this.lastState = this.alive;
    this.timeInThisState++;
  }

  resetTimeAlive() {
    this.timeInThisState = 0;
  }
}

module.exports = Cell;