
/* global module: true */
module.exports = function (grunt) {
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
        },
        clean: {
            clean:     [ ],
            distclean: [ "node_modules", "lib" ]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadTasks("../tasks");

    grunt.registerTask("default", [ "bower-install-simple:prod" ]);
};

