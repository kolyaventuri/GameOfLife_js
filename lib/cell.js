class Cell {
  constructor(status = false) {
    this.alive = status;
    this.lastState = null;
    this.timeInThisState = 0;
  }

  die() {
    this.lastState = this.alive;
    this.alive = false;
    this.checkTimeAlive();
  }

  live() {
    this.lastState = this.alive;
    this.alive = true;
    this.checkTimeAlive();
  }

  stay() {
    this.lastState = this.alive;
    this.checkTimeAlive();
  }

  checkTimeAlive() {
    if(this.lastState != this.alive) {
      this.timeInThisState = 0;
    } else {
      this.timeInThisState += 1;
    }
  }
}

module.exports = Cell;