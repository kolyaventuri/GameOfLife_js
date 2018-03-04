const expect = require('chai').expect;
const pry = require('pryjs');

const Game = require('../lib/game');
const Cell = require('../lib/cell');

let toCellArray = (grid) => {
  return grid.map(row => {
    return row.map(cell => {
      return new Cell(!!cell);
    });
  });
};

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
          expect(cell).to.be.an.instanceOf(Cell);
          expect([true, false]).to.include(cell.alive);
        }
      }
    });

    it('should be able to get neighbors count', () => {
      let grid = toCellArray([
        [1, 0, 0, 1],
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [1, 0, 1, 0]
      ]);

      game.grid = grid;
      expect(game.grid).to.equal(grid);

      expect(game.neighbors(0,0)).to.equal(1);
      expect(game.neighbors(1,2)).to.equal(5);
      expect(game.neighbors(2,2)).to.equal(4);
    });

    it('should check if cell will live or die', () => {
      let grid = toCellArray([
        [1, 0, 0, 1],
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [1, 0, 1, 0]
      ]);

      game.grid = grid;
      expect(game.grid).to.equal(grid);

      expect(game.willLive(0,0)).to.be.false;
      expect(game.willLive(2,1)).to.be.true;
    });

    it('should check if cell will reproduce', () => {
      let grid = toCellArray([
        [1, 0, 0, 1],
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [1, 0, 1, 0]
      ]);

      game.grid = grid;
      expect(game.grid).to.equal(grid);

      expect(game.willReproduce(1,0)).to.be.true;
      expect(game.willReproduce(1,3)).to.be.false;
    });

    // it('should manipulate grid every generation', () => {
    //   let grid = toCellArray([
    //     [1, 0, 0, 1],
    //     [0, 1, 1, 0],
    //     [1, 1, 0, 0],
    //     [1, 0, 1, 0]
    //   ]);
    //
    //   game.grid = grid;
    //   expect(game.grid).to.equal(grid);
    //
    //   game.nextGeneration();
    //
    //   let expected = toCellArray([
    //     [0, 1, 1, 0],
    //     [0, 0, 1, 0],
    //     [1, 0, 0, 0],
    //     [1, 0, 0, 0]
    //   ]);
    //
    //   expect(game.grid).to.equal(expected);
    //
    //   game.nextGeneration();
    //
    //   expected = toCellArray([
    //     [0, 1, 1, 0],
    //     [0, 0, 1, 0],
    //     [0, 1, 0, 0],
    //     [0, 0, 0, 0]
    //   ]);
    //
    //   expect(game.grid).to.equal(expected);
    // });
  });
});