'use strict';

const { registerTask } = require("grunt");

module.exports = function (grunt) {
    const sass = require("node-sass");
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },
        watch: {
            files: "css/*.scss",
            tasks: ["sass"]
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        "css/*.css",
                        "*.html",
                        "js/*.js"
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
        },
        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: "./",
                    src: ["*.html"],
                    dest: "dist"
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: "node_modules/font-awesome",
                    src: ["fonts/*.*"],
                    dest: "dist"
                }]
            }
        },
        clean: {
            build: {
                src: ["dist/"]
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['img/*.{png,jpg,gif}'],
                    dest: 'dist/'
                }]
            }
        }
    });

    grunt.registerTask('css', ['sass']);
    grunt.registerTask("default", ["browserSync", "watch"]);
    grunt,registerTask("build", [
        "clean",
        "copy",
        "imagemin"
    ])
};