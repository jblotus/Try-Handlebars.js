module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-hologram');
	grunt.loadNpmTasks('grunt-gh-pages');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-preprocess');

	var DIR_DOC_SRC = 'docs/',
		DIR_BUILD = DIR_DOC_SRC + 'build/';

	grunt.initConfig({
		bower: grunt.file.readJSON('bower.json'),
		'sass': {
			dist: {
				files: {
					"docs/templates/css/sassquatch.css": "sass/sassquatch.scss"
				}
			}
		},
		'hologram': {
			generate: {
				options: {
					config: DIR_DOC_SRC+'/config.yml'
				}
			}
		},
		'gh-pages': {
			options: {
				base: DIR_BUILD
			},
			src: ['**']
		},
		'clean': {
			docs: [DIR_BUILD],
			css: [DIR_DOC_SRC + 'templates/css/sassquatch.css']
		},
		'wiredep': {
			'sass': {
				src: ["sass/_util.scss"]
			}
		},
		'preprocess': {
			inline: {
				src: [ 'docs/build/*.html' ],
				options: {
					inline: true,
					context: {
						DEBUG: false,
						'VERSION': '<%= bower.version %>'
					}
				}
			}
		}
	});

	grunt.registerTask('default', ['clean', 'wiredep', 'sass', 'hologram', 'preprocess']);
	grunt.registerTask('ghpages', ['default', 'gh-pages']);
};
