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
          if (y == cellY && x == cellX) continue;
          if (this.grid[y][x] === 1) {
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
  }]);

  return Game;
}();

module.exports = Game;

},{"./cell":1}]},{},[2]);
