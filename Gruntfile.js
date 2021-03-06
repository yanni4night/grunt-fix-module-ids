/*
 * grunt-fix-module-ids
 * https://github.com/yinyong/grunt-fix-module-ids
 *
 * Copyright (c) 2016 yanni4night@gmail.com
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    fix_module_ids: {
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options.js': 'test/fixtures/case.js'
        }
      },
      custom_options: {
        options: {
          fixModuleId: function(moduleId, fileName) {
            return 'D' + moduleId;
          },
          fixModuleDepsId: function(moduleId, fileName) {
            return 'I' + moduleId;
          },
          appendModuleId: function(fileName) {
            return require('path').basename(fileName.toUpperCase(), '.JS');
          }
        },
        files: {
          'tmp/custom_options.js': 'test/fixtures/case.js'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'fix_module_ids', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
