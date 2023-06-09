import { computed } from 'vue';
import { normalizeArray } from '../helpers/arrayNormalizer';

// @ts-ignore
import { IMeta } from '../index.vue'


export default function(meta: IMeta) {
    const { props } = meta;

    return computed(() => {
        return normalizeArray(props.array);
    });
}
