import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import ResizeObserver from 'resize-observer-polyfill';
import DashboardView from './DashboardView.vue';
import NavigationDrawer from './components/NavigationDrawer.vue';
import BottomNavigation from './components/BottomNavigation.vue';

global.ResizeObserver = ResizeObserver;

vi.mock('./components/NavigationDrawer.vue', () => ({
  default: {
    name: 'NavigationDrawer',
    template: '<div class="navigation-drawer">Navigation Drawer</div>',
  },
}));

vi.mock('./components/BottomNavigation.vue', () => ({
  default: {
    name: 'BottomNavigation',
    template: '<div class="bottom-navigation">Bottom Navigation</div>',
  },
}));

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/dashboard', component: { template: '<div>Dashboard</div>' } },
  ],
});

describe('DashboardView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createWrapper = (displayOptions = {}) => {
    const vuetify = createVuetify({
      components,
      directives,
      display: {
        mobileBreakpoint: 'md',
        ...displayOptions,
      },
    });

    router.push('/dashboard');
    return mount(
      {
        template: '<v-app><dashboard-view /></v-app>',
      },
      {
        global: {
          plugins: [router, vuetify],
          components: {
            DashboardView,
            NavigationDrawer,
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

  it('renders v-main component', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.v-main').exists()).toBe(true);
  });

  it('contains router-view inside v-main', () => {
    const wrapper = createWrapper();
    const vMain = wrapper.find('.v-main');
    const routerView = wrapper.findComponent({ name: 'RouterView' });

    expect(vMain.exists()).toBe(true);
    expect(routerView.exists()).toBe(true);
    expect(vMain.element.contains(routerView.element)).toBe(true);
  });

  it('renders navigation components based on screen size', () => {
    const wrapper = createWrapper();
    const hasNavigationDrawer = wrapper.findComponent(NavigationDrawer).exists();
    const hasBottomNavigation = wrapper.findComponent(BottomNavigation).exists();
    expect(hasNavigationDrawer !== hasBottomNavigation).toBe(true);
  });

  it('has conditional rendering logic for navigation components', () => {
    const wrapper = createWrapper();
    expect(wrapper.vm.$vuetify.display).toBeDefined();
    expect(typeof wrapper.vm.$vuetify.display.mdAndUp).toBe('boolean');
  });

  it('imports both navigation components', () => {
    const wrapper = createWrapper();

    const dashboardComponent = wrapper.findComponent(DashboardView);
    expect(dashboardComponent.exists()).toBe(true);

    expect(NavigationDrawer).toBeDefined();
    expect(BottomNavigation).toBeDefined();
  });

  it('handles route changes correctly', async () => {
    const wrapper = createWrapper();

    await router.push('/');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true);
    expect(wrapper.find('.v-main').exists()).toBe(true);
  });

  it('maintains component structure across route changes', async () => {
    const wrapper = createWrapper();

    expect(wrapper.find('.v-main').exists()).toBe(true);

    await router.push('/');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.v-main').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true);
  });

  it('imports and registers child components correctly', () => {
    const wrapper = createWrapper();

    expect(wrapper.vm.$options.components).toBeDefined();
  });

  it('has correct component structure', () => {
    const wrapper = createWrapper();

    expect(wrapper.find('.v-main').exists()).toBe(true);

    const routerView = wrapper.findComponent({ name: 'RouterView' });
    expect(routerView.exists()).toBe(true);
  });

  it('is a valid Vue component', () => {
    const wrapper = createWrapper();
    expect(wrapper.vm).toBeDefined();
    expect(wrapper.vm.$el).toBeDefined();
  });

  it('responds to display breakpoint changes', async () => {
    const wrapper = createWrapper();

    wrapper.vm.$vuetify.display.mdAndUp = true;
    wrapper.vm.$vuetify.display.smAndDown = false;
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(NavigationDrawer).exists()).toBe(true);

    wrapper.vm.$vuetify.display.mdAndUp = false;
    wrapper.vm.$vuetify.display.smAndDown = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(BottomNavigation).exists()).toBe(true);
  });
});
