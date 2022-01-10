import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import UserStore from '@/store/modules/user';


/**
 * 
 * @param to 
 * @param from 
 * @param next 
 */
const authCheck = (to: any, from: any, next: any) => {
  if (UserStore.user) {
    if (to.name === 'login') {
      next({ name: 'home' });
    } else {
      next();
    }
  } else {
    if (to.name === 'login') {
      next();
    } else {
      next({ name: 'login' });
    }
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/Home.vue'),
    beforeEnter: authCheck,
  },
  // {
  //   path: '/tabs/',
  //   component: TabsPage,
  //   children: [
  //     {
  //       path: '',
  //       redirect: '/tabs/tab1',
  //     },
  //     {
  //       path: 'tab1',
  //       name: 'tab1',
  //       component: () => import('@/views/Tab1Page.vue'),
  //       beforeEnter: authCheck,
  //     },
  //     {
  //       path: 'tab2',
  //       component: () => import('@/views/Tab2Page.vue'),
  //       beforeEnter: authCheck,
  //     },
  //   ],
  // },
  // { path: '*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;