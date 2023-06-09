import SortByNumeric from './SortByNumeric'
import FilterBySign from './FilterBySign'

import { IArraySorter, IArraySorterWithKey, IArraySorterWithSign } from './types';


class Handler {
    constructor(
        public array: IArraySorter['array'] = [],
        public key?: IArraySorterWithKey['key'],
        public sign?: IArraySorterWithSign['sign']
    ) {}

    handleAll() {
        this.array = new SortByNumeric([...this.array], this.key).sort();
        this.array = new FilterBySign([...this.array], this.key, this.sign).sort();
    }
}

export default Handler;
