<script setup lang="ts">
import { useNavigation } from '@shared/composables/useNavigation';
import navigationItemsData from '../data/navigationItems.json';
import type { NavigationItem } from '@shared/types/navigation';

const { isActiveRoute } = useNavigation();
const navigationItems: NavigationItem[] = navigationItemsData;
</script>

<template>
  <nav>
    <v-bottom-navigation grow :app="false" bg-color="surface">
      <v-btn
        v-for="item in navigationItems"
        :key="`mobile-${item.id}`"
        :to="item.href"
        :value="item.href"
        :active="isActiveRoute(item.href)"
        size="small"
      >
        <v-icon>{{ item.icon }}</v-icon>
        <span class="text-caption">{{ item.labelMobile }}</span>
      </v-btn>
    </v-bottom-navigation>
  </nav>
</template>

<style lang="scss" scoped></style>
