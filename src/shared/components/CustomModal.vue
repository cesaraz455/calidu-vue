<script setup lang="ts">
interface CustomModalProps {
  modelValue: boolean;
  title: string;
  maxWidth?: string | number;
  scrollable?: boolean;
}

interface CustomModalEmits {
  (e: 'update:modelValue', value: boolean): void;
}

withDefaults(defineProps<CustomModalProps>(), {
  maxWidth: 400,
  scrollable: true,
});

defineEmits<CustomModalEmits>();
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :max-width="maxWidth"
    :scrollable="scrollable"
  >
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <span>{{ title }}</span>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="$emit('update:modelValue', false)"
        />
      </v-card-title>

      <v-divider />

      <v-card-text class="pa-0" style="max-height: 400px">
        <slot />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="text" @click="$emit('update:modelValue', false)">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-card-title {
  font-weight: 600;
}
</style>
