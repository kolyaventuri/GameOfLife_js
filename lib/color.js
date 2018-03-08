class Color {
  constructor(hue) {
    this.timeToGrey = 5;
    this.maxL = 100;
    this.hue = hue || 120;
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