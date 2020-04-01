import { Guid } from './guid';

export class GuidHelper {

    static EMPTY = '00000000-0000-0000-0000-000000000000';
    static validator = new RegExp('^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$', 'i');

    public value: Guid;


    static isGuid(value) { return value && (value instanceof GuidHelper || GuidHelper.validator.test(value.toString())); }
    static create() {
        // tslint:disable-next-line
        return new GuidHelper([GuidHelper.gen(2), GuidHelper.gen(1), GuidHelper.gen(1), GuidHelper.gen(1), GuidHelper.gen(3)].join('-'));
    }
    static raw() { return [GuidHelper.gen(2), GuidHelper.gen(1), GuidHelper.gen(1), GuidHelper.gen(1), GuidHelper.gen(3)].join('-'); }
    static gen(count) {
        let out = '';
        for (let i = 0; i < count; i++) {
            // tslint:disable-next-line
            out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return out;
    }

    constructor(guid) {
        if (!guid) { throw new TypeError('Invalid argument; "value" has no value.'); }

        this.value = GuidHelper.EMPTY;

        if (guid && Object.prototype.toString.call(guid) === '[object String]' && GuidHelper.isGuid(guid)) {
            this.value = guid;
        }
    }

    equals(other) {
        // Comparing string `value` against provided `guid` will auto-call
        // toString on `guid` for comparison
        return GuidHelper.isGuid(other) && this.value === other;
    }

    isEmpty() {
        return this.value === GuidHelper.EMPTY;
    }

    toString() {
        return this.value;
    }

}
