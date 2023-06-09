<template>
    <div class="p-8">
        <ArrayHandler
            v-model:sort-numeric="sortNumericValue"
            v-model:filter-sign="filterSignValue"
            v-model:array="array"
        />
        <ArrayViewer
            v-if="array.length"
            label="title"
            :array="array"
        />
        <div v-else>
            Нет данных
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';

import ArrayViewer from '@/modules/ArrayViewer/index.vue';
import ArrayHandler from '@/modules/ArrayHandler/index.vue';
import { TSign as ArrayHandlerTSign } from '@/modules/ArrayHandler/types/sign';

import ArrayService from '@/services/ArrayService';


// SORT

const sortNumericValue = ref('');
const filterSignValue: Ref<ArrayHandlerTSign | ''> = ref('');


// ARRAY

const array = ref(ArrayService.sample.fetch().raw());
</script>
