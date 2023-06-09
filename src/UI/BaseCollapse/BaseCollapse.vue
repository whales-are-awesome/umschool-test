<template>
    <div
        v-if="$slots.header"
        :class="classes.header"
        @click="isShown = !isShown"
    >
        <slot name="header"></slot>
        <BaseIcon
            :class="classes.chevron"
            name="chevron-down"
            width="8"
            height="5"
        />
    </div>
    <transition
        enter-active-class="enter-active"
        leave-active-class="leave-active"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
    >
        <div v-show="isShown">
            <slot></slot>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseIcon from '@/UI/BaseIcon/BaseIcon.vue'
import ThemeSettings from '@/types/themeSettings';
import makeClasses from '@/helpers/makeClasses';


// META

interface IProps {
    themeSettings?: ThemeSettings<''>
}

const props = withDefaults(defineProps<IProps>(), {
});


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{
    isShown: boolean
}

const useClasses = makeClasses<IThemeProps>(() => ({
    header: 'flex items-center cursor-pointer',
    controller: 'mt-4',
    chevron: ({ isShown }) => [
        'ml-2',
        {
            'rotate-180': isShown
        }
    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        isShown: isShown.value
    });
});


// VALUE

const isShown = ref(false);


// HOOKS

function beforeEnter(element: HTMLElement) {
    requestAnimationFrame(() => {
        if (!element.style.height) {
            element.style.height = '0px';
        }

        element.style.display = '';
    });
}

function enter(element: HTMLElement) {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            element.style.height = `${ element.scrollHeight }px`;
        });
    });
}

function afterEnter(element: HTMLElement) {
    element.style.height = '';
}

function beforeLeave(element: HTMLElement) {
    requestAnimationFrame(() => {
        if (!element.style.height) {
            element.style.height = `${ element.offsetHeight }px`;
        }
    });
}

function leave(element: HTMLElement) {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            element.style.height = '0px';
        });
    });
}

function afterLeave(element: HTMLElement) {
    element.style.height = '';
}
</script>

<style scoped>
.enter-active,
.leave-active {
    @apply transition-fast overflow-hidden;
}
</style>
