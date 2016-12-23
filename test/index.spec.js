var vopts = require('..');

describe('index', () => {
  it('supports required options', () => {
    expect(() => {
      vopts({}, {
        foo: undefined
      })
    }).to.throw(/foo/);

    expect(() => {
      vopts({foo: null}, {
        foo: undefined
      })
    }).not.to.throw();
  });

  it('supports assigning default values to optional properties', () => {
    var opts = vopts({
      foo: 1
    }, {
      foo: 2,
      bar: 3
    });

    expect(opts).to.eql({foo: 1, bar: 3});
  });

  it('defaults to disallowing unknown properties', () => {
    expect(() => {
      vopts({baz: 1}, {bar: 1});
    }).to.throw(/baz/);
  });

  it('supports `allowUnknown` option', () => {
    var opts;
    expect(() => {
      opts = vopts({baz: 1}, {bar: 1}, {allowUnknown: true});
    }).not.to.throw();

    expect(opts).to.eql({
      baz: 1, bar: 1
    });
  });

  it('supports a mix of required and optional properties', () => {
    expect(vopts({
      foo: 1,
      bar: 2
    }, {
      foo: undefined,
      bar: 3,
      baz: 4
    })).to.eql({
      foo: 1, bar: 2, baz: 4
    });
  });
});