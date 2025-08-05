<template>
  <nav class="navigation">
    <!-- Desktop/Tablet Menu -->
    <aside
      :class="['navigation__sidebar', { 'navigation__sidebar--collapsed': isCollapsed }]"
      class="navigation__sidebar"
    >
      <!-- Logo Section -->
      <div class="navigation__header">
        <div class="navigation__logo">
          <svg class="navigation__logo-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span v-if="!isCollapsed" class="navigation__logo-text"> MyApp </span>
        </div>
        <button
          class="navigation__toggle"
          @click="toggleSidebar"
          :aria-label="isCollapsed ? 'Expandir menú' : 'Colapsar menú'"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
      </div>

      <!-- Navigation Links -->
      <ul class="navigation__list">
        <li v-for="item in navigationItems" :key="item.id" class="navigation__item">
          <a
            :href="item.href"
            :class="['navigation__link', { 'navigation__link--active': activeItem === item.id }]"
            @click.prevent="setActiveItem(item.id)"
          >
            <svg class="navigation__icon" viewBox="0 0 24 24" fill="currentColor">
              <path :d="item.icon" />
            </svg>
            <span v-if="!isCollapsed" class="navigation__text">
              {{ item.label }}
            </span>
          </a>
        </li>
      </ul>
    </aside>

    <!-- Mobile Menu -->
    <div class="navigation__mobile">
      <ul class="navigation__mobile-list">
        <li
          v-for="item in navigationItems"
          :key="`mobile-${item.id}`"
          class="navigation__mobile-item"
        >
          <a
            :href="item.href"
            :class="[
              'navigation__mobile-link',
              { 'navigation__mobile-link--active': activeItem === item.id },
            ]"
            @click.prevent="setActiveItem(item.id)"
          >
            <svg class="navigation__mobile-icon" viewBox="0 0 24 24" fill="currentColor">
              <path :d="item.icon" />
            </svg>
            <span class="navigation__mobile-text">{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Types
interface NavigationItem {
  id: string
  label: string
  href: string
  icon: string
}

// Reactive state
const isCollapsed = ref<boolean>(false)
const activeItem = ref<string>('feed')

// Navigation items with SVG paths for icons
const navigationItems = reactive<NavigationItem[]>([
  {
    id: 'feed',
    label: 'Feed',
    href: '/feed',
    icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', // Home/Feed icon
  },
  {
    id: 'classes',
    label: 'Classes',
    href: '/classes',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z', // Stats/Classes icon
  },
  {
    id: 'qr',
    label: 'QR',
    href: '/qr',
    icon: 'M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm10 2h2v2h-2v-2zm0 4h2v2h-2v-2zm-2-4h2v2h-2v-2zm4-4h2v2h-2v-2zm-2 0h2v2h-2v-2zm2-2h2v2h-2v-2z', // QR code icon
  },
  {
    id: 'stats',
    label: 'Stats',
    href: '/stats',
    icon: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z', // Statistics icon
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/profile',
    icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z', // Profile icon
  },
])

// Methods
const toggleSidebar = (): void => {
  isCollapsed.value = !isCollapsed.value
}

const setActiveItem = (itemId: string): void => {
  activeItem.value = itemId
}
</script>

<style scoped>
/* BEM Block: Navigation */
.navigation {
  position: relative;
}

/* BEM Element: Sidebar (Desktop/Tablet) */
.navigation__sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background: linear-gradient(180deg, #667eea, #764ba2);
  color: white;
  transition: width 0.3s ease;
  z-index: 1000;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: none;
}

/* BEM Modifier: Collapsed sidebar */
.navigation__sidebar--collapsed {
  width: 70px;
}

/* BEM Element: Header section */
.navigation__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* BEM Element: Logo container */
.navigation__logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* BEM Element: Logo icon */
.navigation__logo-icon {
  width: 32px;
  height: 32px;
  color: white;
}

/* BEM Element: Logo text */
.navigation__logo-text {
  font-size: 1.25rem;
  font-weight: 600;
  white-space: nowrap;
}

/* BEM Element: Toggle button */
.navigation__toggle {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.navigation__toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.navigation__toggle svg {
  width: 20px;
  height: 20px;
}

/* BEM Element: Navigation list */
.navigation__list {
  list-style: none;
  padding: 20px 0;
  margin: 0;
}

/* BEM Element: Navigation item */
.navigation__item {
  margin-bottom: 4px;
}

/* BEM Element: Navigation link */
.navigation__link {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.2s ease;
  gap: 16px;
  border-radius: 0 25px 25px 0;
  margin-right: 20px;
}

.navigation__link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

/* BEM Modifier: Active link */
.navigation__link--active {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

/* BEM Element: Navigation icon */
.navigation__icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

/* BEM Element: Navigation text */
.navigation__text {
  font-weight: 500;
  white-space: nowrap;
}

/* BEM Element: Mobile navigation */
.navigation__mobile {
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e5e7eb;
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

/* BEM Element: Mobile list */
.navigation__mobile-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* BEM Element: Mobile item */
.navigation__mobile-item {
  flex: 1;
}

/* BEM Element: Mobile link */
.navigation__mobile-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 4px;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s ease;
  gap: 4px;
}

.navigation__mobile-link:hover {
  color: #667eea;
}

/* BEM Modifier: Active mobile link */
.navigation__mobile-link--active {
  color: #667eea;
}

/* BEM Element: Mobile icon */
.navigation__mobile-icon {
  width: 24px;
  height: 24px;
}

/* BEM Element: Mobile text */
.navigation__mobile-text {
  font-size: 0.75rem;
  font-weight: 500;
}

/* Media Queries */
@media (min-width: 768px) {
  .navigation__sidebar {
    display: block;
  }

  .navigation__mobile {
    display: none;
  }
}

@media (max-width: 767px) {
  .navigation__sidebar {
    display: none;
  }

  .navigation__mobile {
    display: block;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .navigation__mobile {
    background: #1f2937;
    border-top-color: #374151;
  }

  .navigation__mobile-link {
    color: #9ca3af;
  }

  .navigation__mobile-link:hover,
  .navigation__mobile-link--active {
    color: #667eea;
  }
}
</style>
