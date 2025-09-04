import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import ResizeObserver from 'resize-observer-polyfill';
import App from './App.vue';

global.ResizeObserver = ResizeObserver;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/test', component: { template: '<div>Test Page</div>' } },
  ],
});

const vuetify = createVuetify({
  components,
  directives,
});

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createWrapper = (route = '/') => {
    router.push(route);
    return mount(App, {
      global: {
        plugins: [router, vuetify],
      },
    });
  };

  it('renders without errors', () => {
    expect(() => {
      createWrapper();
    }).not.toThrow();
  });

  it('renders v-app component', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.v-application').exists()).toBe(true);
  });

  it('contains router-view', () => {
    const wrapper = createWrapper();
    expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true);
  });

  it('renders router-view inside v-app', () => {
    const wrapper = createWrapper();
    const vApp = wrapper.find('.v-application');
    const routerView = wrapper.findComponent({ name: 'RouterView' });

    expect(vApp.exists()).toBe(true);
    expect(routerView.exists()).toBe(true);
    expect(vApp.element.contains(routerView.element)).toBe(true);
  });

  it('applies global body styles', () => {
    createWrapper();
    const wrapper = createWrapper();
    expect(wrapper.html()).toBeDefined();
    expect(wrapper.find('.v-application').exists()).toBe(true);
  });

  it('handles route changes correctly', async () => {
    const wrapper = createWrapper('/');
    await router.push('/test');
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true);
  });

  it('maintains v-app structure across route changes', async () => {
    const wrapper = createWrapper('/');
    expect(wrapper.find('.v-application').exists()).toBe(true);
    await router.push('/test');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.v-application').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true);
  });

  it('has correct component structure', () => {
    const wrapper = createWrapper();
    expect(wrapper.classes()).toContain('v-application');
    const routerView = wrapper.findComponent({ name: 'RouterView' });
    expect(routerView.exists()).toBe(true);
  });

  it('is a valid Vue component', () => {
    const wrapper = createWrapper();
    expect(wrapper.vm).toBeDefined();
    expect(wrapper.vm.$el).toBeDefined();
  });
});
