import {parse} from '../src/argvs';

describe('default behavior', () => {

  describe('when no argument is passed', () => {
    it('should return default configuration', () => {
      const opts = parse(['', '']);
      const defaultConfig = {
        git: true,
        yes: false
      };

      expect(opts).toEqual(defaultConfig);
    });
  });
});