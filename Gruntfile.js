module.exports = function(grunt) {

  require('jit-grunt')(grunt);
  grunt.initConfig({
/*
    jshint: {
      files: ['Gruntfile.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
*/
    sass : {
	main: {
		options: {
			style: 'expanded'
		},
		files: [{
			expand: true,
			cwd: 'sass',
			src: ['*.scss'],
			dest: 'css',
			ext: '.css'
		}]
	},
    }
  });


/*
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);
*/

};
