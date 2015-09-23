/**
 * @packageName grunt-bower-install-simple
 * @description Grunt Task for Installing Bower Dependencies
 * @url https://www.npmjs.com/package/grunt-bower-install-simple
 */

module.exports = {
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
	}
};
