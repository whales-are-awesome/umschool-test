<template>
    <div :class="classes.root">
        <span>{{ keyValue }}</span>: <span>{{ value }}</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { makeClasses, ThemeSettings } from '../dependencies';


// META

interface IProps {
    keyValue: any
    value: any
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {
});


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{

}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'bg-primary-500 bg-opacity-5 p-2 rounded-xl inline-block'
    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});
</script>

<style scoped>
</style>
