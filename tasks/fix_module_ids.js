/*
 * grunt-fix-module-ids
 * https://github.com/yinyong/grunt-fix-module-ids
 *
 * Copyright (c) 2016 yanni4night@gmail.com
 * Licensed under the MIT license.
 */

'use strict';

var fixModuleIds = require('fix-module-ids').fixModuleIds;

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('fix_module_ids', 'Fixed module ids for systemjs modules', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      fixModuleId: function(moduleId, fileName) {
        return moduleId;
      },
      fixModuleDepsId: function(moduleId, fileName) {
        return moduleId;
      },
      appendModuleId: false
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      var source = grunt.file.read(src[0]);

      var dist = fixModuleIds(source, {
        fixModuleId: function(moduleId) {
          return options.fixModuleId(moduleId, src[0]);
        },
        fixModuleDepsId: function(moduleId) {
          return options.fixModuleDepsId(moduleId, src[0]);
        },
        appendModuleId: ('function' === typeof options.appendModuleId) ? function(moduleId) {
          return options.appendModuleId(src[0]);
        } : (options.appendModuleId ? options.appendModuleId : false)
      });

      // Write the destination file.
      grunt.file.write(f.dest, dist);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
