module.exports = function (grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        lint: {
            all: ["grunt.js", "lib/**/*.js"]
        },
        jshint: {
            options: {
                browser: true,
                curly: true,
                eqeqeq: true,
                newcap: true,
                undef: true,
                eqnull: true,
                node: true,
                strict: false,
                asi: true
            },
            globals: {
                exports: true,
                lib: true
            }
        }
    });

    // Default task.
    grunt.registerTask('default', 'lint');
};