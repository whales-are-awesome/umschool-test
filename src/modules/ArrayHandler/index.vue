<template>
    <div>
        <div :class="classes.root">
            <SelectField
                v-for="(item, index) in items"
                :key="index"
                :options="item.items"
                :title="item.title"
                :model-value="item.value"
                @update:model-value="item.update"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { TArrayOfRecords, ThemeSettings } from './dependencies'

import SelectField from '@/UI/SelectField/SelectField.vue';

import { TSign } from './types/sign';

import useSort from './hooks/useSort';
import useClasses from './hooks/useClasses';
import useItems from './hooks/useItems';


// PROPS

interface IProps {
    array: TArrayOfRecords
    sortNumeric: string
    filterSign?: TSign | ''
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {
});


// EMITS

interface IEmits {
    (e: 'update:array', value: IProps['array']): void
    (e: 'update:sortNumeric', value: IProps['sortNumeric']): void
    (e: 'update:filterSign', value: IProps['filterSign']): void
}

const emit = defineEmits<IEmits>();


// ARRAY LOCAL

const arrayLocal = ref([...props.array]);


// META

export interface IMeta  {
    props: typeof props
    emit: typeof emit
    arrayLocal: typeof arrayLocal
}

const meta: IMeta = {
    props,
    emit,
    arrayLocal
};


// HOOKS

const classes = useClasses(meta);
const items = useItems(meta);
useSort(meta);
</script>
