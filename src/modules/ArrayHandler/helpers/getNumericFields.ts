import { TArrayOfRecords } from '../dependencies';

function getNumericFields(arr: TArrayOfRecords) {
    const excluded: string[] = [];
    let fields: string[] = [];

    arr.forEach(item => {
        Object.entries(item).forEach(([key, value]) => {
            if (typeof value === 'number' && !fields.includes(key) && !excluded.includes(key)) {
                fields.push(key);
            } else if (typeof value !== 'number' && !excluded.includes(key)) {
                excluded.push(key);

                if (fields.includes(key)) {
                    fields = fields.filter(item => item !== key);
                }
            }
        });
    });

    return fields;
}

export default getNumericFields;
