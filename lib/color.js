class Color {
  constructor(hue) {
    this.timeToGrey = 5;
    this.maxL = 100;
    this.hue = hue;
  }

  setTimeToGrey(time) {
    this.timeToGrey = time;
  }

  setMaxL(max) {
    this.maxL = max;
  }

  calculate(time) {

  }
}

module.exports = Color;