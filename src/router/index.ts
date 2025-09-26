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
        {
          path: 'classes',
          name: 'classes',
          component: () => import('@modules/classes/ClassesView.vue'),
        },
        {
          path: 'qr',
          name: 'qr',
          component: () => import('@modules/qr/QrView.vue'),
        },
        {
          path: 'stats',
          name: 'stats',
          component: () => import('@modules/stats/StatsView.vue'),
        },
        {
          path: 'me',
          name: 'me',
          component: () => import('@modules/me/MyProfileView.vue'),
        },
      ],
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@modules/profile/ProfileView.vue'),
    },
  ],
});

export default router;
