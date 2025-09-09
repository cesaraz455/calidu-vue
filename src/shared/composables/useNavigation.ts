import { useRoute } from 'vue-router';

export function useNavigation() {
  const route = useRoute();

  const isActiveRoute = (href: string): boolean => {
    if (!href || href === '') {
      return false;
    }
    return route.path === href || route.path.startsWith(href + '/');
  };

  return {
    isActiveRoute,
  };
}
