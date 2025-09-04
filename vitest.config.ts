import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      exclude: [...configDefaults.exclude],
      root: fileURLToPath(new URL('./', import.meta.url)),
      server: {
        deps: {
          inline: ['vuetify'],
        },
      },
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'coverage/**',
          'dist/**',
          'packages/*/test{,s}/**',
          '**/*.d.ts',
          'test{,s}/**',
          'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
          '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
          '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
          '**/{vite,vitest,jest,babel,build}.config.*',
          '**/.{eslint,prettier}rc.{js,cjs,yml}',
          'src/modules/home/HomeView.vue',
          'src/plugins/vuetify.ts',
          'src/main.ts',
          'src/router/**',
          'src/assets/**',
          'src/icons/**',
          'public/**',
          '*.config.*',
          '.*rc.*',
        ],
        include: ['src/**/*.{js,ts,vue}'],
        all: true,
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80,
        },
      },
    },
  }),
);
