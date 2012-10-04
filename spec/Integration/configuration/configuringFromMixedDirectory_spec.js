// TODO: Files would include
// Processed:
//   blah.foo.js
//   ok.js
//   subdir/ok.js
// Ignored:
//   blah.ts
//   foo.js file with no resource in it
//   other.txt
var vows = require('vows'),
    assert = require('assert');

vows.describe('configuring resources from a directory with a range of files in it').addBatch({
    'when you ask restless to load in from a directory with a range of files': 'NYI'/*{
        
        topic: function () {  
        },

        'should not get an error' : function(returned) {
            assert.isFalse(returned instanceof Error, returned.toString());
        },

        'should get expected response body' : function(expressSpy) {
            expressSpy.isFalse(true);
        },

        'should use correct URL when configuring express': function(expressSpy) {
            expressSpy.isFalse(true);
        },
    }*/
}).export(module);