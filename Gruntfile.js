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
            dev: {
                files: {
                    'build/css/lib.css': ['app/styles/bootstrap-custom.sass'],
                    'build/css/app.css': ['app/styles/core.sass']
                }
            },
            prod: {
                files: {
                    'dist/build/css/lib.css': ['app/styles/bootstrap-custom.sass'],
                    'dist/build/css/app.css': ['app/styles/core.sass']
                }
            }
        },

        uglify: {
            prod: {
                files: {
                    'dist/build/js/preload.js': [
                        'app/lib/modernizr*.js',
                        'app/lib/es5-shim.js'
                    ],
                    'dist/build/js/lib.js': [
                        'app/lib/angular.js',
                        'app/lib/*.js',
                        'app/lib/*/*.js',
                        '!app/lib/modernizr*.js',
                        '!app/lib/es5-shim.js'
                    ],
                    'dist/build/js/app.js': [
                        'app/app.js',
                        'app/modules/**/*.js',
                        'build/js/templates.js'
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
            },
            prod: {
                files: [
                    {
                        expand: true,
                        dest: 'dist',
                        src: ['server.js']
                    },
                    {
                        expand: true,
                        dest: 'dist/models',
                        cwd: 'models/',
                        src: ['**']
                    },
                    {
                        expand: true,
                        dest: 'dist/build/',
                        cwd: 'app/',
                        src: [
                            'index.html',
                            'robots.txt'
                        ]
                    },
                    {
                        expand: true,
                        dest: 'dist/build/images/',
                        cwd: 'app/images/',
                        src: ['**']
                    },{
                        expand: true,
                        dest: 'dist/build/fonts/',
                        cwd: 'app/lib/bootstrap-sass/fonts/',
                        src: ['**']
                    }
                ]
            }
        },

        ngtemplates: {
            dev: {
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
            },
            prod: {
                dest: 'dist/build/js/templates.js',
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
                                         '\n\t\t"start": "node server.js"' +
                                       '\n\t},' +
                                       '\n\t"dependencies": {' +
                                         '\n\t\t"express": "~4.5.1",' +
                                         '\n\t\t"mongoose": "^4.2.4"' +
                                       '\n\t}' +
                                     '\n}');
                    done();
                },

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
            script: 'server.js'
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
                    'app/styles/*.sass',
                    'app/lib/**/*.sass'
                ],
                tasks: ['sass:dev'],
                options: {
                    livereload: true,
                    interval: 500
                }
            },
            images: {
                files: [
                    'app/images/**'
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
    grunt.registerTask('build-dev', ['clean:dev', 'ngtemplates:dev', 'concat', 'sass:dev', 'copy:dev', 'concurrent']);
    grunt.registerTask('build-prod', ['clean:prod', 'file-creator','ngtemplates:prod', 'uglify', 'sass:prod', 'copy:prod']);
};
