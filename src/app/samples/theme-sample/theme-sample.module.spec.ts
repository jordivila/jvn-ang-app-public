import { ThemeSampleModule } from './theme-sample.module';

describe('ThemeSampleModule', () => {
  let themeSampleModule: ThemeSampleModule;

  beforeEach(() => {
    themeSampleModule = new ThemeSampleModule();
  });

  it('should create an instance', () => {
    expect(themeSampleModule).toBeTruthy();
  });
});
