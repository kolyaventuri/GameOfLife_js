const Game = require('./game');
const Color = require('./color');

const delay = 100;

const canvas = document.querySelector("#game");
const ctx = canvas.getContext('2d');

const pixelSize = 10;

const color = new Color(
  [120, 100, 50],
  [120, 0, 90]
);
const timeToGrey = 10;

ctx.strokeStyle = "#AAAAAA";
ctx.font = "15px Arial";
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

let boundValue = (value, min, max) => {
  if(value < min) return min;
  if(value > max) return max;
  return value;
};

let drawPixel = (x, y, cell) => {
  x *= pixelSize;
  y *= pixelSize;

  let percentage = cell.timeInThisState / timeToGrey;
  percentage = boundValue(percentage, 0, 1);

  let hsl = color.calculate(percentage);
  let cellColor = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;

  ctx.fillStyle = cell.alive ? cellColor : "#FFFFFF";
  if(document.querySelector("#drawLast").checked) {
    if(cell.lastState === true && cell.alive === false) {
      ctx.fillStyle = "#FF0000";
    }
  }

  ctx.fillRect(x, y, pixelSize, pixelSize);
};

let drawGrid = (grid) => {
  ctx.clearRect(0, 0, width, height);
  drawLines();

  for(let y = 0; y < grid.length; y++) {
    let row = grid[y];
    for(let x = 0; x < row.length; x++) {
      let cell = row[x];
      drawPixel(x, y, cell);
    }
  }
};

let drawGen = (generation) => {
  ctx.fillStyle = "#000000";
  ctx.fillText(`Generation ${generation}`, 10, height - 10);
};

let game = new Game(pixelWidth, pixelHeight);

let generation = 0;
let running = false;

let step = () => {
  generation += 1;
  drawGrid(game.grid);
  drawGen(generation);
  game.nextGeneration();
};

let draw = () => {
  step();
  if(running) setTimeout(draw, delay);
};

let run = document.querySelector("#run");
run.addEventListener('click', () => {
  if(running) {
    running = false;
    run.innerText = "Run";
  } else {
    running = true;
    run.innerText = "Pause";
    draw();
  }
});

document.querySelector("#step").addEventListener('click', step);

step();