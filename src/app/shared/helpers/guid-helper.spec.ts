import { GuidHelper } from './guid-helper';

describe('Guid Helper', () => {

    const emptyGuid = '00000000-0000-0000-0000-000000000000';
    const validGuid = '789ed557-7bc0-38a9-54c8-6d4932424ed3';

    it('should contain an Empty Guid', () => {
        expect(GuidHelper.EMPTY).toEqual(emptyGuid);
    });

    it('should validate isEmpty', () => {
        expect(new GuidHelper(emptyGuid).isEmpty()).toEqual(true);
    });

    it('should validate Guid when using "Create" method', () => {
        expect(GuidHelper.isGuid(GuidHelper.create().value)).toEqual(true);
    });

    it('should validate Guid when using "Raw" method', () => {
        expect(GuidHelper.isGuid(GuidHelper.raw())).toEqual(true);
    });

    it('should be able to create GuidHelper from constructor using a valid Guid', () => {
        expect(new GuidHelper(validGuid).toString()).toEqual(validGuid);
    });

    it('should return Empty GuidHelper when creating GuidHelper from constructor using a NOT valid Guid', () => {
        expect(new GuidHelper('invalidGuid').toString()).toEqual(emptyGuid);
    });

    it('should throw exception when trying to create GuidHelperfrom constructor without Guid value ', () => {
        try {
            expect(new GuidHelper(undefined).toString()).toEqual('At this point an exception should occur');
        } catch (e) {
            expect(e.message.includes('Invalid argument')).toEqual(true);
        }
    });

    it('should compare guid values by using "equals" method', () => {
        expect(new GuidHelper(validGuid).equals(validGuid)).toEqual(true);
    });

    it('should be able to  compare guid values by using "equals" method', () => {
        expect(new GuidHelper(validGuid).equals(validGuid)).toEqual(true);
    });

});
