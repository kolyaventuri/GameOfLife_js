class Cell {
  constructor(status = false) {
    this.alive = status;
    this.lastState = null;
    this.maturity = 0;
  }

  die() {
    this.lastState = this.alive;
    this.alive = false;
    this.checkMaturity();
  }

  live() {
    this.lastState = this.alive;
    this.alive = true;
    this.checkMaturity();
  }

  stay() {
    this.lastState = this.alive;
    this.checkMaturity();
  }

  checkMaturity() {
    if(this.lastState != this.alive) {
      this.maturity = 0;
    } else {
      this.maturity += 1;
    }
  }
}

module.exports = Cell;