const expect = require('chai').expect;
const pry = require('pryjs');

const Game = require('../lib/game');

describe("Game", () => {

  describe('Grid', () => {
    let game = new Game(5,5);

    it('should be an array of arrays', () => {
      expect(game.grid).to.be.an('array');

      for (let row of game.grid) {
        expect(row).to.be.an('array');
      }
    });

    it('should be a 5x5 grid', () => {
      expect(game.grid).to.have.lengthOf(5);

      for(let row of game.grid) {
        expect(row).to.have.lengthOf(5);
      }
    });

    it('should populate cells', () => {
      for(let row of game.grid) {
        for(let cell of row) {
          expect([0, 1]).to.include(cell);
        }
      }
    });
  });

  describe('Cells', () => {
    let grid = [
      [1,1,1,1],
      [1,0,1,0],
      [0,1,0,0],
      [0,0,0,1]
    ];

    let game = new Game(grid);

    it('should calculate number of living neighbors', () => {
      expect(game.neighbors(0,0)).to.equal(2);
      expect(game.neighbors(2,1)).to.equal(4);
    });

    it('calculate whether it should live or die', () => {
      expect(game.willLive(1,2)).to.be.true;
      expect(game.willLive(2,1)).to.be.false;
    });

    it('calculates whether it should reproduce', () => {
      expect(game.willReproduce(3,1)).to.be.true;
      expect(game.willReproduce(0,3)).to.be.false;
    });
  });
});