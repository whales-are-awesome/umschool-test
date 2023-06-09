import { IArraySorter, IArraySorterWithKey } from './types';

class SortByNumeric implements IArraySorter, IArraySorterWithKey {
    constructor(
        public array: IArraySorter['array'] = [],
        public key?: IArraySorterWithKey['key']
    ) {}

    sort() {
        if (!this.key) {
            return this.array;
        }

        return this.array.sort((a, b) =>  {
            const left = a[this.key!] !== undefined ? a[this.key!] : -Infinity;
            const right = b[this.key!] !== undefined ? b[this.key!] : -Infinity;

            return right - left;
        });
    }
}

export default SortByNumeric;
