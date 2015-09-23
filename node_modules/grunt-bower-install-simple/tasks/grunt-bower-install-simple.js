/*
**  grunt-bower-install-simple -- Grunt Task for Installing Bower Dependencies
**  Copyright (c) 2013-2015 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* global module:  false */
/* global require: false */
/* global process: false */

/*  foreign modules  */
var chalk         = require("chalk");
var bower         = require("bower");
var bowerRenderer = require("bower/lib/renderers/StandardRenderer");

module.exports = function (grunt) {
    grunt.registerMultiTask("bower-install-simple", "Install or Update Bower Dependencies", function () {
        /*  prepare options  */
        var options = this.options({
            /*  bower configuration options (renderer specific)  */
            color:        undefined,          /*  bower --config.color=<val>           */
            cwd:          undefined,          /*  bower --config.cwd=<dir>             */

            /*  bower command selection options  */
            command:      "install",          /*  bower <command>                      */

            /*  bower command argument options  */
            forceLatest:  false,              /*  bower <command> --force-latest       */
            production:   false,              /*  bower <command> --production         */

            /*  bower configuration options (general)  */
            interactive:  undefined,          /*  bower --config.interactive=<val>     */
            directory:    undefined           /*  bower --config.directory=<dir>       */
        });
        grunt.verbose.writeflags(options, "Options");

        /*  sanity check option values  */
        if (typeof options.color !== "undefined" && typeof options.color !== "boolean")
            throw new Error("invalid type of value for option \"color\" (expected boolean)");
        if (typeof options.cwd !== "undefined" && typeof options.cwd !== "string")
            throw new Error("invalid type of value for option \"cwd\" (expected string)");
        if (typeof options.command !== "undefined" && typeof options.command !== "string")
            throw new Error("invalid type of value for option \"command\" (expected string)");
        if (typeof bower.commands[options.command] !== "function")
            throw new Error("invalid Bower command \"" + options.command + "\"");
        if (typeof options.forceLatest !== "undefined" && typeof options.forceLatest !== "boolean")
            throw new Error("invalid type of value for option \"forceLatest\" (expected boolean)");
        if (typeof options.production !== "undefined" && typeof options.production !== "boolean")
            throw new Error("invalid type of value for option \"production\" (expected boolean)");
        if (typeof options.interactive !== "undefined" && typeof options.interactive !== "boolean")
            throw new Error("invalid type of value for option \"interactive\" (expected boolean)");
        if (typeof options.directory !== "undefined" && typeof options.directory !== "string")
            throw new Error("invalid type of value for option \"directory\" (expected string)");

        /*  determine renderer options
            (notice: provide only the real overrides to allow .bowerrc usage)
            (notice: "cwd" has to be present to let Bower not fail)  */
        var rendererOpts = {};
        if (typeof options.color !== "undefined")
            rendererOpts.color = options.color;
        if (typeof options.cwd !== "undefined")
            rendererOpts.cwd = options.cwd;
        else
            rendererOpts.cwd = process.cwd();

        /*  determine task, task arguments and task options
            (notice: provide only the real overrides to allow .bowerrc usage)  */
        var task = bower.commands[options.command];
        var taskArgs = {};
        if (options.command.match(/^(?:install|update)$/)) {
            taskArgs["force-latest"] = options.forceLatest;
            taskArgs.production = options.production;
        }
        var taskOpts = {};
        if (typeof options.interactive !== "undefined")
            taskOpts.interactive = options.interactive;
        if (typeof options.directory !== "undefined")
            taskOpts.directory = options.directory;
        if (typeof options.cwd !== "undefined")
            taskOpts.cwd = options.cwd;

        /*  display header to explicitly inform user about our Bower operation  */
        var msg = chalk.blue("Executing Bower") + " (Command: " + chalk.green(options.command) + ")";
        if (options.color !== true)
            msg = chalk.stripColor(msg);
        grunt.log.writeln(msg);

        /*  programatically run the Bower functionality  */
        var done = this.async();
        var renderer = new bowerRenderer(options.command, rendererOpts);
        task([], taskArgs, taskOpts)
        .on("log", function (log) {
            renderer.log(log);
        })
        .on("prompt", function (prompt, callback) {
            renderer.prompt(prompt).then(function(answer) {
                callback(answer);
            });
        })
        .on("error", function (err) {
            renderer.error(err);
            done(false);
        })
        .on("end", function (data) {
            renderer.end(data);
            done();
        });
    });
};

