module.exports = function (grunt) {
   grunt.initConfig({
      browserify: {
         dist: {
            options: {
               transform: [
                  ["babelify"]
               ]
            },
            files: {
               "./dist/app.js": ["./lib/game.js"]
            }
         }
      }
   });

   grunt.loadNpmTasks("grunt-browserify");

   grunt.registerTask("default", ["browserify"]);
};