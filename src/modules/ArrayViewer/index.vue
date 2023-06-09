<template>
    <div>
        <div
            v-for="(item, index) in normalizedArray"
            :key="index"
            :class="classes.root"
        >
            <BaseCollapse>
                <template #header>
                    {{ item[label] || index }}
                </template>
                <BaseController
                    :class="classes.controller"
                    :object="item"
                />
            </BaseCollapse>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TArrayOfRecords, ThemeSettings } from './dependencies';

import BaseController from './components/BaseController.vue';
import BaseCollapse from '@/UI/BaseCollapse/BaseCollapse.vue';

import useClasses from './hooks/useClasses';
import useArray from './hooks/useArray';


// PROPS

interface IProps {
    array: TArrayOfRecords
    label: string
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {
});


// META

interface IMeta {
    props: typeof props
}

const meta: IMeta = {
    props
};


// HOOKS

const classes = useClasses(meta);
const normalizedArray = useArray(meta);
</script>
