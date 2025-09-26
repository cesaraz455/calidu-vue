<script setup lang="ts">
import { ref } from 'vue';
import CaliduIcon from '@shared/components/CaliduIcon.vue';
import IconButton from '@shared/components/IconButton.vue';
import { useNavigation } from '@shared/composables/useNavigation';
import navigationItemsData from '../data/navigationItems.json';
import type { NavigationItem } from '@shared/types/navigation';

const rail = ref<boolean>(false);
const { isActiveRoute } = useNavigation();

const navigationItems: NavigationItem[] = navigationItemsData;

const MENU_LABELS = {
  COLLAPSE: 'Colapsar menú',
  EXPAND: 'Expandir menú',
} as const;

const MENU_ICON_SIZE = 19;
</script>

<template>
  <v-navigation-drawer
    permanent
    :rail="rail"
    :rail-width="75"
    @click="rail = false"
    :elevation="3"
    :border="0"
  >
    <v-list-item class="px-5 py-3">
      <template v-slot:prepend>
        <IconButton
          v-if="rail"
          icon="mdi-menu"
          @click.stop="rail = !rail"
          :aria-label="rail ? MENU_LABELS.COLLAPSE : MENU_LABELS.EXPAND"
          :icon-size="MENU_ICON_SIZE"
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
          :aria-label="rail ? MENU_LABELS.COLLAPSE : MENU_LABELS.EXPAND"
          :icon-size="MENU_ICON_SIZE"
        />
      </template>
    </v-list-item>

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in navigationItems"
        :key="item.id"
        :to="item.href"
        :active="isActiveRoute(item.href)"
        :prepend-icon="item.icon"
        :title="item.labelDesktop"
        rounded="e-xl"
        class="mx-3 mb-1"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
:deep(.v-list-item--active) {
  .v-icon,
  .v-list-item-title {
    color: rgb(var(--v-theme-primary));
  }
}

.v-navigation-drawer {
  :deep(.v-list-item__overlay) {
    background: rgba(var(--v-theme-primary), 0.9);
  }
}

.v-navigation-drawer--rail {
  :deep(.v-list-item__overlay) {
    background: transparent;
  }
}
</style>
