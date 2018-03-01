const assert = require('assert');
const pry = require('pryjs');

const Game = require('../lib/game');

describe("Game", () => {

  describe('Grid', () => {
    let game = new Game(5,5);

    it('should be an array of arrays', () => {
      assert(game.grid instanceof Array);

      for (let row of game.grid) {
        assert(row instanceof Array);
      }
    });

    it('should be a 5x5 grid', () => {
      assert(game.grid.length == 5);

      for(let row of game.grid) {
        assert(row.length == 5);
      }
    });

    it('should populate cells', () => {
      for(let row of game.grid) {
        for(let cell of row) {
          assert(cell === 1 || cell === 0);
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
      assert.equal(game.neighbors(0,0), 2);
      assert.equal(game.neighbors(2,1), 4);
    });

    it('calculate whether it should live or die', () => {
      assert(game.willLive(1,2));
      assert.equal(game.willLive(2,1), false)
    });

    it('calculates whether it should reproduce', () => {
      assert(game.willReproduce(3,1));
      assert.equal(game.willReproduce(0,3), false)
    });
  });
});