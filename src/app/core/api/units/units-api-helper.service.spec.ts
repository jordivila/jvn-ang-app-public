import { UnitSystemApiHelper } from './units-api-helper.service';
import { UnitSystemDto, UnitSystemPrefix } from './units-api.dto';

describe('UnitSystemApiHelper', () => {

    describe('When getOptimalMagnitude is invoked', () => {

        const theUnitSystem = {
            Base: 1,
            Prefixes: {
                1: {
                    Factor: 1,
                    Prefix: '1prefix',
                    Symbol: '1symbol',
                    SymbolHTML: '1symbolHTML',
                    Letter: '1letter'
                } as UnitSystemPrefix,
                // 100: {
                //     Factor: 100,
                //     Prefix: '100prefix',
                //     Symbol: '100symbol',
                //     SymbolHTML: '100symbolHTML',
                //     Letter: '100letter'
                // } as UnitSystemPrefix,
                // 1000: {
                //     Factor: 1000,
                //     Prefix: '1000prefix',
                //     Symbol: '1000symbol',
                //     SymbolHTML: '1000symbolHTML',
                //     Letter: '1000letter'
                // } as UnitSystemPrefix
            }
        } as Partial<UnitSystemDto>;

        describe('And value is 0 (zero)', () => {

            it('should return base magnitued', () => {
                expect(UnitSystemApiHelper.getOptimalMagnitude(0, theUnitSystem as any))
                    .toEqual(theUnitSystem.Prefixes[theUnitSystem.Base]);
            });

        });

        describe('And value is NOT 0', () => {

            it('should return optimal magnitude', () => {

                expect(UnitSystemApiHelper.getOptimalMagnitude(1, theUnitSystem as any))
                    .toEqual(theUnitSystem.Prefixes[theUnitSystem.Base]);

            });

        });
    });
});
