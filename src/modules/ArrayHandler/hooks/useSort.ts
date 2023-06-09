import { computed, watch } from 'vue';
import { isEqual } from 'lodash';
import Handler from '../models/Handler';

//@ts-ignore
import { IMeta } from '../index.vue'

export default function (context: IMeta) {
    const { props, arrayLocal, emit  } = context;

    const resultArray = computed(() => {
        const result = new Handler(
            [...arrayLocal.value],
            props.sortNumeric,
            props.filterSign || undefined
        );

        result.handleAll();

        return result.array;
    });

    const resultArrayCached = computed(() => JSON.stringify(resultArray.value));

    watch(() => resultArrayCached.value, () => emit('update:array', resultArray.value));

    watch(() => props.array, () => {
        if (!isEqual(props.array, resultArray.value)) {
            arrayLocal.value = [...props.array];
        }
    });
}
