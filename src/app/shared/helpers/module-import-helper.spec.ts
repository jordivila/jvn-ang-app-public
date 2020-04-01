import { throwIfAlreadyLoaded } from './module-import-helper';

describe('Throw if already loaded helper', () => {

  describe('When developer tries to reimport SharedModule', () => {

    it('should throw an exception', () => {

      try {
        throwIfAlreadyLoaded({}, 'SharedModule');
        expect(true).toEqual(false);
      } catch (e) {
        expect(e.message.includes('SharedModule has already been loaded')).toEqual(true);
      }

    });

  });

  describe('When developer tries to import SharedModule for the first time', () => {

    it('should NOT throw an exception', () => {

      try {
        throwIfAlreadyLoaded(null, 'SharedModule');
        expect(true).toEqual(true);
      } catch (e) {
        expect(true).toEqual(false);
      }

    });

  });

});
