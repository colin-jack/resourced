var vows = require('vows'),
    assert = require('assert'),
    Resource = require('./../underTestNamespace').require('Resource');

vows.describe('errors specifying resource').addBatch({
    'when the caching information has negative value for years' : 'NYI - Consider flatiron / revalidator',
    'when the caching information has negative value for months' : 'NYI - Consider flatiron / revalidator',
    'when the caching information has negative value for seconds' : 'NYI - Consider flatiron / revalidator',
    'when the caching information does not specify where to cache' : 'NYI - Default to private',
    'when the caching information specifies where to cache' : 'NYI - Set on response',
    'when the caching information is not specified' : 'NYI - No caching',
    'when the caching information specifies where to cache and its not known value' : 'NYI - Default to private',
    
}).export(module);