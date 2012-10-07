var vows = require('vows'),
    assert = require('assert'),
    Resource = require('./../../testFixture').require('Resource');

vows.describe('errors specifying resource method').addBatch({
    'when the resource method definition has no verb specified and conventions do not cover it' : 'NYI - Consider flatiron / revalidator',
    'when the collection resource method definition has no verb specified and conventions do not cover it' : 'NYI - Consider flatiron / revalidator',
    'when the resource method definition has more than one function' : 'NYI - Consider flatiron / revalidator',
    'when the resource method definition has URL specified but its invalid' : 'NYI - Consider flatiron / revalidator'
    
}).export(module);