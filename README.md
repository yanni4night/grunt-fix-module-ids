# grunt-fix-module-ids

> Fixed module ids for systemjs modules

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-fix-module-ids --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-fix-module-ids');
```

## The "fix_module_ids" task

### Overview
In your project's Gruntfile, add a section named `fix_module_ids` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  fix_module_ids: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.fixModuleId
Type: `Function`
Default value:

```js
function(moduleId, fileName) {
    return moduleId;
}
```

Convert module id.

#### options.fixModuleDepsId
Type: `String`
Default value: 

```js
function(moduleId, fileName) {
    return moduleId;
}
```

Convert module dependencies.

#### options.appendModuleId
Type: `Boolean`|`Function`
Default value: `false`

Append module id.

### Usage Examples

```js
var path = require('path');

grunt.initConfig({
  fix_module_ids: {
    options: {
        fixModuleId: function(moduleId, fileName) {
            return path.basename(fileName);;
        },
        fixModuleDepsId: function(moduleId, fileName) {
            return path.basename(fileName);;
        },
        appendModuleId: function(fileName) {
            return path.basename(fileName, '.js');
        }
    },
    files: {
      'dest/index-fixed.js': 'src/index.js'
    },
  },
});
```

```js
// index.js
// Before
System.register(['./base'], function(){
    System.import('./lazy');
})

// After
System.register('index', ['base'], function(){
    System.import('lazy');
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
