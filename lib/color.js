const pry = require('pryjs');

class Color {
  constructor(hue) {
    this.timeToGrey = 5;
    this.maxL = 100;
    this.minS = 0;
    this.hue = hue || 120;
  }

  setTimeToGrey(time) {
    this.timeToGrey = time;
  }

  setMaxL(max) {
    this.maxL = max;
  }

  setMinS(min) {
    this.minS = min;
  }

  calculate(time) {
    let saturation = 100;
    let light = 50;

    let timePercentage = time / this.timeToGrey;
    if(timePercentage > 1) timePercentage = 1;
    if(timePercentage < 0) timePercentage = 0;

    let deltaS = (saturation - this.minS) * timePercentage;
    let deltaL = (light - this.maxL) * timePercentage;

    saturation -= deltaS;
    light -= deltaL;

    return [this.hue, saturation, light];
  }
}

module.exports = Color;