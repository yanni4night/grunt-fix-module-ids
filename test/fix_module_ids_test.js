'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/
var defaultOptionsResult = require('../tmp/default_options');
var customOptionsResult = require('../tmp/custom_options');

exports.fix_module_ids = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(3);
    var dor = defaultOptionsResult;
    test.deepEqual(dor.reg.A[0], ['B', 'C']);
    test.deepEqual(dor.reg.B[0], ['C', 'D']);
    test.ok(dor.imp.D);
    test.done();
  },
  custom_options: function(test) {
    test.expect(5);
    var cor = customOptionsResult;
    test.deepEqual(cor.reg.DA[0], ['IB', 'IC']);
    test.deepEqual(cor.reg.DB[0], ['IC', 'ID']);
    test.deepEqual(cor.reg.CASE[0], undefined);
    test.deepEqual(cor.reg.CASE[1], ['IC', 'ID']);
    test.ok(cor.imp.DD);
    test.done();
  },
};
