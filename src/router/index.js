import { createRouter, createWebHashHistory } from 'vue-router';
import ListView from '../views/ListView.vue';

const routes = [
  {
    path: '/',
    name: 'list',
    component: ListView,
  },
  {
    path: '/movies/:imdbID',
    name: 'details',
    component: () => import('../views/DetailsView.vue'),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
