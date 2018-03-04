# Game of Life

JavaScript implementation of Conways Game of Life.

Built for browser using [Browserify](http://browserify.org/) and (Babel)[http://babeljs.io/].

## Setup
If modifying source, install dependencies with `npm i`

## Testing
Testing through [Mocha](https://mochajs.org/) using [Chai](http://chaijs.com/) expect style BDD testing.

Tests can be run with `npm test`

## Building
Build for the browser with `grunt`

## Interesting things

The pattern at the bottom right in [this video](https://streamable.com/nc4qt). Cannot be replicated in other Game of Life implementations. This seems to be due to the way edges are handled in this implementation, in that the cells on row Height+1 (and consequently, Height-1, Width+1, and Width-1) are treated as 0 or non-existent, as opposed to treating them as though they *could* be live.

