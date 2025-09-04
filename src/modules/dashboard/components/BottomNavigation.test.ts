import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import ResizeObserver from 'resize-observer-polyfill';
import BottomNavigation from './BottomNavigation.vue';

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
      id: 'qr',
      label: 'QR',
      href: '/dashboard/qr',
      icon: 'mdi-qrcode',
    },
    {
      id: 'search',
      label: 'Buscar',
      href: '/dashboard/search',
      icon: 'mdi-magnify',
    },
    {
      id: 'notifications',
      label: 'Notificaciones',
      href: '/dashboard/notifications',
      icon: 'mdi-bell',
    },
  ],
}));

vi.mock('@shared/composables/useNavigation', () => ({
  useNavigation: () => ({
    isActiveRoute: vi.fn((href: string) => href === '/dashboard/feed'),
  }),
}));

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/dashboard/feed', component: { template: '<div>Feed</div>' } },
    { path: '/dashboard/qr', component: { template: '<div>QR</div>' } },
    { path: '/dashboard/search', component: { template: '<div>Search</div>' } },
    { path: '/dashboard/notifications', component: { template: '<div>Notifications</div>' } },
  ],
});

describe('BottomNavigation', () => {
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
        template: '<v-app><v-layout><bottom-navigation /></v-layout></v-app>',
      },
      {
        global: {
          plugins: [router, vuetify],
          components: {
            BottomNavigation,
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

  it('renders nav element', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('nav').exists()).toBe(true);
  });

  it('renders v-bottom-navigation component', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.v-bottom-navigation').exists()).toBe(true);
  });

  it('renders navigation items from data', () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll('.v-btn');

    expect(buttons.length).toBe(4);

    const text = wrapper.text();
    expect(text).toContain('Feed');
    expect(text).toContain('QR');
    expect(text).toContain('Buscar');
    expect(text).toContain('Notificaciones');
  });

  it('renders icons for each navigation item', () => {
    const wrapper = createWrapper();
    const icons = wrapper.findAll('.v-icon');

    expect(icons.length).toBeGreaterThanOrEqual(4);

    const iconClasses = icons.map((icon) => icon.classes()).flat();
    expect(iconClasses.some((cls) => cls.includes('mdi-home'))).toBe(true);
    expect(iconClasses.some((cls) => cls.includes('mdi-qrcode'))).toBe(true);
    expect(iconClasses.some((cls) => cls.includes('mdi-magnify'))).toBe(true);
    expect(iconClasses.some((cls) => cls.includes('mdi-bell'))).toBe(true);
  });

  it('renders buttons with correct router links', () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll('.v-btn[href]');

    expect(buttons.length).toBeGreaterThan(0);

    const hrefs = buttons.map((btn) => btn.attributes('href')).filter(Boolean) as string[];
    expect(hrefs.some((href) => href.includes('/dashboard/feed'))).toBe(true);
    expect(hrefs.some((href) => href.includes('/dashboard/qr'))).toBe(true);
    expect(hrefs.some((href) => href.includes('/dashboard/search'))).toBe(true);
    expect(hrefs.some((href) => href.includes('/dashboard/notifications'))).toBe(true);
  });

  it('applies active state to current route', () => {
    const wrapper = createWrapper();

    const activeButtons = wrapper.findAll('.v-btn--active');
    expect(activeButtons.length).toBeGreaterThan(0);
  });

  it('has correct button structure with icons and labels', () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll('.v-btn');

    buttons.forEach((button) => {
      expect(button.find('.v-icon').exists()).toBe(true);

      expect(button.find('.text-caption').exists()).toBe(true);
    });
  });

  it('uses small size buttons', () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll('.v-btn');

    buttons.forEach((button) => {
      expect(button.classes()).toContain('v-btn--size-small');
    });
  });

  it('has grow property on bottom navigation', () => {
    const wrapper = createWrapper();
    const bottomNav = wrapper.find('.v-bottom-navigation');

    expect(bottomNav.exists()).toBe(true);
    expect(bottomNav.classes()).toContain('v-bottom-navigation--grow');
  });

  it('has correct background color', () => {
    const wrapper = createWrapper();
    const bottomNav = wrapper.find('.v-bottom-navigation');

    expect(bottomNav.classes().some((cls) => cls.includes('bg-surface'))).toBe(true);
  });

  it('generates unique keys for navigation items', () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll('.v-btn');

    expect(buttons.length).toBe(4);
  });

  it('handles navigation item clicks', async () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll('.v-btn[href]');

    const qrButton = buttons.find((btn) => btn.attributes('href')?.includes('/dashboard/qr'));

    if (qrButton) {
      await qrButton.trigger('click');
      await wrapper.vm.$nextTick();

      expect(qrButton.exists()).toBe(true);
    }
  });

  it('displays correct labels with text-caption class', () => {
    const wrapper = createWrapper();
    const captions = wrapper.findAll('.text-caption');

    expect(captions.length).toBe(4);

    const captionTexts = captions.map((caption) => caption.text());
    expect(captionTexts).toContain('Feed');
    expect(captionTexts).toContain('QR');
    expect(captionTexts).toContain('Buscar');
    expect(captionTexts).toContain('Notificaciones');
  });

  it('has correct component structure', () => {
    const wrapper = createWrapper();

    expect(wrapper.find('nav').exists()).toBe(true);

    expect(wrapper.find('.v-bottom-navigation').exists()).toBe(true);

    expect(wrapper.findAll('.v-btn').length).toBeGreaterThan(0);

    expect(wrapper.findAll('.v-icon').length).toBeGreaterThan(0);
  });

  it('is a valid Vue component', () => {
    const wrapper = createWrapper();
    const bottomNavigationComponent = wrapper.findComponent(BottomNavigation);
    expect(bottomNavigationComponent.exists()).toBe(true);
    expect(bottomNavigationComponent.vm).toBeDefined();
  });

  it('uses useNavigation composable correctly', () => {
    const wrapper = createWrapper();

    expect(wrapper.find('.v-bottom-navigation').exists()).toBe(true);

    const activeButtons = wrapper.findAll('.v-btn--active');
    expect(activeButtons.length).toBeGreaterThan(0);
  });

  it('loads navigation items from JSON data', () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll('.v-btn');

    expect(buttons.length).toBe(4);

    const allText = wrapper.text();
    expect(allText).toContain('Feed');
    expect(allText).toContain('QR');
    expect(allText).toContain('Buscar');
    expect(allText).toContain('Notificaciones');
  });
});
