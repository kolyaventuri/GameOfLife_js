let Cell = require('./cell');
let pry = require('pryjs');
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
        if(y == cellY && x == cellX || typeof this.grid[y][x] == 'undefined') continue;
        if (this.grid[y][x].alive) {
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
    /* this.grid = this.grid.map((row, y) => {
      return row.map((cell, x) => {
        if(!this.willLive(x, y)) return new Cell(false);
        if(this.willReproduce(x, y)) return new Cell(true);
        return cell;
      });
    }); */
    let newGrid = new Array(this.grid.length);

    for(let y = 0; y < this.grid.length; y++) {
      newGrid[y] = new Array(this.grid[y].length);
      for(let x = 0; x < this.grid[y].length; x++) {
        newGrid[y][x] = Object.assign(new Cell(), this.grid[y][x]);
      }
    }

    for(let y = 0; y < newGrid.length; y++) {
      for(let x = 0; x < newGrid[y].length; x++) {
        if(!this.willLive(x, y)) {
          newGrid[y][x].die();
          continue;
        }
        if(this.willReproduce(x, y)) {
          newGrid[y][x].live();
          continue;
        }
      }
    }

    this.grid = newGrid;
  }
}

module.exports = Game;