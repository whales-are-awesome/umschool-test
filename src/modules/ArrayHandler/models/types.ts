import { TArrayOfRecords } from '../dependencies';
import { TSign } from '../types/sign';

interface IArraySorter {
    array: TArrayOfRecords
    sort(): TArrayOfRecords
}

interface IArraySorterWithKey {
    key?: string
}

interface IArraySorterWithSign {
    sign?: TSign
}

export {
    IArraySorter,
    IArraySorterWithKey,
    IArraySorterWithSign
}
