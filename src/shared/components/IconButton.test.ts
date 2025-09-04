import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import ResizeObserver from 'resize-observer-polyfill';
import IconButton from './IconButton.vue';

global.ResizeObserver = ResizeObserver;

describe('IconButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createWrapper = (props = {}) => {
    const vuetify = createVuetify({
      components,
      directives,
    });

    return mount(IconButton, {
      props: {
        icon: 'mdi-home',
        ...props,
      },
      global: {
        plugins: [vuetify],
      },
    });
  };

  it('renders without errors', () => {
    expect(() => {
      createWrapper();
    }).not.toThrow();
  });

  it('renders v-btn component', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.v-btn').exists()).toBe(true);
  });

  it('renders v-icon component with correct icon', () => {
    const wrapper = createWrapper({ icon: 'mdi-star' });
    const icon = wrapper.find('.v-icon');

    expect(icon.exists()).toBe(true);
    expect(wrapper.vm.icon).toBe('mdi-star');
  });

  it('applies default props correctly', () => {
    const wrapper = createWrapper();
    const button = wrapper.find('.v-btn');

    expect(button.classes()).toContain('v-btn--variant-text');
    expect(button.classes()).toContain('v-btn--size-small');
  });

  it('applies custom variant prop', () => {
    const wrapper = createWrapper({ variant: 'outlined' });
    const button = wrapper.find('.v-btn');

    expect(button.classes()).toContain('v-btn--variant-outlined');
  });

  it('applies custom size prop', () => {
    const wrapper = createWrapper({ size: 'large' });
    const button = wrapper.find('.v-btn');

    expect(button.classes()).toContain('v-btn--size-large');
  });

  it('applies aria-label when provided', () => {
    const wrapper = createWrapper({ ariaLabel: 'Close dialog' });
    const button = wrapper.find('.v-btn');

    expect(button.attributes('aria-label')).toBe('Close dialog');
  });

  it('does not have aria-label when not provided', () => {
    const wrapper = createWrapper();
    const button = wrapper.find('.v-btn');

    expect(button.attributes('aria-label')).toBeUndefined();
  });

  it('is configured as icon button', () => {
    const wrapper = createWrapper();
    const button = wrapper.find('.v-btn');

    expect(button.classes()).toContain('v-btn--icon');
  });

  it('emits click event when clicked', async () => {
    const wrapper = createWrapper();
    const button = wrapper.find('.v-btn');

    await button.trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('passes mouse event in click emission', async () => {
    const wrapper = createWrapper();
    const button = wrapper.find('.v-btn');

    await button.trigger('click');

    const clickEvents = wrapper.emitted('click') as MouseEvent[][];
    expect(clickEvents[0]).toHaveLength(1);
    expect(clickEvents[0][0]).toBeInstanceOf(MouseEvent);
  });

  it('supports all variant options', () => {
    const variants = ['text', 'outlined', 'flat', 'elevated', 'tonal', 'plain'];

    variants.forEach((variant) => {
      const wrapper = createWrapper({ variant });
      const button = wrapper.find('.v-btn');

      expect(button.classes()).toContain(`v-btn--variant-${variant}`);
    });
  });

  it('supports all size options', () => {
    const sizes = ['x-small', 'small', 'default', 'large', 'x-large'];

    sizes.forEach((size) => {
      const wrapper = createWrapper({ size });
      const button = wrapper.find('.v-btn');

      expect(button.classes()).toContain(`v-btn--size-${size}`);
    });
  });

  it('renders different icons correctly', () => {
    const icons = ['mdi-home', 'mdi-star', 'mdi-heart', 'mdi-settings'];

    icons.forEach((icon) => {
      const wrapper = createWrapper({ icon });
      const iconElement = wrapper.find('.v-icon');

      expect(iconElement.exists()).toBe(true);
      expect(wrapper.vm.icon).toBe(icon);
    });
  });

  it('has correct component structure', () => {
    const wrapper = createWrapper();

    expect(wrapper.find('.v-btn').exists()).toBe(true);
    expect(wrapper.find('.v-icon').exists()).toBe(true);

    const button = wrapper.find('.v-btn');
    const icon = wrapper.find('.v-icon');
    expect(button.element.contains(icon.element)).toBe(true);
  });

  it('is a valid Vue component', () => {
    const wrapper = createWrapper();
    expect(wrapper.vm).toBeDefined();
    expect(wrapper.vm.$el).toBeDefined();
  });

  it('handles multiple clicks correctly', async () => {
    const wrapper = createWrapper();
    const button = wrapper.find('.v-btn');

    await button.trigger('click');
    await button.trigger('click');
    await button.trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(3);
  });

  it('maintains icon content after interactions', async () => {
    const wrapper = createWrapper({ icon: 'mdi-menu' });
    const button = wrapper.find('.v-btn');
    const icon = wrapper.find('.v-icon');

    expect(icon.exists()).toBe(true);
    expect(wrapper.vm.icon).toBe('mdi-menu');

    await button.trigger('click');

    expect(wrapper.find('.v-icon').exists()).toBe(true);
    expect(wrapper.vm.icon).toBe('mdi-menu');
  });

  it('accepts and renders complex icon names', () => {
    const complexIcon = 'mdi-account-circle-outline';
    const wrapper = createWrapper({ icon: complexIcon });
    const icon = wrapper.find('.v-icon');

    expect(icon.exists()).toBe(true);
    expect(wrapper.vm.icon).toBe(complexIcon);
  });

  it('works with accessibility attributes', () => {
    const wrapper = createWrapper({
      ariaLabel: 'Open navigation menu',
      icon: 'mdi-menu',
    });
    const button = wrapper.find('.v-btn');

    expect(button.attributes('aria-label')).toBe('Open navigation menu');
    expect(button.element.tagName.toLowerCase()).toBe('button');
  });
});
