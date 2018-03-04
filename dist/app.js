(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function () {
  function Cell() {
    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, Cell);

    this.alive = status;
  }

  _createClass(Cell, [{
    key: "die",
    value: function die() {
      this.alive = false;
    }
  }, {
    key: "live",
    value: function live() {
      this.alive = true;
    }
  }]);

  return Cell;
}();

module.exports = Cell;

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = require('./cell');

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
      var _this = this;

      this.grid = this.grid.map(function (row, y) {
        return row.map(function (cell, x) {
          if (!_this.willLive(x, y)) return new Cell(false);
          if (_this.willReproduce(x, y)) return new Cell(true);
          return cell;
        });
      });
    }
  }]);

  return Game;
}();

module.exports = Game;

},{"./cell":1}],3:[function(require,module,exports){
'use strict';

var Game = require('./game');

var delay = 100;

var canvas = document.querySelector("#game");
var ctx = canvas.getContext('2d');

var pixelSize = 10;

ctx.strokeStyle = "#AAAAAA";
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

var drawPixel = function drawPixel(x, y, alive) {
  x *= pixelSize;
  y *= pixelSize;

  ctx.fillStyle = alive ? "#00FF00" : "#FFFFFF";

  ctx.fillRect(x, y, pixelSize, pixelSize);
};

var drawGrid = function drawGrid(grid) {
  ctx.clearRect(0, 0, width, height);
  drawLines();

  for (var y = 0; y < grid.length; y++) {
    var row = grid[y];
    for (var x = 0; x < row.length; x++) {
      var cell = row[x];
      drawPixel(x, y, cell.alive);
    }
  }
};

var game = new Game(pixelWidth, pixelHeight);

var draw = function draw() {
  drawGrid(game.grid);
  game.nextGeneration();
  setTimeout(draw, delay);g;
};

draw();

},{"./game":2}]},{},[3]);
