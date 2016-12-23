# default-options
Assigns default values to an object along with validating for required and unknown property keys.

## Usage
`npm i default-options --save`

```javascript
var dopts = require('default-options');

dopts(options, defaults, [doptsOptions]);
```

* `options` - The user specified options object
* `defaults` - An object of defaults for values not specified in `options`. If a default property value is set specifically to `undefined`, it will be treated as a required property.
* `doptsOptions` - Optional object of options for the `dopts` function.
  - `doptsOptions.allowUnknown` If set to true, will not throw an error if an unknown property is specified. (default is `false`)
* Returns `defaults` merged with `options`

Example:

```javascript
var dopts = require('default-options');

dopts({foo: 1, bar: 1}, {
  foo: undefined, // undefined means required
  bar: 2,         // optional
  baz: null,      // optional
});
// Returns {foo: 1, bar: 1, baz: null}

dopts({foo:1}, {
  foo: undefined,
  bar: undefined
});
// Throws an Error because `bar` is not defined

dopts({foo: 1, biz: 2}, {
  foo: undefined
});
// Throws an Error because `biz` is an unknown property
```
