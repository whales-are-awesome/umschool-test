<template>
    <div :class="classes.root">
        <div
            v-for="(item, key) in object"
            :key="key"
        >
            <ItemSimple
                v-if="!isComplexType(item)"
                :value="item"
                :key-value="key"
            />
            <div
                v-else
                :class="classes.controllerWrapper"
            >
                {{ key }}: <BaseController
                    :object="item"
                    :class="classes.controller"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import ItemSimple from './ItemSimple.vue';

import { makeClasses, ThemeSettings } from '../dependencies';

import isComplexType from '../helpers/isComplexType'


// META

interface IProps {
    object: any[] | object
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {
});


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{

}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'space-y-4'
    ],
    controllerWrapper: 'inline-flex bg-primary-500 bg-opacity-5 p-2 rounded-xl',
    controller: 'pl-4'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});
</script>

<style scoped>
</style>
