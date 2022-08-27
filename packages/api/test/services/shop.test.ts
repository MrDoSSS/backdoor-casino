import assert from 'assert';
import app from '../../src/app';

describe('\'shop\' service', () => {
  it('registered the service', () => {
    const service = app.service('shop');

    assert.ok(service, 'Registered the service');
  });
});
