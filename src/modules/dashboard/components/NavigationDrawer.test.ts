import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import ResizeObserver from 'resize-observer-polyfill';
import NavigationDrawer from './NavigationDrawer.vue';
import CaliduIcon from '@shared/components/CaliduIcon.vue';
import IconButton from '@shared/components/IconButton.vue';

global.ResizeObserver = ResizeObserver;

vi.mock('../data/navigationItems.json', () => ({
  default: [
    {
      id: 'feed',
      label: 'Feed',
      href: '/dashboard/feed',
      icon: 'mdi-home',
    },
    {
      id: 'classes',
      label: 'Classes',
      href: '/dashboard/classes',
      icon: 'mdi-chart-bar',
    },
    {
      id: 'qr',
      label: 'QR',
      href: '/dashboard/qr',
      icon: 'mdi-qrcode',
    },
    {
      id: 'stats',
      label: 'Stats',
      href: '/dashboard/stats',
      icon: 'mdi-chart-line',
    },
    {
      id: 'profile',
      label: 'Profile',
      href: '/dashboard/profile',
      icon: 'mdi-account',
    },
  ],
}));

vi.mock('@shared/composables/useNavigation', () => ({
  useNavigation: () => ({
    isActiveRoute: vi.fn((href: string) => href === '/dashboard/feed'),
  }),
}));

vi.mock('@shared/components/CaliduIcon.vue', () => ({
  default: {
    name: 'CaliduIcon',
    template: '<div class="calidu-icon">Calidú Icon</div>',
    props: ['size'],
  },
}));

vi.mock('@shared/components/IconButton.vue', () => ({
  default: {
    name: 'IconButton',
    template: '<button class="icon-button" @click="$emit(\'click\', $event)">{{ icon }}</button>',
    props: ['icon', 'ariaLabel', 'iconSize'],
    emits: ['click'],
  },
}));

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/dashboard/feed', component: { template: '<div>Feed</div>' } },
    { path: '/dashboard/classes', component: { template: '<div>Classes</div>' } },
    { path: '/dashboard/qr', component: { template: '<div>QR</div>' } },
    { path: '/dashboard/stats', component: { template: '<div>Stats</div>' } },
    { path: '/dashboard/profile', component: { template: '<div>Profile</div>' } },
  ],
});

describe('NavigationDrawer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createWrapper = () => {
    const vuetify = createVuetify({
      components,
      directives,
    });

    router.push('/dashboard/feed');
    return mount(
      {
        template: '<v-app><v-layout><navigation-drawer /></v-layout></v-app>',
      },
      {
        global: {
          plugins: [router, vuetify],
          components: {
            NavigationDrawer,
            CaliduIcon,
            IconButton,
          },
        },
      },
    );
  };

  it('renders without errors', () => {
    expect(() => {
      createWrapper();
    }).not.toThrow();
  });

  it('renders v-navigation-drawer component', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.v-navigation-drawer').exists()).toBe(true);
  });

  it('starts in rail mode by default', () => {
    const wrapper = createWrapper();
    const navigationDrawer = wrapper.find('.v-navigation-drawer');
    expect(navigationDrawer.classes()).toContain('v-navigation-drawer--rail');
  });

  it('renders navigation items from data', () => {
    const wrapper = createWrapper();
    const listItems = wrapper.findAll('.v-list-item');

    expect(listItems.length).toBeGreaterThanOrEqual(5);

    const text = wrapper.text();
    expect(text).toContain('Feed');
    expect(text).toContain('Classes');
    expect(text).toContain('QR');
    expect(text).toContain('Stats');
    expect(text).toContain('Profile');
  });

  it('renders IconButton in rail mode', async () => {
    const wrapper = createWrapper();
    const iconButtons = wrapper.findAllComponents(IconButton);

    expect(iconButtons.length).toBeGreaterThan(0);

    const menuButton = iconButtons.find((button) => button.props('icon') === 'mdi-menu');
    expect(menuButton).toBeDefined();
  });

  it('toggles rail state when menu button is clicked', async () => {
    const wrapper = createWrapper();
    const navigationDrawer = wrapper.find('.v-navigation-drawer');

    expect(navigationDrawer.classes()).toContain('v-navigation-drawer--rail');

    const iconButtons = wrapper.findAllComponents(IconButton);
    const menuButton = iconButtons.find((button) => button.props('icon') === 'mdi-menu');

    if (menuButton) {
      await menuButton.trigger('click');
      await wrapper.vm.$nextTick();

      expect(navigationDrawer.classes()).not.toContain('v-navigation-drawer--rail');
    }
  });

  it('shows CaliduIcon and brand name when not in rail mode', async () => {
    const wrapper = createWrapper();

    const iconButtons = wrapper.findAllComponents(IconButton);
    const menuButton = iconButtons.find((button) => button.props('icon') === 'mdi-menu');

    if (menuButton) {
      await menuButton.trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent(CaliduIcon).exists()).toBe(true);

      expect(wrapper.text()).toContain('Calidú');
    }
  });

  it('has rail functionality configured', () => {
    const wrapper = createWrapper();
    const navigationDrawer = wrapper.find('.v-navigation-drawer');

    expect(navigationDrawer.exists()).toBe(true);
    expect(navigationDrawer.classes()).toContain('v-navigation-drawer--rail');

    expect(navigationDrawer.classes()).toContain('v-navigation-drawer');
  });

  it('renders navigation items with correct props', () => {
    const wrapper = createWrapper();
    const listItems = wrapper.findAll('.v-list-item');

    expect(listItems.length).toBe(6);
  });

  it('applies active state to current route', () => {
    const wrapper = createWrapper();

    const activeItems = wrapper.findAll('.v-list-item--active');
    expect(activeItems.length).toBeGreaterThan(0);
  });

  it('has proper accessibility attributes', () => {
    const wrapper = createWrapper();
    const iconButtons = wrapper.findAllComponents(IconButton);

    const menuButton = iconButtons.find((button) => button.props('icon') === 'mdi-menu');

    if (menuButton) {
      const ariaLabel = menuButton.props().ariaLabel;
      expect(ariaLabel).toBeDefined();
      expect(ariaLabel).toContain('menú');
    }
  });

  it('renders with correct Vuetify styling', () => {
    const wrapper = createWrapper();
    const navigationDrawer = wrapper.find('.v-navigation-drawer');

    expect(navigationDrawer.exists()).toBe(true);
    expect(navigationDrawer.classes()).toContain('v-navigation-drawer');
  });

  it('has correct component structure', () => {
    const wrapper = createWrapper();

    expect(wrapper.find('.v-navigation-drawer').exists()).toBe(true);

    expect(wrapper.find('.v-list').exists()).toBe(true);

    expect(wrapper.findAll('.v-list-item').length).toBeGreaterThan(0);
  });

  it('is a valid Vue component', () => {
    const wrapper = createWrapper();
    const navigationDrawerComponent = wrapper.findComponent(NavigationDrawer);
    expect(navigationDrawerComponent.exists()).toBe(true);
    expect(navigationDrawerComponent.vm).toBeDefined();
  });
});
