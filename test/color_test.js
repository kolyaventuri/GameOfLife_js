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
    expect(_color.hue).to.equal(50);
  });

  it('should have default attributes', () => {
    expect(color.timeToGrey).to.equal(5);
    expect(color.maxL).to.equal(100);
    expect(color.minS).to.equal(0);
  });

  it('should be able to set attributes', () => {
    color.setTimeToGrey(10);
    color.setMaxL(75);
    color.setMinS(20);

    expect(color.timeToGrey).to.equal(10);
    expect(color.maxL).to.equal(75);
    expect(color.minS).to.equal(20);
  });

  it('should calculate HSL values', () => {
    color.setTimeToGrey(10);
    color.setMaxL(75);

    let _color = color.calculate(0);
    expect(_color).to.eql([120, 100, 50]);

    _color = color.calculate(5);
    expect(_color).to.eql([120, 50, 62.5]);

    _color = color.calculate(10);
    expect(_color).to.eql([120, 0, 75]);

    _color = color.calculate(11);
    expect(_color).to.eql([120, 0, 75]);

    _color = color.calculate(7);
    expect(_color).to.eql([120, 30, 67.5]);
  });
});
