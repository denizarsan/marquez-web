module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jscs: {
            src: 'app/**/*.js'
        },

        clean: {
            build: {
                src: ['build/**/*.*']
            }
        },

        concat: {
            js: {
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
            },
            css: {
                files: [
                    {
                        dest: 'build/css/lib.css',
                        src: ['app/lib/bootstrap/css/bootstrap.css']
                    }, {
                        dest: 'build/css/app.css',
                        src: ['app/styles/*.css']
                    }
                ]
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
                        'app/lib/*/*.js',
                        '!app/lib/modernizr-2.8.2.js',
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

        cssmin: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/css/',
                        src: [
                            'lib.css',
                            'app.css'
                        ],
                        dest: 'build/css/'
                    }
                ]
            }
        },

        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['index.html'],
                        dest: 'build/'
                    },
                    {
                        expand: true,
                        cwd: 'app/images/',
                        src: ['**'],
                        dest: 'build/images/'
                    }, {
                        expand: true,
                        cwd: 'app/',
                        src: ['robots.txt'],
                        dest: 'build/'
                    }
                ]
            }
        },

        ngtemplates: {
            build: {
                cwd: 'app/modules/',
                src: '**/*.html',
                dest: 'build/js/templates.js',
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
                tasks: ['ngtemplates:build',
                        'concat'
                ],
                options: {
                    livereload: true,
                    interval: 500
                }
            },
            css: {
                files: [
                    'app/styles/*.css',
                    'app/lib/**/*.css'
                ],
                tasks: ['concat'],
                options: {
                    livereload: true,
                    interval: 500
                }
            },
            images: {
                files: [
                    'app/images/**'
                ],
                tasks: ['copy:build'],
                options: {
                    livereload: true,
                    interval: 500
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('build-dev', [
                       'clean',
                       'connect',
                       'ngtemplates',
                       'concat',
                       'copy',
                       'watch'
    ]);

    grunt.registerTask('build-prod', [
                       'clean',
                       'connect',
                       'ngtemplates',
                       'uglify',
                       'concat:css',
                       'cssmin',
                       'copy',
                       'watch'
    ]);
};
