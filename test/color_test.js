const expect = require('chai').expect;
const pry = require('pryjs');

const Cell = require('../lib/cell');

describe('Color', () => {
  let color = require('../lib/color');
  color.setTimeToGrey(10);
  color.setMaxL(75);

  it('should have maxL and timeToGrey', () => {
    expect(color.timeToGrey).to.equal(10);
    expect(color.maxL).to.equal(75);
  });

  it('should calculate HSL values', () => {
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
