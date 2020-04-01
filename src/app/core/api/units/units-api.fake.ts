import { UnitSystemDto } from './units-api.dto';

export const unitSystemData = [
    {
        UnitSystemID: 1,
        Description: 'None',
        Base: 0.0,
        DataType: 'string',
        StandardWidth: 'Automatic',
        Prefixes: {}
    },
    {
        UnitSystemID: 2,
        Description: 'Enum',
        Base: 0.0,
        Filterable: 'dropdown',
        DataType: 'string',
        StandardWidth: 'Automatic',
        Prefixes: {}
    },
    {
        UnitSystemID: 3,
        Description: 'Length',
        Base: 1.0,
        Unit: 'meter',
        Symbol: ' m',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            '1E-09': {
                Factor: 1E-09,
                Prefix: 'nanometer',
                Symbol: ' nm',
                SymbolHTML: ' <u>n</u>m',
                Letter: 'nm'
            },
            '1E-06': {
                Factor: 1E-06,
                Prefix: 'micrometer',
                Symbol: ' μm',
                SymbolHTML: ' <u>μ</u>m',
                Letter: 'uU'
            },
            0.001: {
                Factor: 0.001,
                Prefix: 'milimeter',
                Symbol: ' mm',
                SymbolHTML: ' <u>m</u>m',
                Letter: 'm'
            },
            0.01: {
                Factor: 0.01,
                Prefix: 'centimeter',
                Symbol: ' cm',
                SymbolHTML: ' <u>c</u>m',
                Letter: 'cC'
            },
            1: {
                Factor: 1.0,
                Prefix: 'meter',
                Symbol: ' m',
                SymbolHTML: ' <u>m</u>',
                Letter: 'M'
            },
            1000: {
                Factor: 1000.0,
                Prefix: 'kilocentimeter',
                Symbol: ' km',
                SymbolHTML: ' <u>k</u>m',
                Letter: 'kK'
            }
        }
    },
    {
        UnitSystemID: 4,
        Description: 'Temperature (ºC)',
        Base: 1.0,
        Unit: 'degrees celsius',
        Symbol: 'ºC',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'degrees celsius',
                Symbol: 'ºC',
                SymbolHTML: 'º<u>C</u>',
                Letter: 'cC'
            }
        }
    },
    {
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
                Symbol: ' mHz',
                SymbolHTML: ' <u>m</u>Hz',
                Letter: 'm'
            },
            1: {
                Factor: 1.0,
                Prefix: 'hertz',
                Symbol: ' Hz',
                SymbolHTML: ' <u>Hz</u>',
                Letter: 'hz'
            },
            1000: {
                Factor: 1000.0,
                Prefix: 'kilohertz',
                Symbol: ' kHz',
                SymbolHTML: ' <u>k</u>Hz',
                Letter: 'kK'
            },
            1000000: {
                Factor: 1000000.0,
                Prefix: 'megahertz',
                Symbol: ' MHz',
                SymbolHTML: ' <u>M</u>Hz',
                Letter: 'M'
            },
            1000000000: {
                Factor: 1000000000.0,
                Prefix: 'gigahertz',
                Symbol: ' GHz',
                SymbolHTML: ' <u>G</u>Hz',
                Letter: 'gG'
            }
        }
    },
    {
        UnitSystemID: 6,
        Description: 'Angle',
        Base: 1.0,
        Unit: 'degree',
        Symbol: 'º',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'grades',
                Symbol: 'º',
                SymbolHTML: 'º',
                Letter: 'gG'
            }
        }
    },
    {
        UnitSystemID: 7,
        Description: 'Percent',
        Base: 1.0,
        Unit: 'percent',
        Symbol: '%',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Tiny',
        Prefixes: {
            0.01: {
                Factor: 0.01,
                Prefix: 'Percent',
                Symbol: ' %',
                SymbolHTML: ' <u>%</u>',
                Letter: '%'
            }
        }
    },
    {
        UnitSystemID: 8,
        Description: 'Current',
        Base: 1.0,
        Unit: 'ampere',
        Symbol: ' A',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            '1E-09': {
                Factor: 1E-09,
                Prefix: 'nanoampere',
                Symbol: ' nA',
                SymbolHTML: ' <u>n</u>A',
                Letter: 'nA'
            },
            '1E-06': {
                Factor: 1E-06,
                Prefix: 'microampere',
                Symbol: '  µA',
                SymbolHTML: '<u> µ</u>A',
                Letter: 'uA'
            },
            0.001: {
                Factor: 0.001,
                Prefix: 'miliampere',
                Symbol: ' mA',
                SymbolHTML: ' <u>m</u>A',
                Letter: 'mM'
            },
            1: {
                Factor: 1.0,
                Prefix: 'ampere',
                Symbol: ' A',
                SymbolHTML: ' <u>A</u>',
                Letter: 'aA'
            },
            1000: {
                Factor: 1000.0,
                Prefix: 'kiloampere',
                Symbol: '  kA',
                SymbolHTML: '<u> k</u>A',
                Letter: 'kA'
            }
        }
    },
    {
        UnitSystemID: 9,
        Description: 'Voltage',
        Base: 1.0,
        Unit: 'volt',
        Symbol: ' V',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'volt',
                Symbol: ' V',
                SymbolHTML: ' <u>V</u>',
                Letter: 'vV'
            },
            1000: {
                Factor: 1000.0,
                Prefix: 'kilovolt',
                Symbol: ' kV',
                SymbolHTML: ' <u>kV</u>',
                Letter: 'kK'
            }
        }
    },
    {
        UnitSystemID: 10,
        Description: 'Resistance',
        Base: 1.0,
        Unit: 'ohm',
        Symbol: ' Ω',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            0.001: {
                Factor: 0.001,
                Prefix: 'miliohm',
                Symbol: ' mΩ',
                SymbolHTML: ' <u>m</u>Ω',
                Letter: 'm'
            },
            1: {
                Factor: 1.0,
                Prefix: 'ohm',
                Symbol: ' Ω',
                SymbolHTML: ' <u>Ω</u>',
                Letter: 'oO'
            },
            1000: {
                Factor: 1000.0,
                Prefix: 'kiloohm',
                Symbol: ' kΩ',
                SymbolHTML: ' <u>k</u>Ω',
                Letter: 'kK'
            },
            1000000: {
                Factor: 1000000.0,
                Prefix: 'megaohm',
                Symbol: ' MΩ',
                SymbolHTML: ' <u>M</u>Ω',
                Letter: 'M'
            },
            1000000000: {
                Factor: 1000000000.0,
                Prefix: 'gigaohm',
                Symbol: ' GΩ',
                SymbolHTML: ' <u>G</u>Ω',
                Letter: 'gG'
            },
            1000000000000: {
                Factor: 1000000000000.0,
                Prefix: ' TΩ',
                Symbol: ' TΩ',
                SymbolHTML: '<u> T</u> Ω',
                Letter: 'TΩ'
            }
        }
    },
    {
        UnitSystemID: 11,
        Description: 'Impedance',
        Base: 1.0,
        Unit: 'ohm',
        Symbol: ' Ω',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            0.001: {
                Factor: 0.001,
                Prefix: 'miliohm',
                Symbol: ' mΩ',
                SymbolHTML: ' <u>m</u>Ω',
                Letter: 'm'
            },
            1: {
                Factor: 1.0,
                Prefix: 'ohm',
                Symbol: ' Ω',
                SymbolHTML: ' <u>Ω</u>',
                Letter: 'oO'
            },
            1000: {
                Factor: 1000.0,
                Prefix: 'kilohm',
                Symbol: ' kΩ',
                SymbolHTML: ' <u>k</u>Ω',
                Letter: 'kK'
            },
            1000000: {
                Factor: 1000000.0,
                Prefix: 'megaohm',
                Symbol: ' MΩ',
                SymbolHTML: ' <u>M</u>Ω',
                Letter: 'M'
            },
            1000000000: {
                Factor: 1000000000.0,
                Prefix: 'gigaohm',
                Symbol: ' GΩ',
                SymbolHTML: ' <u>G</u>Ω',
                Letter: 'gG'
            }
        }
    },
    {
        UnitSystemID: 12,
        Description: 'Inductance',
        Base: 1.0,
        Unit: 'henry',
        Symbol: ' H',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        DefaultFactor: 1E-06,
        Prefixes: {
            '1E-12': {
                Factor: 1E-12,
                Prefix: 'picohenry',
                Symbol: ' pH',
                SymbolHTML: ' <u>p</u>H',
                Letter: 'pP'
            },
            '1E-09': {
                Factor: 1E-09,
                Prefix: 'nanohenry',
                Symbol: ' nH',
                SymbolHTML: ' <u>n</u>H',
                Letter: 'nN'
            },
            '1E-06': {
                Factor: 1E-06,
                Prefix: 'microhenry',
                Symbol: ' μH',
                SymbolHTML: ' <u>μ</u>H',
                Letter: 'uU'
            },
            0.001: {
                Factor: 0.001,
                Prefix: 'milihenry',
                Symbol: ' mH',
                SymbolHTML: ' <u>m</u>H',
                Letter: 'mM'
            },
            1: {
                Factor: 1.0,
                Prefix: 'henry',
                Symbol: ' H'
            }
        }
    },
    {
        UnitSystemID: 13,
        Description: 'Capacitance',
        Base: 1.0,
        Unit: 'faraday',
        Symbol: ' F',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            '1E-12': {
                Factor: 1E-12,
                Prefix: 'picofarad',
                Symbol: ' pF',
                SymbolHTML: ' <u>p</u>F',
                Letter: 'pP'
            },
            '1E-09': {
                Factor: 1E-09,
                Prefix: 'nanofarad',
                Symbol: ' nF',
                SymbolHTML: ' <u>n</u>F',
                Letter: 'nN'
            },
            '1E-06': {
                Factor: 1E-06,
                Prefix: 'microfarad',
                Symbol: ' μF',
                SymbolHTML: ' <u>μ</u>F',
                Letter: 'uU'
            },
            0.001: {
                Factor: 0.001,
                Prefix: 'milifarad',
                Symbol: ' mF',
                SymbolHTML: ' <u>m</u>F',
                Letter: 'mM'
            },
            1: {
                Factor: 1.0,
                Prefix: 'farad',
                Symbol: ' F',
                SymbolHTML: ' <u>F</u>',
                Letter: 'fF'
            }
        }
    },
    {
        UnitSystemID: 14,
        Description: 'Energy',
        Base: 1.0,
        Unit: 'joule',
        Symbol: ' J',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'joule',
                Symbol: ' J',
                SymbolHTML: '<u>J</u>',
                Letter: 'jJ'
            }
        }
    },
    {
        UnitSystemID: 15,
        Description: 'Power',
        Base: 1.0,
        Unit: 'watt',
        Symbol: ' W',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            '1E-06': {
                Factor: 1E-06,
                Prefix: 'microwatt',
                Symbol: ' µW',
                SymbolHTML: ' <u>μ</u>W',
                Letter: 'uU'
            },
            0.001: {
                Factor: 0.001,
                Prefix: 'miliwatt',
                Symbol: ' mW',
                SymbolHTML: ' <u>m</u>W',
                Letter: 'mM'
            },
            1: {
                Factor: 1.0,
                Prefix: 'watt',
                Symbol: ' W',
                SymbolHTML: ' <u>W</u>',
                Letter: 'wW'
            },
            1000: {
                Factor: 1000.0,
                Prefix: 'kilowatt',
                Symbol: ' kW',
                SymbolHTML: ' <u>k</u>W',
                Letter: 'kK'
            }
        }
    },
    {
        UnitSystemID: 16,
        Description: 'Luminous Intensity',
        Base: 1.0,
        Unit: 'candela',
        Symbol: ' cd',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            0.001: {
                Factor: 0.001,
                Prefix: 'milicandela',
                Symbol: ' mcd',
                SymbolHTML: ' <u>m</u>cd',
                Letter: 'mM'
            },
            1: {
                Factor: 1.0,
                Prefix: 'candela',
                Symbol: ' cd',
                SymbolHTML: ' <u>c</u>d',
                Letter: 'cC'
            }
        }
    },
    {
        UnitSystemID: 17,
        Description: 'Magnetic-Flux Density',
        Base: 1.0,
        Unit: 'tesla',
        Symbol: ' T',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            0.001: {
                Factor: 0.001,
                Prefix: 'militesla',
                Symbol: ' mT',
                SymbolHTML: ' <u>m</u>T',
                Letter: 'mM'
            },
            1: {
                Factor: 1.0,
                Prefix: 'tesla',
                Symbol: ' T',
                SymbolHTML: ' <u>T</u>',
                Letter: 'tT'
            }
        }
    },
    {
        UnitSystemID: 18,
        Description: 'Factor',
        Base: 1.0,
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            0.001: {
                Factor: 0.001,
                Prefix: 'mili',
                Symbol: ' m',
                SymbolHTML: ' <u>m</u>',
                Letter: 'mM'
            },
            1: {
                Factor: 1.0,
                Prefix: 'unit',
                Symbol: ' ',
                SymbolHTML: ' ',
                Letter: '_ '
            },
            1000: {
                Factor: 1000.0,
                Prefix: 'kilo',
                Symbol: ' k',
                SymbolHTML: ' <u>k</u>',
                Letter: 'kK'
            },
            1000000: {
                Factor: 1000000.0,
                Prefix: 'mega',
                Symbol: ' M',
                SymbolHTML: ' <u>M</u>',
                Letter: 'mM'
            },
            1000000000: {
                Factor: 1000000000.0,
                Prefix: 'giga',
                Symbol: ' G',
                SymbolHTML: ' <u>G</u>',
                Letter: 'gG'
            }
        }
    },
    {
        UnitSystemID: 19,
        Description: 'Attenuation',
        Base: 1.0,
        Unit: 'decibel',
        Symbol: ' dB',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'decibel',
                Symbol: ' dB',
                SymbolHTML: ' <u>d</u>B',
                Letter: 'dD'
            }
        }
    },
    {
        UnitSystemID: 20,
        Description: 'Length (nano)',
        Base: 1.0,
        Unit: 'nanometer',
        Symbol: ' nm',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'nanometer',
                Symbol: ' nm',
                SymbolHTML: ' <u>n</u>m'
            }
        }
    },
    {
        UnitSystemID: 21,
        Description: 'Boolean',
        Base: 0.0,
        Filterable: 'auto',
        DataType: 'boolean',
        StandardWidth: 'Tiny',
        Prefixes: {}
    },
    {
        UnitSystemID: 22,
        Description: 'DateTime',
        Base: 0.0,
        Filterable: 'datetime',
        DataType: 'date',
        StandardWidth: 'Small',
        Prefixes: {}
    },
    {
        UnitSystemID: 23,
        Description: 'Graphic',
        Base: 0.0,
        DataType: 'string',
        StandardWidth: 'Automatic',
        Prefixes: {}
    },
    {
        UnitSystemID: 24,
        Description: 'URL',
        Base: 0.0,
        DataType: 'string',
        StandardWidth: 'Automatic',
        Prefixes: {}
    },
    {
        UnitSystemID: 25,
        Description: 'Windings',
        Base: 0.0,
        Filterable: 'auto',
        DataType: 'string',
        StandardWidth: 'Small',
        Prefixes: {}
    },
    {
        UnitSystemID: 26,
        Description: 'Area',
        Base: 1.0,
        Unit: 'square meter',
        Symbol: ' m²',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        DefaultFactor: 1E-06,
        Prefixes: {
            '1E-06': {
                Factor: 1E-06,
                Prefix: 'square milimeter',
                Symbol: ' mm²',
                SymbolHTML: ' <u>m</u>m<sup>2</sup>',
                Letter: 'mM'
            },
            0.0001: {
                Factor: 0.0001,
                Prefix: 'square centimeter',
                Symbol: ' cm²',
                SymbolHTML: ' <u>c</u>m<sup>2</sup>',
                Letter: 'mM'
            },
            1: {
                Factor: 1.0,
                Prefix: 'square metter',
                Symbol: ' m²'
            }
        }
    },
    {
        UnitSystemID: 27,
        Description: 'Temperature (K)',
        Base: 1.0,
        Unit: 'kelvin',
        Symbol: ' K',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            0.001: {
                Factor: 0.001,
                Prefix: 'microkelvin',
                Symbol: ' mK',
                SymbolHTML: ' <u>m</u>K',
                Letter: 'mM'
            },
            1: {
                Factor: 1.0,
                Prefix: 'kelvin',
                Symbol: ' K',
                SymbolHTML: ' <u>K</u>',
                Letter: 'kK'
            },
            1000: {
                Factor: 1000.0,
                Prefix: 'kilokelvin',
                Symbol: ' kK',
                SymbolHTML: ' <u>kK</u>',
                Letter: 'k'
            }
        }
    },
    {
        UnitSystemID: 28,
        Description: 'Time',
        Base: 1.0,
        Unit: 'second',
        Symbol: ' s',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Tiny',
        Prefixes: {
            '1E-12': {
                Factor: 1E-12,
                Prefix: 'picosecond',
                Symbol: ' ps',
                SymbolHTML: ' <u>p</u>s',
                Letter: 'pP'
            },
            '1E-09': {
                Factor: 1E-09,
                Prefix: 'nanosecond',
                Symbol: ' ns',
                SymbolHTML: ' <u>n</u>s',
                Letter: 'nN'
            },
            '1E-06': {
                Factor: 1E-06,
                Prefix: 'microsecond',
                Symbol: ' µs',
                SymbolHTML: ' <u>μ</u>s',
                Letter: 'uU'
            },
            0.001: {
                Factor: 0.001,
                Prefix: 'millisecond',
                Symbol: ' ms',
                SymbolHTML: ' <u>m</u>s',
                Letter: 'mM'
            },
            1: {
                Factor: 1.0,
                Prefix: 'second',
                Symbol: ' s',
                SymbolHTML: ' <u>s</u>',
                Letter: 'sS'
            },
            3600: {
                Factor: 3600.0,
                Prefix: 'hour',
                Symbol: ' h',
                SymbolHTML: ' <u>h</u>',
                Letter: 'hH'
            }
        }
    },
    {
        UnitSystemID: 29,
        Description: 'Quantity',
        Base: 1.0,
        Filterable: 'auto',
        DataType: 'integer',
        StandardWidth: 'Tiny',
        Prefixes: {}
    },
    {
        UnitSystemID: 30,
        Description: 'Graham-Stetzer',
        Base: 1.0,
        Unit: 'graham stetzer',
        Symbol: 'gs',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {}
    },
    {
        UnitSystemID: 31,
        Description: 'Numeric',
        Base: 1.0,
        Unit: 'numeric magnitude',
        Filterable: 'auto',
        DataType: 'integer',
        StandardWidth: 'Small',
        Prefixes: {
            0.001: {
                Factor: 0.001,
                Prefix: 'mili',
                Symbol: ' m',
                SymbolHTML: ' <u>m</u>',
                Letter: 'mM'
            },
            1: {
                Factor: 1.0,
                Prefix: 'unit',
                Symbol: ' ',
                SymbolHTML: ' ',
                Letter: '_ '
            },
            1000: {
                Factor: 1000.0,
                Prefix: 'kilo',
                Symbol: ' k',
                SymbolHTML: ' <u>k</u>',
                Letter: 'kK'
            },
            1000000: {
                Factor: 1000000.0,
                Prefix: 'mega',
                Symbol: ' M',
                SymbolHTML: ' <u>M</u>',
                Letter: 'mM'
            },
            1000000000: {
                Factor: 1000000000.0,
                Prefix: 'giga',
                Symbol: ' G',
                SymbolHTML: ' <u>G</u>',
                Letter: 'gG'
            }
        }
    },
    {
        UnitSystemID: 32,
        Description: 'Voltage / Milli Second',
        Base: 1.0,
        Unit: 'voltage over milli second',
        Symbol: ' V/μs',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'voltage over microsecond',
                Symbol: ' V/μs',
                SymbolHTML: ' V/<u>μ</u>s',
                Letter: 'vV'
            }
        }
    },
    {
        UnitSystemID: 34,
        Description: 'Voltage * Second',
        Base: 1.0,
        Unit: 'voltage times second',
        Symbol: ' Vs',
        DataType: 'double',
        StandardWidth: 'Small',
        DefaultFactor: 1E-06,
        Prefixes: {
            '1E-06': {
                Factor: 1E-06,
                Prefix: 'voltage times microsecond',
                Symbol: ' Vμs',
                SymbolHTML: ' V<u>μ</u>s',
                Letter: 'uU'
            },
            1: {
                Factor: 1.0,
                Prefix: 'voltage times second',
                Symbol: ' Vs',
                SymbolHTML: ' V<u>s</u>',
                Letter: 'sS'
            }
        }
    },
    {
        UnitSystemID: 35,
        Description: 'Document',
        Base: 0.0,
        DataType: 'string',
        StandardWidth: 'Automatic',
        Prefixes: {}
    },
    {
        UnitSystemID: 36,
        Description: 'American Wire Gauge',
        Base: 1.0,
        Unit: 'AWG',
        Symbol: ' AWG',
        DataType: 'double',
        StandardWidth: 'Automatic',
        Prefixes: {}
    },
    {
        UnitSystemID: 40,
        Description: 'Kelvin / Watt',
        Base: 1.0,
        Unit: 'kelvin per watt',
        Symbol: ' K/W',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'kelvin per watt',
                Symbol: ' K/W',
                SymbolHTML: '<u> K</u>/W',
                Letter: 'kK'
            }
        }
    },
    {
        UnitSystemID: 42,
        Description: 'Watt / Steradian',
        Base: 1.0,
        Unit: 'watt per steradian',
        Symbol: ' W/sr',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            0.001: {
                Factor: 0.001,
                Prefix: 'miliWatt/steradian',
                Symbol: ' mW/sr',
                SymbolHTML: ' <u>m</u>W/sr',
                Letter: '2W'
            },
            1: {
                Factor: 1.0,
                Prefix: 'watt per steradian',
                Symbol: 'W/sr',
                SymbolHTML: '<u>W</u>/sr',
                Letter: 'wW'
            }
        }
    },
    {
        UnitSystemID: 43,
        Description: 'Unitary',
        Base: 1.0,
        Unit: 'unitary',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'unit',
                Symbol: ' ',
                SymbolHTML: ' ',
                Letter: '_'
            }
        }
    },
    {
        UnitSystemID: 44,
        Description: 'Default',
        Base: 1.0,
        DataType: 'default',
        StandardWidth: 'Automatic',
        Prefixes: {}
    },
    {
        UnitSystemID: 45,
        Description: 'Information',
        Base: 1.0,
        Unit: 'byte',
        Symbol: ' B',
        Filterable: 'auto',
        DataType: 'integer',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'byte',
                Symbol: ' B',
                SymbolHTML: ' <u>B</u>',
                Letter: 'bB'
            },
            1024: {
                Factor: 1024.0,
                Prefix: 'kilobyte',
                Symbol: ' kB',
                SymbolHTML: ' <u>k</u>B',
                Letter: 'kK'
            },
            1048576: {
                Factor: 1048576.0,
                Prefix: 'megabyte',
                Symbol: ' MB',
                SymbolHTML: ' <u>M</u>B',
                Letter: 'mM'
            },
            1073741824: {
                Factor: 1073741824.0,
                Prefix: 'gigabyte',
                Symbol: ' GB',
                SymbolHTML: ' <u>G</u>B',
                Letter: 'gG'
            }
        }
    },
    {
        UnitSystemID: 46,
        Description: 'Data Rate',
        Base: 1.0,
        Unit: 'bit per second',
        Symbol: ' bit/s',
        Filterable: 'auto',
        DataType: 'integer',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'bit per second',
                Symbol: ' bps',
                SymbolHTML: ' <u>b</u>ps',
                Letter: 'bB'
            },
            1000: {
                Factor: 1000.0,
                Prefix: 'kilobit per second',
                Symbol: ' kbps',
                SymbolHTML: ' <u>k</u>bps',
                Letter: 'kK'
            },
            1000000: {
                Factor: 1000000.0,
                Prefix: 'megabit per second',
                Symbol: ' Mbps',
                SymbolHTML: ' <u>M</u>bps',
                Letter: 'mM'
            },
            1000000000: {
                Factor: 1000000000.0,
                Prefix: 'gigabit per second',
                Symbol: ' Gbps',
                SymbolHTML: ' <u>G</u>bps',
                Letter: 'gG'
            }
        }
    },
    {
        UnitSystemID: 47,
        Description: 'Power Level',
        Base: 1.0,
        Unit: 'decibel-milliwatts',
        Symbol: ' dBm',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'decibel-milliwatts',
                Symbol: ' dBm',
                SymbolHTML: ' <u>dBm</u>',
                Letter: 'db'
            }
        }
    },
    {
        UnitSystemID: 48,
        Description: 'Luminous Flux\r\n',
        Base: 1.0,
        Unit: 'lumen',
        Symbol: ' lm',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Automatic',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'Luminous Flux',
                Symbol: ' lm',
                SymbolHTML: ' <u>l</u>m',
                Letter: 'lL'
            }
        }
    },
    {
        UnitSystemID: 50,
        Description: 'Volume',
        Base: 1.0,
        Unit: 'cubic meter',
        Symbol: ' m³',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        DefaultFactor: 1E-09,
        Prefixes: {
            '1E-09': {
                Factor: 1E-09,
                Prefix: 'cubic milimeter',
                Symbol: ' mm³',
                SymbolHTML: ' <u>m</u>m³',
                Letter: 'mM'
            },
            '1E-06': {
                Factor: 1E-06,
                Prefix: 'cubic centimeter',
                Symbol: ' cm³',
                SymbolHTML: ' <u>c</u>m³',
                Letter: 'cC'
            }
        }
    },
    {
        UnitSystemID: 51,
        Description: 'Photon Flux',
        Base: 1.0,
        Unit: 'photons per second per unit area',
        Symbol: ' m⁻²s⁻¹',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'photons per second per unit area',
                Symbol: ' m⁻²s⁻¹',
                SymbolHTML: ' <u>m</u>⁻²s⁻¹',
                Letter: 'mM'
            }
        }
    },
    {
        UnitSystemID: 53,
        Description: 'Watt / m',
        Base: 1.0,
        Unit: 'Watt per meter',
        Symbol: ' W/m',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            '1E-15': {
                Factor: 1E-15,
                Prefix: 'microwatt / nm',
                Symbol: ' µW/nm',
                SymbolHTML: ' <u>µ</u>W/nm',
                Letter: 'uU'
            },
            '1E-12': {
                Factor: 1E-12,
                Prefix: 'miliwatt / nm',
                Symbol: ' mW/nm',
                SymbolHTML: ' <u>m</u>W/nm',
                Letter: 'mM'
            },
            '1E-09': {
                Factor: 1E-09,
                Prefix: 'watt / nm',
                Symbol: ' W/nm',
                SymbolHTML: ' <u>W</u>/nm',
                Letter: 'wW'
            }
        }
    },
    {
        UnitSystemID: 54,
        Description: 'Micromoles per second',
        Base: 1.0,
        Unit: 'Micromoles per second',
        Symbol: ' μmol/s',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'Micromoles per second',
                Symbol: ' μmol/s',
                SymbolHTML: ' <u>μ</u>mol/s',
                Letter: 'uU'
            }
        }
    },
    {
        UnitSystemID: 57,
        Description: 'Micromoles per joule',
        Base: 1.0,
        Unit: 'Micromoles per joule',
        Symbol: ' μmol/J',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'Micromoles per joule',
                Symbol: ' μmol/J',
                SymbolHTML: ' <u>μ</u>mol/J',
                Letter: 'uU'
            }
        }
    },
    {
        UnitSystemID: 58,
        Description: 'Diameter',
        Base: 1.0,
        Unit: 'American Wire Gauge',
        Symbol: 'AWG',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'American Wire Gauge',
                Symbol: ' AWG',
                SymbolHTML: ' <u>A</u>WG',
                Letter: 'aA'
            }
        }
    },
    {
        UnitSystemID: 59,
        Description: 'Gram',
        Base: 1.0,
        Unit: 'gram',
        Symbol: ' g',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {}
    },
    {
        UnitSystemID: 61,
        Description: 'Irradiance',
        Base: 1.0,
        Unit: 'mili watt per cubic centimeter',
        Symbol: ' mW/cm³',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {}
    },
    {
        UnitSystemID: 62,
        Description: 'MiliAmpere Hour',
        Base: 1.0,
        Unit: 'MiliAmpere Hour',
        Symbol: ' mAh',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'MiliAmpere Hour',
                Symbol: ' mAh',
                SymbolHTML: ' <u>m</u>Ah',
                Letter: 'mh'
            }
        }
    },
    {
        UnitSystemID: 64,
        Description: 'TimeDays',
        Base: 1.0,
        Unit: 'day',
        Symbol: ' days',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'days',
                Symbol: ' days',
                SymbolHTML: ' <u>d</u>ays',
                Letter: 'd'
            },
            365: {
                Factor: 365.0,
                Prefix: 'years',
                Symbol: ' years',
                SymbolHTML: ' <u>y</u>ears',
                Letter: 'y'
            }
        }
    },
    {
        UnitSystemID: 65,
        Description: 'Decibels Relative to Isotropic Radiator',
        Base: 1.0,
        Unit: 'decibel relative per isotropic radiator',
        Symbol: ' dBi',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'decibel relative per isotropic radiator',
                Symbol: ' dBi',
                SymbolHTML: ' <u>d</u>Bi',
                Letter: 'db'
            }
        }
    },
    {
        UnitSystemID: 66,
        Description: 'Kilowat / Kilograms',
        Base: 1.0,
        Unit: 'kilowat per kilogram',
        Symbol: '  kW/kg',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'kilowat per kilogram',
                Symbol: 'kW/Kg',
                SymbolHTML: ' <u>k</u>W/kg',
                Letter: 'kK'
            }
        }
    },
    {
        UnitSystemID: 67,
        Description: 'Kilojoules / Kilograms',
        Base: 1.0,
        Unit: 'Kilojoules per kilogram',
        Symbol: '  kJ/kg',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'Kilojoules per kilogram',
                Symbol: 'kJ/kg',
                SymbolHTML: ' <u>k</u>J/kg',
                Letter: 'kK'
            }
        }
    },
    {
        UnitSystemID: 68,
        Description: 'Magnitude',
        Base: 1.0,
        Unit: 'decibel',
        Symbol: ' dB',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'decibel',
                Symbol: 'dB',
                SymbolHTML: ' <u>d</u>B',
                Letter: 'dD'
            }
        }
    },
    {
        UnitSystemID: 69,
        Description: 'Grade',
        Base: 1.0,
        Unit: 'degree',
        Symbol: 'º',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'grades',
                Symbol: 'º',
                SymbolHTML: 'º',
                Letter: 'gG'
            }
        }
    },
    {
        UnitSystemID: 70,
        Description: 'Multiplier',
        Base: 1.0,
        Unit: 'multiplier',
        Symbol: ' x',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            1: {
                Factor: 1.0,
                Prefix: 'multiplier',
                Symbol: ' x',
                SymbolHTML: ' x',
                Letter: 'xX'
            }
        }
    },
    {
        UnitSystemID: 73,
        Description: 'Newton / cm',
        Base: 1.0,
        Unit: 'Newton per centimeter',
        Symbol: ' N/cm',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            0.01: {
                Factor: 0.01,
                Prefix: 'Newton/centimeter',
                Symbol: ' N/cm',
                SymbolHTML: ' <u>N</u>/cm',
                Letter: 'NC'
            }
        }
    },
    {
        UnitSystemID: 74,
        Description: 'Watt / mK',
        Base: 1.0,
        Unit: 'Watt per microKelvin',
        Symbol: ' W/mK',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {
            0.001: {
                Factor: 0.001,
                Prefix: 'Watt/microKelvin',
                Symbol: ' W/mK',
                SymbolHTML: ' <u>W</u>/mk',
                Letter: 'WK'
            }
        }
    },
    {
        UnitSystemID: 75,
        Description: 'Numeric_Double',
        Base: 1.0,
        Unit: 'numeric magnitude double',
        Filterable: 'auto',
        DataType: 'double',
        StandardWidth: 'Small',
        Prefixes: {}
    }
] as UnitSystemDto[];
