<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  HomeIcon,
  ChartBarIcon,
  QrCodeIcon,
  PresentationChartLineIcon,
  UserIcon,
  Bars3Icon,
} from '@heroicons/vue/24/solid';
import CaliduIcon from '@shared/components/CaliduIcon.vue';
import navigationItemsData from '../data/navigationItems.json';
import type { NavigationItem } from '@shared/types/navigation';

const route = useRoute();
const isCollapsed = ref<boolean>(false);

const navigationItems: NavigationItem[] = navigationItemsData;

const iconComponents = {
  HomeIcon,
  ChartBarIcon,
  QrCodeIcon,
  PresentationChartLineIcon,
  UserIcon,
};

const getIconComponent = (iconName: string) => {
  return iconComponents[iconName as keyof typeof iconComponents] || HomeIcon;
};

const isActiveRoute = (href: string): boolean => {
  return route.path === href || route.path.startsWith(href + '/');
};

const toggleSidebar = (): void => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<template>
  <nav class="navigation">
    <!-- Desktop menu -->
    <aside
      :class="['navigation__sidebar', { 'navigation__sidebar--collapsed': isCollapsed }]"
      class="navigation__sidebar"
    >
      <div class="navigation__header">
        <div v-if="!isCollapsed" class="navigation__logo">
          <CaliduIcon size="lg" class="navigation__logo-icon" />
          <span class="navigation__logo-text">Calidú</span>
        </div>
        <button
          class="navigation__toggle"
          :class="{ 'navigation__toggle--centered': isCollapsed }"
          @click="toggleSidebar"
          :aria-label="isCollapsed ? 'Expandir menú' : 'Colapsar menú'"
        >
          <Bars3Icon class="navigation__toggle-icon" />
        </button>
      </div>

      <ul class="navigation__list">
        <li v-for="item in navigationItems" :key="item.id" class="navigation__item">
          <router-link
            :to="item.href"
            :class="['navigation__link', { 'navigation__link--active': isActiveRoute(item.href) }]"
          >
            <component :is="getIconComponent(item.icon)" class="navigation__icon" />
            <span v-if="!isCollapsed" class="navigation__text">
              {{ item.label }}
            </span>
          </router-link>
        </li>
      </ul>
    </aside>

    <!-- Mobile menu -->
    <div class="navigation__mobile">
      <ul class="navigation__mobile-list">
        <li
          v-for="item in navigationItems"
          :key="`mobile-${item.id}`"
          class="navigation__mobile-item"
        >
          <router-link
            :to="item.href"
            :class="[
              'navigation__mobile-link',
              { 'navigation__mobile-link--active': isActiveRoute(item.href) },
            ]"
          >
            <component :is="getIconComponent(item.icon)" class="navigation__mobile-icon" />
            <span class="navigation__mobile-text">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
$dark-gray: #2d3748;
$white: #ffffff;
$white-transparent-10: rgba(255, 255, 255, 0.1);
$white-transparent-20: rgba(255, 255, 255, 0.2);
$white-transparent-80: rgba(255, 255, 255, 0.8);
$gray-200: #e5e7eb;
$gray-600: #6b7280;
$primary-color: #667eea;
$black-shadow: rgba(0, 0, 0, 0.1);

$sidebar-width: 280px;
$sidebar-collapsed-width: 70px;
$border-radius: 6px;
$border-radius-large: 25px;
$transition-duration: 0.3s;
$transition-fast: 0.2s;

.navigation {
  position: relative;

  &__sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: $sidebar-width;
    background: $dark-gray;
    color: $white;
    transition: width $transition-duration ease;
    z-index: 1000;
    box-shadow: 2px 0 10px $black-shadow;
    display: none;

    &--collapsed {
      width: $sidebar-collapsed-width;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid $white-transparent-10;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 12px;

    &-icon {
      color: $white;
    }

    &-text {
      font-size: 1.25rem;
      font-weight: 600;
      white-space: nowrap;
    }
  }

  &__toggle {
    background: transparent;
    border: none;
    color: $white;
    cursor: pointer;
    padding: 8px;
    border-radius: $border-radius;
    transition: background-color $transition-fast ease;

    &:hover {
      background-color: $white-transparent-10;
    }

    &--centered {
      margin: 0 auto;
    }

    &-icon {
      width: 20px;
      height: 20px;
    }
  }

  &__list {
    list-style: none;
    padding: 20px 0;
    margin: 0;
  }

  &__item {
    margin-bottom: 4px;
  }

  &__link {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    color: $white-transparent-80;
    text-decoration: none;
    transition: all $transition-fast ease;
    gap: 16px;
    border-radius: 0 $border-radius-large $border-radius-large 0;
    margin-right: 20px;

    &:hover {
      background-color: $white-transparent-10;
      color: $white;
    }

    &--active {
      background-color: $white-transparent-20;
      color: $white;
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }

  &__text {
    font-weight: 500;
    white-space: nowrap;
  }

  &__mobile {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: $white;
    border-top: 1px solid $gray-200;
    z-index: 1000;
    box-shadow: 0 -2px 10px $black-shadow;

    &-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &-item {
      flex: 1;
    }

    &-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px 4px;
      color: $gray-600;
      text-decoration: none;
      transition: color $transition-fast ease;
      gap: 4px;

      &:hover {
        color: $primary-color;
      }

      &--active {
        color: $primary-color;
      }
    }

    &-icon {
      width: 24px;
      height: 24px;
    }

    &-text {
      font-size: 0.75rem;
      font-weight: 500;
    }
  }
}

@media (min-width: 768px) {
  .navigation {
    &__sidebar {
      display: block;
    }

    &__mobile {
      display: none;
    }
  }
}

@media (max-width: 767px) {
  .navigation {
    &__sidebar {
      display: none;
    }

    &__mobile {
      display: block;
    }
  }
}
</style>
