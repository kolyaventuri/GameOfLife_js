const expect = require('chai').expect;
const pry = require('pryjs');

const Cell = require('../lib/cell');

describe('Cell', () => {


  it('should be dead by default', () => {
    let cell = new Cell();
    expect(cell.alive).to.be.false;
  });

  it('should be able to be alive by default', () => {
    let cell = new Cell(true);
    expect(cell.alive).to.be.true;
  });

  it('should be able to die', () => {
    let cell = new Cell(true);
    expect(cell.die()).to.be.undefined;
    expect(cell.alive).to.be.false;
  });

  it('should be able to become alive', () => {
    let cell = new Cell();
    expect(cell.live()).to.be.undefined;
    expect(cell.alive).to.be.true;
  })
});