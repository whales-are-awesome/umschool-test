import { cloneDeep } from 'lodash';
import { getType } from '../dependencies';
import { TArrayRecord, TArrayOfRecords } from '@/types/arrayOfRecords';

function normalizeArray(_array: TArrayOfRecords): TArrayOfRecords {
    const array = cloneDeep(_array) as Record<string, any>[];

    return array.map(modifyObject);
}

function modifyObject(obj: TArrayRecord) {
    const result: TArrayRecord = {};

    Object.entries(obj).map(([key, value]) => {
        result[key] = getField(value);
    });

    return result;
}

function getField(value: any): any {
    /*
        строил, чтобы поправить вывод Map и WeakMap, WeakSet, но последние, судя по всему, не даются)
    * */
    if (getType(value) === 'Object') {
        return modifyObject(value);
    } else if (getType(value) === 'Array') {
        return [...value].map(item => getField(item));
    } else if (getType(value) === 'Set') {
        return [...value].map(item => getField(item));
    } else if (getType(value) === 'Map') {
        return modifyObject(Object.fromEntries(value));
    } else {
        return value;
    }
}

export {
    normalizeArray
};
