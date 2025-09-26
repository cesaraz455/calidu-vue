<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: boolean;
  title?: string;
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  height: '50vh',
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const internalValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});
</script>

<template>
  <v-bottom-sheet v-model="internalValue" :height="props.height">
    <div v-if="props.title" class="px-4 py-3 border-b">
      <h3 class="text-h6 font-weight-medium">{{ props.title }}</h3>
    </div>

    <div class="px-4 pb-4 overflow-y-auto">
      <slot />
    </div>
  </v-bottom-sheet>
</template>

<style>
.v-bottom-sheet__content {
  background-color: white;
}
</style>
