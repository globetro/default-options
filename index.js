var _ = require('lodash');

function vopts(obj, defaults, options) {
  options = options || {};

  var objKeys = _.keys(obj);

  var requiredKeys = [];
  var optionalKeys = [];

  _.forOwn(defaults, function(value, key) {
    if (_.isUndefined(value)) {
      requiredKeys.push(key);
    }
    else {
      optionalKeys.push(key);
    }
  });

  if (requiredKeys) {
    var missing = _.difference(requiredKeys, objKeys);
    if (missing.length > 0) {
      throw new Error('Missing required properties: ' + missing.join(', '));
    }
  }

  if (!options.allowUnknown) {
    var extra = _.difference(objKeys, _.keys(defaults));
    if (extra.length > 0) {
      throw new Error('Unknown properties: ' + extra.join(', '));
    }
  }

  return _.assign({}, defaults, obj);
}


module.exports = function(obj, defaults, options) {
  options = vopts(options, {
    allowUnknown: false
  });

  return vopts(obj, defaults, options);
};