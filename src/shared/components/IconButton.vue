<script setup lang="ts">
import type { VBtn, VIcon } from 'vuetify/components';

interface Props {
  icon: string;
  variant?: VBtn['$props']['variant'];
  btnSize?: VBtn['$props']['size'];
  iconSize?: VIcon['$props']['size'];
  ariaLabel?: string;
}

withDefaults(defineProps<Props>(), {
  variant: 'text',
  btnSize: 'small',
  iconSize: 'small',
});

defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <v-btn
    :icon="true"
    :variant="variant"
    :size="btnSize"
    :aria-label="ariaLabel"
    @click="$emit('click', $event)"
  >
    <v-icon :size="iconSize">{{ icon }}</v-icon>
  </v-btn>
</template>
