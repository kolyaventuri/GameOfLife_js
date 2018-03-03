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

let drawGrid = () => {
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

let drawPixel = (x, y, color) => {
  x *= pixelSize;
  y *= pixelSize;

  ctx.fillStyle = color;

  ctx.fillRect(x, y, pixelSize, pixelSize);
};

drawGrid();

drawPixel(5,5, "#FF0000");