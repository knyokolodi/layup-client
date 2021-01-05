import { createRouter, createWebHistory } from 'vue-router';
import About from '../views/About.vue';
import Users from '../components/Users.vue';
import AddUser from '../components/AddUser.vue';

const routes = [
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/',
    name: 'Users',
    component: Users,
  },
  {
    path: '/add-user',
    name: 'AddUser',
    component: AddUser,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
