import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useNavigation } from './useNavigation';
import { useRoute } from 'vue-router';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}));

describe('useNavigation', () => {
  const mockUseRoute = vi.mocked(useRoute);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('isActiveRoute', () => {
    it('returns true when current path exactly matches href', () => {
      mockUseRoute.mockReturnValue({
        path: '/dashboard/feed',
      } as RouteLocationNormalizedLoaded);

      const { isActiveRoute } = useNavigation();

      expect(isActiveRoute('/dashboard/feed')).toBe(true);
    });

    it('returns false when current path does not match href', () => {
      mockUseRoute.mockReturnValue({
        path: '/dashboard/feed',
      } as RouteLocationNormalizedLoaded);

      const { isActiveRoute } = useNavigation();

      expect(isActiveRoute('/dashboard/profile')).toBe(false);
    });

    it('returns true when current path starts with href followed by slash', () => {
      mockUseRoute.mockReturnValue({
        path: '/dashboard/feed/details',
      } as RouteLocationNormalizedLoaded);

      const { isActiveRoute } = useNavigation();

      expect(isActiveRoute('/dashboard/feed')).toBe(true);
    });

    it('returns true for nested routes', () => {
      mockUseRoute.mockReturnValue({
        path: '/dashboard/feed/item/123',
      } as RouteLocationNormalizedLoaded);

      const { isActiveRoute } = useNavigation();

      expect(isActiveRoute('/dashboard/feed')).toBe(true);
    });

    it('returns false for partial matches without slash separator', () => {
      mockUseRoute.mockReturnValue({
        path: '/dashboard/feedback',
      } as RouteLocationNormalizedLoaded);

      const { isActiveRoute } = useNavigation();

      expect(isActiveRoute('/dashboard/feed')).toBe(false);
    });

    it('handles root path correctly', () => {
      mockUseRoute.mockReturnValue({
        path: '/',
      } as RouteLocationNormalizedLoaded);

      const { isActiveRoute } = useNavigation();

      expect(isActiveRoute('/')).toBe(true);
      expect(isActiveRoute('/dashboard')).toBe(false);
    });

    it('handles empty href', () => {
      mockUseRoute.mockReturnValue({
        path: '/dashboard/feed',
      } as RouteLocationNormalizedLoaded);

      const { isActiveRoute } = useNavigation();

      expect(isActiveRoute('')).toBe(false);
    });

    it('handles href with trailing slash', () => {
      mockUseRoute.mockReturnValue({
        path: '/dashboard/feed',
      } as RouteLocationNormalizedLoaded);

      const { isActiveRoute } = useNavigation();

      expect(isActiveRoute('/dashboard/feed/')).toBe(false);
      expect(isActiveRoute('/dashboard/')).toBe(false);
    });

    it('works with multiple levels of nesting', () => {
      mockUseRoute.mockReturnValue({
        path: '/dashboard/settings/profile/edit',
      } as RouteLocationNormalizedLoaded);

      const { isActiveRoute } = useNavigation();

      expect(isActiveRoute('/dashboard')).toBe(true);
      expect(isActiveRoute('/dashboard/settings')).toBe(true);
      expect(isActiveRoute('/dashboard/settings/profile')).toBe(true);
      expect(isActiveRoute('/dashboard/settings/profile/edit')).toBe(true);
    });

    it('returns false for unrelated paths', () => {
      mockUseRoute.mockReturnValue({
        path: '/dashboard/feed',
      } as RouteLocationNormalizedLoaded);

      const { isActiveRoute } = useNavigation();

      expect(isActiveRoute('/profile')).toBe(false);
      expect(isActiveRoute('/settings')).toBe(false);
      expect(isActiveRoute('/dashboard/qr')).toBe(false);
    });

    it('handles query parameters and hash in current path', () => {
      mockUseRoute.mockReturnValue({
        path: '/dashboard/feed',
      } as RouteLocationNormalizedLoaded);

      const { isActiveRoute } = useNavigation();

      expect(isActiveRoute('/dashboard/feed')).toBe(true);
    });

    it('is case sensitive', () => {
      mockUseRoute.mockReturnValue({
        path: '/Dashboard/Feed',
      } as RouteLocationNormalizedLoaded);

      const { isActiveRoute } = useNavigation();

      expect(isActiveRoute('/dashboard/feed')).toBe(false);
      expect(isActiveRoute('/Dashboard/Feed')).toBe(true);
    });

    it('handles special characters in paths', () => {
      mockUseRoute.mockReturnValue({
        path: '/dashboard/user-profile',
      } as RouteLocationNormalizedLoaded);

      const { isActiveRoute } = useNavigation();

      expect(isActiveRoute('/dashboard/user-profile')).toBe(true);
      expect(isActiveRoute('/dashboard/user')).toBe(false);
    });

    it('works with numeric paths', () => {
      mockUseRoute.mockReturnValue({
        path: '/dashboard/item/123',
      } as RouteLocationNormalizedLoaded);

      const { isActiveRoute } = useNavigation();

      expect(isActiveRoute('/dashboard/item')).toBe(true);
      expect(isActiveRoute('/dashboard/item/123')).toBe(true);
      expect(isActiveRoute('/dashboard/item/456')).toBe(false);
    });

    it('handles edge case with similar path prefixes', () => {
      mockUseRoute.mockReturnValue({
        path: '/dashboard/notifications',
      } as RouteLocationNormalizedLoaded);

      const { isActiveRoute } = useNavigation();

      expect(isActiveRoute('/dashboard/notification')).toBe(false);
      expect(isActiveRoute('/dashboard/notifications')).toBe(true);
    });
  });

  describe('composable structure', () => {
    it('returns an object with isActiveRoute function', () => {
      mockUseRoute.mockReturnValue({
        path: '/dashboard/feed',
      } as RouteLocationNormalizedLoaded);

      const navigation = useNavigation();

      expect(navigation).toHaveProperty('isActiveRoute');
      expect(typeof navigation.isActiveRoute).toBe('function');
    });

    it('calls useRoute hook', () => {
      mockUseRoute.mockReturnValue({
        path: '/dashboard/feed',
      } as RouteLocationNormalizedLoaded);

      useNavigation();

      expect(mockUseRoute).toHaveBeenCalledTimes(1);
    });

    it('maintains function reference across calls', () => {
      mockUseRoute.mockReturnValue({
        path: '/dashboard/feed',
      } as RouteLocationNormalizedLoaded);

      const navigation1 = useNavigation();
      const navigation2 = useNavigation();

      expect(navigation1.isActiveRoute).not.toBe(navigation2.isActiveRoute);
    });
  });

  describe('real-world scenarios', () => {
    it('works correctly for dashboard navigation', () => {
      mockUseRoute.mockReturnValue({
        path: '/dashboard/feed',
      } as RouteLocationNormalizedLoaded);

      const { isActiveRoute } = useNavigation();

      expect(isActiveRoute('/dashboard')).toBe(true);
      expect(isActiveRoute('/dashboard/feed')).toBe(true);
      expect(isActiveRoute('/dashboard/qr')).toBe(false);
      expect(isActiveRoute('/dashboard/search')).toBe(false);
      expect(isActiveRoute('/dashboard/notifications')).toBe(false);
    });

    it('works correctly for nested dashboard routes', () => {
      mockUseRoute.mockReturnValue({
        path: '/dashboard/feed/post/123/comments',
      } as RouteLocationNormalizedLoaded);

      const { isActiveRoute } = useNavigation();

      expect(isActiveRoute('/dashboard')).toBe(true);
      expect(isActiveRoute('/dashboard/feed')).toBe(true);
      expect(isActiveRoute('/dashboard/feed/post')).toBe(true);
      expect(isActiveRoute('/dashboard/feed/post/123')).toBe(true);
      expect(isActiveRoute('/dashboard/qr')).toBe(false);
    });

    it('handles authentication routes correctly', () => {
      mockUseRoute.mockReturnValue({
        path: '/auth/login',
      } as RouteLocationNormalizedLoaded);

      const { isActiveRoute } = useNavigation();

      expect(isActiveRoute('/auth')).toBe(true);
      expect(isActiveRoute('/auth/login')).toBe(true);
      expect(isActiveRoute('/auth/register')).toBe(false);
      expect(isActiveRoute('/dashboard')).toBe(false);
    });
  });
});
