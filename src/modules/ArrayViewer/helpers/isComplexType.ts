import { getType } from '../dependencies';

function isComplexType(value: any) {
    return ['Set', 'Map', 'Object', 'Array'].includes(getType(value));
}

export default isComplexType;
