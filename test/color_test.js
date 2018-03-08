const expect = require('chai').expect;
const pry = require('pryjs');

const Color = require('../lib/color');

describe('Color', () => {
  let color = new Color();

  it('should be green by default', () => {
    expect(color.hue).to.equal(120);
  });

  it('should be able to start with different hue', () => {
    let _color = new Color(50);
    expect(color.hue).to.equal(50);
  });

  it('should have default maxL and timeToGrey', () => {
    expect(color.timeToGrey).to.equal(5);
    expect(color.maxL).to.equal(100);
  });

  it('should be able to set maxL and timeToGrey', () => {
    color.setTimeToGrey(10);
    color.setMaxL(75);

    expect(color.timeToGrey).to.equal(10);
    expect(color.maxL).to.equal(75);
  })

  it('should calculate HSL values', () => {
    color.setTimeToGrey(10);
    color.setMaxL(75);

    let _color = color.calculate(0);
    expect(_color).to.equal([120, 100, 50]);

    _color = color.calculate(5);
    expect(_color).to.equal([120, 50, 62.5]);

    _color = color.calculate(10);
    expect(_color).to.equal([120, 0, 75]);

    _color = color.calculate(7);
    expect(_color).to.equal([120, 30, 67.5]);
  });
});
