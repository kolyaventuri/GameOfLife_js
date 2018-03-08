const expect = require('chai').expect;
const pry = require('pryjs');

const Color = require('../lib/color');

describe('Color', () => {
  let color = new Color(
    [120, 100, 50],
    [0, 0, 75]
  );

  it('should have a start and end color', () => {
    expect(color.start).to.eql([120, 100, 50]);
    expect(color.end).to.eql([0, 0, 75]);
  });

  it('should be able to calculate steps by percentage', () => {
    let _color = color.calculate(0);
    expect(_color).to.eql([120, 100, 50]);

    _color = color.calculate(0.25);
    expect(_color).to.eql([90, 75, 56.25]);

    _color = color.calculate(0.5);
    expect(_color).to.eql([60, 50, 62.5]);

    _color = color.calculate(0.75);
    expect(_color).to.eql([30, 25, 68.75]);

    _color = color.calculate(1);
    expect(_color).to.eql([0, 0, 75]);
  });

});
