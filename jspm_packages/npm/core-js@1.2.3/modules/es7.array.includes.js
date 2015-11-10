/* */ 
'use strict';
var $def = require('./$.def'),
    $includes = require('./$.array-includes')(true);
$def($def.P, 'Array', {includes: function includes(el) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }});
require('./$.unscope')('includes');
