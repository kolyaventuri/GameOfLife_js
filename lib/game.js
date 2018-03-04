let Cell = require('./cell');

class Game {
  constructor(width, height) {
    if(width instanceof Array) {
      this.grid = width;
      return;
    }
    this.grid = new Array(height);

    for(let y = 0; y < height; y++) {
      this.grid[y] = new Array(width);

      for(let x = 0; x < width; x++) {
        let status = !Math.round(Math.random());
        this.grid[y][x] = new Cell(status);
      }
    }
  }

  neighbors(cellX, cellY) {
    let numNeighbors = 0;

    for(let y = cellY - 1; y <= cellY + 1; y++) {
      if(typeof this.grid[y] == 'undefined') continue;
      for (let x = cellX - 1; x <= cellX + 1; x++) {
        if(y == cellY && x == cellX) continue;
        if (this.grid[y][x] === 1) {
          numNeighbors++;
        }
      }
    }

    return numNeighbors;
  }

  willLive(cellX, cellY) {
    let neighbors = this.neighbors(cellX, cellY);
    return (neighbors == 2 || neighbors == 3);
  }

  willReproduce(cellX, cellY) {
    let neighbors = this.neighbors(cellX, cellY);
    return neighbors == 3;
  }

  nextGeneration() {
    this.grid = this.grid.map((row, y) => {
      return row.map((cell, x) => {
        if(!this.willLive(x, y)) cell.die();
        if(this.willReproduce(x, y)) cell.live();
        return cell;
      });
    });
  }
}

module.exports = Game;