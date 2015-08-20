/**
 * @packageName grunt-bower-install
 * @description Grunt Task for Injecting the Bower Dependencies in the .html file
 * @url https://www.npmjs.com/package/grunt-bower-install
 */

module.exports = {
    "main": {
        src: [
            'index.html'
        ],
        directory: 'bower_components'
    }
};
