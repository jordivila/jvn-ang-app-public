export interface UnitSystemDto {
    UnitSystemID: number;
    Description: string;
    Base: number;
    Unit: string;
    Symbol: string;
    Filterable: string;
    DataType: string;
    StandardWidth: string;
    DefaultFactor: number;
    Prefixes: UnitSystemPrefixes;
}

export interface UnitSystemPrefixes {
    [key: string]: UnitSystemPrefix;
}

export interface UnitSystemPrefix {
    Factor: number;
    Prefix: string;
    Symbol: string;
    SymbolHTML: string;
    Letter: string;
}
