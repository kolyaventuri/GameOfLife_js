class Color {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  calculateValue(index, percentage) {
    let start = this.start[index];
    let end = this.end[index];

    let delta = end - start;

    return start + delta*percentage;
  }

  calculate(percentage) {
    let hue = this.calculateValue(0, percentage);
    let saturation = this.calculateValue(1, percentage);
    let light = this.calculateValue(2, percentage);

    return [hue, saturation, light];
  }
}

module.exports = Color;