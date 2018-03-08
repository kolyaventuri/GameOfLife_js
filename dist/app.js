(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function () {
  function Cell() {
    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, Cell);

    this.alive = status;
    this.lastState = null;
    this.maturity = 0;
  }

  _createClass(Cell, [{
    key: "die",
    value: function die() {
      this.lastState = this.alive;
      this.alive = false;
      this.checkMaturity();
    }
  }, {
    key: "live",
    value: function live() {
      this.lastState = this.alive;
      this.alive = true;
      this.checkMaturity();
    }
  }, {
    key: "stay",
    value: function stay() {
      this.lastState = this.alive;
      this.checkMaturity();
    }
  }, {
    key: "checkMaturity",
    value: function checkMaturity() {
      if (this.lastState != this.alive) {
        this.maturity = 0;
      } else {
        this.maturity += 1;
      }
    }
  }]);

  return Cell;
}();

module.exports = Cell;

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color = function () {
  function Color(start, end) {
    _classCallCheck(this, Color);

    this.start = start;
    this.end = end;
  }

  _createClass(Color, [{
    key: "calculateValue",
    value: function calculateValue(index, percentage) {
      var start = this.start[index];
      var end = this.end[index];

      var delta = end - start;

      return start + delta * percentage;
    }
  }, {
    key: "calculate",
    value: function calculate(percentage) {
      var hue = this.calculateValue(0, percentage);
      var saturation = this.calculateValue(1, percentage);
      var light = this.calculateValue(2, percentage);

      return [hue, saturation, light];
    }
  }]);

  return Color;
}();

module.exports = Color;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = require('./cell');

var deepClone = function deepClone(grid) {
  var newGrid = new Array(grid.length);

  for (var y = 0; y < grid.length; y++) {
    newGrid[y] = new Array(grid[y].length);
    for (var x = 0; x < grid[y].length; x++) {
      var _prototypes = Object.getPrototypeOf(grid[y][x]);
      var _newCell = Object.create(_prototypes);
      newGrid[y][x] = Object.assign(_newCell, grid[y][x]);
    }
  }

  return newGrid;
};

var Game = function () {
  function Game(width, height) {
    _classCallCheck(this, Game);

    if (width instanceof Array) {
      this.grid = width;
      return;
    }
    this.grid = new Array(height);

    for (var y = 0; y < height; y++) {
      this.grid[y] = new Array(width);

      for (var x = 0; x < width; x++) {
        var status = !Math.round(Math.random());
        this.grid[y][x] = new Cell(status);
      }
    }
  }

  _createClass(Game, [{
    key: 'neighbors',
    value: function neighbors(cellX, cellY) {
      var numNeighbors = 0;

      for (var y = cellY - 1; y <= cellY + 1; y++) {
        if (typeof this.grid[y] == 'undefined') continue;
        for (var x = cellX - 1; x <= cellX + 1; x++) {
          if (y == cellY && x == cellX || typeof this.grid[y][x] == 'undefined') continue;
          if (this.grid[y][x].alive) {
            numNeighbors++;
          }
        }
      }

      return numNeighbors;
    }
  }, {
    key: 'willLive',
    value: function willLive(cellX, cellY) {
      var neighbors = this.neighbors(cellX, cellY);
      return neighbors == 2 || neighbors == 3;
    }
  }, {
    key: 'willReproduce',
    value: function willReproduce(cellX, cellY) {
      var neighbors = this.neighbors(cellX, cellY);
      return neighbors == 3;
    }
  }, {
    key: 'nextGeneration',
    value: function nextGeneration() {
      var newGrid = deepClone(this.grid);

      for (var y = 0; y < newGrid.length; y++) {
        for (var x = 0; x < newGrid[y].length; x++) {
          if (!this.willLive(x, y)) {
            newGrid[y][x].die();
            continue;
          }
          if (this.willReproduce(x, y)) {
            newGrid[y][x].live();
            continue;
          }
          newGrid[y][x].stay();
        }
      }

      this.grid = newGrid;
    }
  }]);

  return Game;
}();

module.exports = Game;

},{"./cell":1}],4:[function(require,module,exports){
'use strict';

var Game = require('./game');
var Color = require('./color');

var delay = 100;

var canvas = document.querySelector("#game");
var ctx = canvas.getContext('2d');

var pixelSize = 10;

var color = new Color([120, 100, 50], [120, 0, 90]);
var timeToGrey = 25;

ctx.strokeStyle = "#AAAAAA";
ctx.font = "15px Arial";
ctx.lineWidth = 1;

var width = canvas.width;
var height = canvas.height;

var pixelWidth = width / pixelSize;
var pixelHeight = height / pixelSize;

var drawLines = function drawLines() {
  for (var y = 0; y < pixelHeight; y++) {
    var y_coord = y * pixelSize;
    ctx.beginPath();
    ctx.moveTo(0, y_coord);
    ctx.lineTo(width, y_coord);
    ctx.stroke();
  }

  for (var x = 0; x < pixelWidth; x++) {
    var x_coord = x * pixelSize;
    ctx.beginPath();
    ctx.moveTo(x_coord, 0);
    ctx.lineTo(x_coord, height);
    ctx.stroke();
  }
};

var boundValue = function boundValue(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

var drawPixel = function drawPixel(x, y, cell) {
  x *= pixelSize;
  y *= pixelSize;

  var percentage = cell.maturity / timeToGrey;
  percentage = boundValue(percentage, 0, 1);

  var hsl = color.calculate(percentage);
  var cellColor = 'hsl(' + hsl[0] + ', ' + hsl[1] + '%, ' + hsl[2] + '%)';

  ctx.fillStyle = cell.alive ? cellColor : "#FFFFFF";
  if (document.querySelector("#drawLast").checked) {
    if (cell.lastState === true && cell.alive === false) {
      ctx.fillStyle = "#FF0000";
    }
  }

  ctx.fillRect(x, y, pixelSize, pixelSize);
};

var drawGrid = function drawGrid(grid) {
  ctx.clearRect(0, 0, width, height);
  drawLines();

  for (var y = 0; y < grid.length; y++) {
    var row = grid[y];
    for (var x = 0; x < row.length; x++) {
      var cell = row[x];
      drawPixel(x, y, cell);
    }
  }
};

var drawGen = function drawGen(generation) {
  ctx.fillStyle = "#000000";
  ctx.fillText('Generation ' + generation, 10, height - 10);
};

var game = new Game(pixelWidth, pixelHeight);

var generation = 0;
var running = false;

var step = function step() {
  generation += 1;
  drawGrid(game.grid);
  drawGen(generation);
  game.nextGeneration();
};

var draw = function draw() {
  step();
  if (running) setTimeout(draw, delay);
};

var run = document.querySelector("#run");
run.addEventListener('click', function () {
  if (running) {
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

},{"./color":2,"./game":3}]},{},[4]);
