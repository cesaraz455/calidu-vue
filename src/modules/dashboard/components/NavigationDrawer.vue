<script setup lang="ts">
import { ref } from 'vue';
import CaliduIcon from '@shared/components/CaliduIcon.vue';
import IconButton from '@shared/components/IconButton.vue';
import { useNavigation } from '@shared/composables/useNavigation';
import navigationItemsData from '../data/navigationItems.json';
import type { NavigationItem } from '@shared/types/navigation';

const rail = ref<boolean>(true);
const { isActiveRoute } = useNavigation();

const navigationItems: NavigationItem[] = navigationItemsData;
</script>

<template>
  <v-navigation-drawer
    permanent
    :rail="rail"
    :rail-width="75"
    color="grey-darken-3"
    @click="rail = false"
    theme="dark"
  >
    <v-list-item class="px-5 py-3">
      <template v-slot:prepend>
        <IconButton
          v-if="rail"
          icon="mdi-menu"
          @click.stop="rail = !rail"
          :aria-label="rail ? 'Colapsar menú' : 'Expandir menú'"
        />
        <div class="d-flex align-center" v-else>
          <CaliduIcon size="md" class="me-3" />
          <span class="text-h6 font-weight-medium">Calidú</span>
        </div>
      </template>
      <template v-slot:append>
        <IconButton
          icon="mdi-menu"
          @click.stop="rail = !rail"
          :aria-label="rail ? 'Colapsar menú' : 'Expandir menú'"
        />
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in navigationItems"
        :key="item.id"
        :to="item.href"
        :active="isActiveRoute(item.href)"
        :prepend-icon="item.icon"
        :title="item.label"
        rounded="e-xl"
        class="mx-3 mb-1"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped></style>
