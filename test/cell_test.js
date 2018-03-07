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
    cell.die();
    expect(cell.alive).to.be.false;
  });

  it('should be able to become alive', () => {
    let cell = new Cell();
    cell.live();
    expect(cell.alive).to.be.true;
  });

  it('should store last state', () => {
    let cell = new Cell();
    expect(cell.lastState).to.be.null;
    cell.live();
    expect(cell.lastState).to.be.false;
    cell.die();
    expect(cell.lastState).to.be.true;
  });
});