import { Injectable } from '@angular/core';
import { UnitSystemDto, UnitSystemPrefix } from './units-api.dto';
import { unitSystemData } from './units-api.fake';


export type UnitSystemDescription =
    'Frequency' |
    'Voltage' |
    'Current' |
    'Attenuation' |
    'Impedance' |
    'Temperature (ºC)';

export class UnitSystemApiHelper {

    static getByDescription(description: UnitSystemDescription): UnitSystemDto {
        return unitSystemData.find(x => x.Description === description);
    }

    static getOptimalMagnitude(value: number, unitSystemDto: UnitSystemDto): UnitSystemPrefix {

        let result = unitSystemDto.Prefixes[unitSystemDto.Base];

        if (value !== 0) {
            let magnitudeBestMatch = unitSystemDto.Prefixes[unitSystemDto.Base];
            for (const p in unitSystemDto.Prefixes) {
                if (unitSystemDto.Prefixes.hasOwnProperty(p)) {
                    if (value < unitSystemDto.Prefixes[p].Factor) {
                        result = magnitudeBestMatch;
                    }
                    magnitudeBestMatch = unitSystemDto.Prefixes[p];
                }
            }
        }
        return result;
    }
}
