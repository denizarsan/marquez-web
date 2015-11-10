module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dev: { src: ['build'] },
            prod: { src: ['dist'] }
        },

        concat: {
            dev: {
                files: [
                    {
                        dest: 'build/js/preload.js',
                        src: [
                            'client/lib/modernizr*.js',
                            'client/lib/es5-shim.js'
                        ]
                    }, {
                        dest: 'build/js/lib.js',
                        src: [
                            'client/lib/angular.js',
                            'client/lib/*.js',
                            'client/lib/*/*.js',
                            '!client/lib/modernizr*.js',
                            '!client/lib/es5-shim.js'
                        ]
                    }, {
                        dest: 'build/js/app.js',
                        src: [
                            'client/app.js',
                            'client/modules/**/*.js',
                            'build/js/templates.js'
                        ]
                    }
                ]
            }
        },

        sass: {
            dev: {
                files: {
                    'build/css/lib.css': ['client/styles/bootstrap-custom.sass'],
                    'build/css/app.css': ['client/styles/core.sass']
                }
            },
            prod: {
                files: {
                    'dist/build/css/lib.css': ['client/styles/bootstrap-custom.sass'],
                    'dist/build/css/app.css': ['client/styles/core.sass']
                }
            }
        },

        uglify: {
            prod: {
                files: {
                    'dist/build/js/preload.js': [
                        'client/lib/modernizr*.js',
                        'client/lib/es5-shim.js'
                    ],
                    'dist/build/js/lib.js': [
                        'client/lib/angular.js',
                        'client/lib/*.js',
                        'client/lib/*/*.js',
                        '!client/lib/modernizr*.js',
                        '!client/lib/es5-shim.js'
                    ],
                    'dist/build/js/app.js': [
                        'client/app.js',
                        'client/modules/**/*.js',
                        'dist/build/js/templates.js'
                    ]
                }
            }
        },

        copy: {
            dev: {
                files: [
                    {
                        expand: true,
                        dest: 'build/',
                        cwd: 'client/',
                        src: [
                            'index.html',
                            'robots.txt'
                        ]
                    },
                    {
                        expand: true,
                        dest: 'build/images/',
                        cwd: 'client/images/',
                        src: ['**']
                    },{
                        expand: true,
                        dest: 'build/fonts/',
                        cwd: 'client/lib/bootstrap-sass/fonts/',
                        src: ['**']
                    }
                ]
            },
            prod: {
                files: [
                    {
                        expand: true,
                        dest: 'dist/server',
                        cwd: 'server',
                        src: ['**']
                    },
                    {
                        expand: true,
                        dest: 'dist/build/',
                        cwd: 'client/',
                        src: [
                            'index.html',
                            'robots.txt'
                        ]
                    },
                    {
                        expand: true,
                        dest: 'dist/build/images/',
                        cwd: 'client/images/',
                        src: ['**']
                    },{
                        expand: true,
                        dest: 'dist/build/fonts/',
                        cwd: 'client/lib/bootstrap-sass/fonts/',
                        src: ['**']
                    }
                ]
            }
        },

        ngtemplates: {
            dev: {
                dest: 'build/js/templates.js',
                cwd: 'client/modules/',
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
            },
            prod: {
                dest: 'dist/build/js/templates.js',
                cwd: 'client/modules/',
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

        'file-creator': {
            prod: {
                'dist/.gitignore': function(fs, fd, done) {
                    fs.writeSync(fd, '.DS_Store\nnode_modules\n');
                    done();
                },
                'dist/package.json': function(fs, fd, done) {
                    fs.writeSync(fd, '{' +
                                       '\n\t"name": "marquez-web",' +
                                       '\n\t"description": "The personal website of Çınar Atilla",' +
                                       '\n\t"scripts": {' +
                                         '\n\t\t"start": "node server/server.js"' +
                                       '\n\t},' +
                                       '\n\t"dependencies": {' +
                                         '\n\t\t"body-parser": "^1.14.1",' +
                                         '\n\t\t"express": "~4.13.3",' +
                                         '\n\t\t"mongoose": "^4.2.5"' +
                                       '\n\t}' +
                                     '\n}');
                    done();
                }
            }
        },

        concurrent: {
          options: {
            logConcurrentOutput: true
          },
          tasks: ['nodemon', 'watch']
        },

        nodemon: {
          dev: {
            script: 'server/server.js'
          }
        },

        watch: {
            js: {
                files: [
                    'client/app.js',
                    'client/modules/**/*js',
                    'client/lib/**/*js'
                ],
                tasks: ['concat'],
                options: {
                    livereload: true,
                    interval: 500
                }
            },
            html: {
                files: [
                    'client/index.html',
                    'client/**/*.html'
                ],
                tasks: [
                    'ngtemplates:dev',
                    'concat'
                ],
                options: {
                    livereload: true,
                    interval: 500
                }
            },
            sass: {
                files: [
                    'client/styles/*.sass',
                    'client/lib/**/*.sass'
                ],
                tasks: ['sass:dev'],
                options: {
                    livereload: true,
                    interval: 500
                }
            },
            images: {
                files: [
                    'client/images/**'
                ],
                tasks: ['copy:dev'],
                options: {
                    livereload: true,
                    interval: 500
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('build-dev', ['clean:dev',
                                     'ngtemplates:dev',
                                     'concat',
                                     'sass:dev',
                                     'copy:dev',
                                     'concurrent']);

    grunt.registerTask('build-prod', ['clean:prod',
                                      'file-creator',
                                      'ngtemplates:prod',
                                      'uglify',
                                      'sass:prod',
                                      'copy:prod']);
};
