import { Sign } from '../types/sign';
import { IArraySorter, IArraySorterWithKey, IArraySorterWithSign } from './types';


class FilterBySign implements IArraySorter, IArraySorterWithKey, IArraySorterWithSign  {
    constructor(
        public array: IArraySorter['array'] = [],
        public key?: IArraySorterWithKey['key'],
        public sign?: IArraySorterWithSign['sign']
    ) {}

    sort() {
        if (!this.key || !this.sign) {
            return this.array;
        }

        return this.array = this.array.filter(item => this.sign === Sign.Positive ? item[this.key!] > 0 : item[this.key!] < 0);
    }
}


export default FilterBySign;
