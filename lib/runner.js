const Game = require('./game');

const canvas = document.querySelector("#game");
const ctx = canvas.getContext('2d');

const pixelSize = 10;

ctx.strokeStyle = "#AAAAAA";
ctx.lineWidth = 1;

const width = canvas.width;
const height = canvas.height;

const pixelWidth = width / pixelSize;
const pixelHeight = height / pixelSize;

let drawLines = () => {
  for(let y = 0; y < pixelHeight; y++) {
    let y_coord = y * pixelSize;
    ctx.beginPath();
    ctx.moveTo(0, y_coord);
    ctx.lineTo(width, y_coord);
    ctx.stroke();
  }

  for(let x = 0; x < pixelWidth; x++) {
    let x_coord = x * pixelSize;
    ctx.beginPath();
    ctx.moveTo(x_coord, 0);
    ctx.lineTo(x_coord, height);
    ctx.stroke();
  }
};

let drawPixel = (x, y, alive) => {
  x *= pixelSize;
  y *= pixelSize;

  ctx.fillStyle = alive ? "#00FF00" : "#FFFFFF";

  ctx.fillRect(x, y, pixelSize, pixelSize);
};

let drawGrid = (grid) => {
  ctx.clearRect(0, 0, width, height);
  drawLines();

  for(let y = 0; y < grid.length; y++) {
    let row = grid[y];
    for(let x = 0; x < row.length; x++) {
      let cell = row[x];
      drawPixel(x, y, cell.alive)
    }
  }
}

let game = new Game(pixelWidth, pixelHeight);
console.log(game.grid);
drawGrid(game.grid);

let flat = game.grid.reduce(
  ( acc, cur ) => acc.concat(cur),
  []
);

let live = flat.filter(cell => cell.alive);
console.log(live)

