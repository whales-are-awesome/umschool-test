import { computed, } from 'vue';
import getNumericFields from '../helpers/getNumericFields';
import { Sign } from '../types/sign';

//@ts-ignore
import { IMeta } from '../index.vue'

export default function (context: IMeta) {
    const { props, arrayLocal, emit  } = context;

    return computed(() => [
        {
            title: 'Сортировать по',
            value: props.sortNumeric,
            items: [
                { title: 'Без сортировки', id: null },
                ...getNumericFields(arrayLocal.value).map(item => ({ id: item, title: item }))
            ],
            update: (value: IMeta['props']['sortNumeric']) => emit('update:sortNumeric', value),
            isVisible: () => true
        },
        {
            title: 'Показать',
            value: props.filterSign,
            items: [
                { title: 'Все', id: null },
                { title: 'Положительные', id: Sign.Positive },
                { title: 'Отрицательные', id: Sign.Negative },
            ],
            update: (value: IMeta['props']['filterSign']) => emit('update:filterSign', value),
            isVisible: () => props.sortNumeric
        }
    ].filter(item => item.value !== undefined && item.isVisible()));
}
