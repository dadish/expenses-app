import expect from 'expect';
import Lab from 'lab';

// export lab
const lab = module.exports.lab = Lab.script();

const {
  describe,
  it,
} = lab;

describe('Hello', () => {
  it('world', (done) => {
    expect('hello').toNotBe('world');
    expect('world').toBe('world');
    done();
  });
});
