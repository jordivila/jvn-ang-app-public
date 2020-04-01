import { UnitSystemDto } from 'src/app/core/api/units/units-api.dto';

export const inputSystemOfUnitDtoForTestingForTesting: UnitSystemDto = {
    UnitSystemID: 5,
    Description: 'Frequency',
    Base: 1.0,
    Unit: 'hertz',
    Symbol: 'Hz',
    Filterable: 'auto',
    DataType: 'double',
    StandardWidth: 'Small',
    DefaultFactor: 1000.0,
    Prefixes: {
        0.001: {
            Factor: 0.001,
            Prefix: 'microhertz',
            Symbol:  'mHz',
            SymbolHTML:  '<u>m</u>Hz',
            Letter: 'm'
        },
        1: {
            Factor: 1.0,
            Prefix: 'hertz',
            Symbol:  'Hz',
            SymbolHTML:  '<u>Hz</u>',
            Letter: 'hz'
        },
        1000: {
            Factor: 1000.0,
            Prefix: 'kilohertz',
            Symbol:  'kHz',
            SymbolHTML:  '<u>k</u>Hz',
            Letter: 'kK'
        },
        1000000: {
            Factor: 1000000.0,
            Prefix: 'megahertz',
            Symbol:  'MHz',
            SymbolHTML:  '<u>M</u>Hz',
            Letter: 'M'
        },
        1000000000: {
            Factor: 1000000000.0,
            Prefix: 'gigahertz',
            Symbol:  'GHz',
            SymbolHTML:  '<u>G</u>Hz',
            Letter: 'gG'
        }
    }
};
