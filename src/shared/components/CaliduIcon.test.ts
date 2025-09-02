import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CaliduIcon from './CaliduIcon.vue';

describe('CaliduIcon', () => {
  it('renders with default size md', () => {
    const wrapper = mount(CaliduIcon);
    const svg = wrapper.find('svg');
    expect(svg.attributes('style')).toContain('width: 2rem');
    expect(svg.attributes('style')).toContain('height: 2rem');
  });

  it('renders with xs size', () => {
    const wrapper = mount(CaliduIcon, {
      props: { size: 'xs' },
    });
    const svg = wrapper.find('svg');
    expect(svg.attributes('style')).toContain('width: 1rem');
    expect(svg.attributes('style')).toContain('height: 1rem');
  });

  it('renders with sm size', () => {
    const wrapper = mount(CaliduIcon, {
      props: { size: 'sm' },
    });
    const svg = wrapper.find('svg');
    expect(svg.attributes('style')).toContain('width: 1.5rem');
    expect(svg.attributes('style')).toContain('height: 1.5rem');
  });

  it('renders with md size', () => {
    const wrapper = mount(CaliduIcon, {
      props: { size: 'md' },
    });
    const svg = wrapper.find('svg');
    expect(svg.attributes('style')).toContain('width: 2rem');
    expect(svg.attributes('style')).toContain('height: 2rem');
  });

  it('renders with lg size', () => {
    const wrapper = mount(CaliduIcon, {
      props: { size: 'lg' },
    });
    const svg = wrapper.find('svg');
    expect(svg.attributes('style')).toContain('width: 3rem');
    expect(svg.attributes('style')).toContain('height: 3rem');
  });

  it('renders with xl size', () => {
    const wrapper = mount(CaliduIcon, {
      props: { size: 'xl' },
    });
    const svg = wrapper.find('svg');
    expect(svg.attributes('style')).toContain('width: 4rem');
    expect(svg.attributes('style')).toContain('height: 4rem');
  });

  it('renders svg with correct viewBox and namespace', () => {
    const wrapper = mount(CaliduIcon);
    const svg = wrapper.find('svg');
    expect(svg.attributes('viewBox')).toBe('0 0 143 180');
    expect(svg.attributes('xmlns')).toBe('http://www.w3.org/2000/svg');
  });
});
