<template>
    <div
        ref="root"
        :class="[classes.root, classes.height]"
    >
        <VueSelect
            v-model="value"
            v-click-outside="close"
            :class="classes.select"
            ref="select"
            label="title"
            :options="fullOptions"
            :placeholder="placeholder"
            :reduce="(option) => option.id"
            :clearable="false"
            :close-on-select="true"
            :searchable="searchable"
            @open="onOpen"
        >
            <template #no-options>
                {{ notFound }}
            </template>
            <template #open-indicator>
                <span :class="classes.openIndicator"></span>
            </template>
            <template #selected-option="{ id, title, icon }">
                <slot name="selected-option" v-bind="{ id, title, icon }">
                    <div :class="[classes.selectedOption, classes.height, classes.padding]">
                        <BaseIcon
                            v-if="icon"
                            :class="classes.optionIcon"
                            :name="icon"
                            width="24"
                        />
                        <span
                            v-if="title"
                            :class="classes.title"
                            v-html="title"
                        >
                        </span>
                        <BaseIcon
                            :class="[classes.arrowIcon, {
                               'rotate-180' :select?.open
                            }]"
                            name="chevron-down"
                            width="8"
                            height="5"
                        />
                    </div>
                </slot>
            </template>
            <template #option="{ title, id, icon }">
                <slot name="option" v-bind="{ title, id, icon }">
                    <div
                        :class="[
                            classes.option,
                            classes.padding,
                            {
                                'hidden': id === '' || (id === null && (value === '' || value === null || value === undefined))
                            }
                         ]"
                    >
                        <BaseIcon
                            v-if="icon"
                            :class="classes.optionIcon"
                            :name="icon"
                            width="24"
                        />
                        <span v-html="title" />
                    </div>
                </slot>
            </template>
            <template #search="{ attributes, events }">
                <div :class="classes.searchWrapper">
                    <input
                        :class="[classes.search, classes.height, classes.padding]"
                        v-bind="attributes"
                        v-on="events"
                    >
                </div>
            </template>
        </VueSelect>
    </div>
</template>

<script lang="ts" setup>
/*
*
*
*  Компонент старый взял, времени переписать не было
*
*
* */
import { computed, nextTick, ref, watch } from 'vue';
import VueSelect from 'vue-select';

import BaseIcon from '@/UI/BaseIcon/BaseIcon.vue';
import makeClasses from '@/helpers/makeClasses';

import { SelectOption, Sizes, Themes } from './types';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    modelValue: string | number | null
    placeholder?: string
    notFound?: string
    searchable?: boolean
    title?: string
    options: SelectOption[]
    size?: Sizes
    theme?: Themes
    themeSettings?: ThemeSettings<'root' | 'height'>
}

interface IEmits {
    (e: 'update:modelValue', value: SelectOption): void
}

const props = withDefaults(defineProps<IProps>(), {
    notFound: 'No data',
    size: 'md',
    theme: 'white'
});

const emit = defineEmits<IEmits>();


// META:SELECT

const select = ref<InstanceType<typeof VueSelect> | null>(null);

function close(): void {
    select.value.open = false;
}


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings' | 'size' | 'searchable' | 'theme'>{
    isOpen: boolean
    hasValue: boolean
}


const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ size, isOpen, theme }) => [
        'tracking-[0.04px]',
        {
            'md:text-xxs': size === 'md',
            'z-50 relative': isOpen,

            'text-gray-500': theme === 'white',
            'text-gray-600': theme === 'primary'
        }
    ],
    select: ({ theme, size, hasValue }) => [
        'rounded-[5px] overflow-hidden cursor-pointer relative',
        {
            'border border-gray-100 shadow-[0px_4px_24px_rgba(108,108,125,.08)]': theme === 'white',
            'bg-primary-100': theme === 'primary',

            'min-h-[38px]': size === 'md',
            'min-w-[100px]': size === 'md' && !hasValue
        }
    ],
    openIndicator: 'hidden',
    selectedOption: ({ theme }) => [
        'transition-fast flex items-center',
        {
            'bg-white hover:bg-surface-100': theme === 'white',
            'bg-primary-100 hover:bg-primary-200': theme === 'primary'
        }
    ],
    arrowIcon: () => ([
        'ml-2.5 text-380'
    ]),
    option: ({ theme }) => [
        'py-2 transition-fast flex items-center',
        {
            'bg-white hover:bg-surface-100': theme === 'white',
            'bg-primary-100 hover:bg-primary-200': theme === 'primary'
        }
    ],
    search: 'absolute top-0 left-0 w-10/12 opacity-0 focus:opacity-100',
    searchWrapper: ({ searchable }) => [
        {
            'hidden': !searchable
        }
    ],
    optionIcon: 'mr-2',
    placeholder: () => [
        'text-200'
    ],
    height: ({ size, themeSettings }) => [
        themeSettings?.height || {
            'h-[38px] sm:h-[30px]': size === 'md',
        }
    ],
    padding: ({ size }) => [
        {
            'px-4 sm:px-3': size === 'md'
        }
    ],
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        size: props.size,
        hasValue: !!value.value,
        isOpen: !!select?.value?.open,
        searchable: props.searchable,
        theme: props.theme
    });
});


// VALUE

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: SelectOption) {
        emit('update:modelValue', value)
    }
});


// OPTIONS

const fullOptions = computed(() => !props.title ? props.options : [{ id: '', title: props.title }, ...props.options]);

watch(() => value.value, (val) =>{
    if (val === null) {
        value.value = '';
    }
});


// OPEN

const root = ref<HTMLElement>();

async function onOpen() {
    await nextTick();
    cropHeight();
}

function cropHeight() {
    if (!root.value) {
        return;
    }

    const list = root.value.querySelector('.vs__dropdown-menu') as HTMLElement;

    if (!list) {
        return;
    }

    const listCoords = list.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const offset = listCoords.bottom - windowHeight;
    const listHeight = list.offsetHeight;
    const newListHeight = listHeight - offset - 20;

    if (newListHeight > 0) {
        list.style.maxHeight = newListHeight + 'px';
    }
}
</script>
<style lang="postcss">

    .v-select {

        .vs__dropdown-menu {
            overflow-y: auto;
            overflow-x: hidden;
        }

        .vs__dropdown-toggle {
        }

        .vs__selected-options {
        }



        .vs__search {
        }

        .vs__actions {
        }

        .vs__dropdown-option {
        }

        .vs__dropdown-option--selected {
        }

        .vs__selected {
        }
        .vs__deselect {
        }

        input::-ms-clear,
        input::-ms-reveal {
        }
        input::-webkit-search-decoration,
        input::-webkit-search-cancel-button,
        input::-webkit-search-results-button,
        input::-webkit-search-results-decoration {
            display: none;
        }
    }
    .v-select.vs--open {
        .svg-icon {
        }
    }
    .v-select.vs--open.vs--searchable,
    .v-select.vs--fill:not(.vs--open) {
        .vs__search {
        }
    }
    .v-select.vs--loading {
        .vs__clear,
        .vs__open-indicator {
        }
    }

    .vs--multiple {
        .vs__selected {
            display: flex;
            flex-grow: 0;
        }
        .vs__deselect {
            display: block;
            margin-left: 8px;
        }
    }
</style>
