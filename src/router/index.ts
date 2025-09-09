import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@modules/home/HomeView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@modules/dashboard/DashboardView.vue'),
      children: [
        {
          path: '',
          redirect: {
            name: 'feed',
          },
        },
        {
          path: 'feed',
          name: 'feed',
          component: () => import('@modules/feed/FeedView.vue'),
        },
      ],
    },
  ],
});

export default router;
