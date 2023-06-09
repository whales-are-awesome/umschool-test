<template>
    <RouterView class="w-full" :key="$route.path + viewKeyCounter" />
    <Layers />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Layers from '@/components/Layers/Layers.vue';
import { store } from '@/store';
import useLayer from '@/hooks/useLayer';


// META

const viewKeyCounter = computed(() => store.state.app.viewKey);

useLayer();
</script>
