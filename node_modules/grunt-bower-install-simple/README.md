
# grunt-bower-install-simple

Grunt Task for Installing Bower Dependencies

<p/>
<img src="https://nodei.co/npm/grunt-bower-install-simple.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/grunt-bower-install-simple.png" alt=""/>

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/)
before, be sure to check out the [Getting
Started](http://gruntjs.com/getting-started) guide, as it explains how
to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as
install and use Grunt plugins. Once you're familiar with that process,
you may install this plugin with this command:

```shell
npm install grunt-bower-install-simple --save-dev
```

Once the plugin has been installed, it may be enabled inside your
Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks("grunt-bower-install-simple");
```

## Task Options

- `color` (default `true`): Whether output is colorized.
  The equivalent of `bower --config.color=<value>`.

- `cwd` (default `process.cwd()`): The directory from which Bower should run.
  All relative paths in Bower will be calculated according to this.
  The equivalent of ``bower --config.cwd=`pwd` ``.

- `forceLatest` (default `false`): Force latest dependency version on conflict.
  The equivalent of `bower install --force-latest`.

- `production` (default `false`): Do not install project `devDependencies`.
  The equivalent of `bower install --production`.

- `interactive` (default `true`): Makes Bower interactive, prompting whenever necessary.
  The equivalent of `bower --config.interactive=true`.

- `directory` (default `undefined`): The path in which installed components should be saved.
  This defaults to `bower_components`.
  The equivalent of `bower --config.directory=<dir>`.

- `command` (default `install`): Provide the bower command it should run.
  Setting this to `update` will run `bower update` instead of `bower install`.

## Task Calling

_Run this task with the `grunt bower-install-simple` command._

Task targets, files and options may be specified according to the Grunt
[Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

## Usage Example

Assuming we have the following build environment:

- `Gruntfile.js`:

```js
// [...]
grunt.initConfig({
    "bower-install-simple": {
        options: {
            color: true,
            directory: "lib"
        },
        "prod": {
            options: {
                production: true
            }
        },
        "dev": {
            options: {
                production: false
            }
        }
    }
});
grunt.registerTask("bower-install", [ "bower-install-simple" ]);
// [...]
```

- `bower.json`:

```json
{
    "name": "sample",
    "version": "0.0.0",
    "devDependencies": {
        "componentjs":    "~1.1.1",
        "jquery":         "~2.1.1",
        "lodash":         "~2.4.1"
    }
}
```

Then running `grunt bower-install` is functionality-wise equivalent
to running `bower --config.color=false --config.directory=lib install
--production`. It will read the `bower.json` and install ComponentJS,
jQuery and Lo-Dash into the local `lib` directory.

