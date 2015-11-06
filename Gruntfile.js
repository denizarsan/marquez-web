module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: {
                src: ['build/**/*.*']
            }
        },

        concat: {
            build: {
                files: [
                    {
                        dest: 'build/js/preload.js',
                        src: [
                            'app/lib/modernizr*.js',
                            'app/lib/es5-shim.js'
                        ]
                    }, {
                        dest: 'build/js/lib.js',
                        src: [
                            'app/lib/angular.js',
                            'app/lib/*.js',
                            'app/lib/*/*.js',
                            '!app/lib/modernizr*.js',
                            '!app/lib/es5-shim.js'
                        ]
                    }, {
                        dest: 'build/js/app.js',
                        src: [
                            'app/app.js',
                            'app/modules/**/*.js',
                            'build/js/templates.js'
                        ]
                    }
                ]
            }
        },

        sass: {
            build: {
                files: {
                    'build/css/lib.css': ['app/styles/bootstrap-custom.sass'],
                    'build/css/app.css': ['app/styles/core.sass']
                }
            }
        },

        uglify: {
            build: {
                files: {
                    'build/js/preload.js': [
                        'app/lib/modernizr*.js',
                        'app/lib/es5-shim.js'
                    ],
                    'build/js/lib.js': [
                        'app/lib/angular.js',
                        'app/lib/*.js',
                        'app/lib/**/*.js',
                        '!app/lib/modernizr*.js',
                        '!app/lib/es5-shim.js'
                    ],
                    'build/js/app.js': [
                        'app/app.js',
                        'app/modules/**/*.js',
                        'build/js/templates.js'
                    ]
                }
            }
        },

        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        dest: 'build/',
                        cwd: 'app/',
                        src: [
                            'index.html',
                            'robots.txt'
                        ]
                    },
                    {
                        expand: true,
                        dest: 'build/images/',
                        cwd: 'app/images/',
                        src: ['**']
                    },{
                        expand: true,
                        dest: 'build/fonts/',
                        cwd: 'app/lib/bootstrap-sass/fonts/',
                        src: ['**']
                    }
                ]
            }
        },

        ngtemplates: {
            build: {
                dest: 'build/js/templates.js',
                cwd: 'app/modules/',
                src: '**/*.html',
                options: {
                    module: 'marquez-web',
                    prefix: '/',
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        },

        connect: {
            server: {
                options: {
                    hostname: '*',
                    livereload: true,
                    base: {
                        path: 'build/',
                        options: {
                            index: 'index.html'
                        }
                    }
                }
            }
        },

        watch: {
            js: {
                files: [
                    'app/app.js',
                    'app/modules/**/*js',
                    'app/lib/**/*js'
                ],
                tasks: ['concat'],
                options: {
                    livereload: true,
                    interval: 500
                }
            },
            html: {
                files: [
                    'app/index.html',
                    'app/**/*.html'
                ],
                tasks: [
                    'ngtemplates:build',
                    'concat'
                ],
                options: {
                    livereload: true,
                    interval: 500
                }
            },
            sass: {
                files: [
                    'app/styles/*.sass',
                    'app/lib/**/*.sass'
                ],
                tasks: ['sass'],
                options: {
                    livereload: true,
                    interval: 500
                }
            },
            images: {
                files: [
                    'app/images/**'
                ],
                tasks: ['copy'],
                options: {
                    livereload: true,
                    interval: 500
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('build-dev', ['clean', 'connect', 'ngtemplates', 'concat', 'sass', 'copy', 'watch']);
    grunt.registerTask('build-prod', ['clean', 'connect', 'ngtemplates', 'uglify', 'sass', 'copy', 'watch']);
};
