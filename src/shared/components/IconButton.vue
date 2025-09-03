<script setup lang="ts">
interface Props {
  icon: string;
  variant?: 'text' | 'outlined' | 'flat' | 'elevated' | 'tonal' | 'plain';
  size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large';
  ariaLabel?: string;
}

withDefaults(defineProps<Props>(), {
  variant: 'text',
  size: 'small',
});

defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <v-btn
    :icon="true"
    :variant="variant"
    :size="size"
    :aria-label="ariaLabel"
    @click="$emit('click', $event)"
  >
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>
