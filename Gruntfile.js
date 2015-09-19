module.exports = function(grunt) {

  //require('jit-grunt')(grunt);

/*
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);
*/

    //for the tasks and plugins see inside /grunt folder

    // measures the time each task takes
    require('time-grunt')(grunt);

    // load grunt config
    require('load-grunt-config')(grunt);
};
