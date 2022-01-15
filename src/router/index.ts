import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import UserStore from '@/store/modules/user';
import { LogEntryType } from '@/models';
const entryTypes = Object.keys(LogEntryType).map(key => LogEntryType[key]);



/**
 * 
 * @param to 
 * @param from 
 * @param next 
 */
const authCheck = (to: any, from: any, next: any) => {
  if (UserStore.isLoggedIn) {
    if (to.name === 'login') {
      next({ name: 'timeline' });
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
    path: "/",
    redirect: "/app/timeline",
  },
  {
    path: "/app/",
    component: () => import('@/views/Home.vue'),
    beforeEnter: authCheck,
    children: [
      {
        path: "",
        redirect: "/app/timeline",
      },
      {
        path: "timeline",
        name: "timeline",
        component: () => import("@/views/Timeline.vue"),
      },
    ],
  },
  {
    path: '/new-log-entry',
    name: 'new-log-entry',
    component: () => import("@/views/NewLogEntry.vue"),
    children: entryTypes.map(type => ({
      path: type,
      name: `NewLogEntry_${type}`,
      component: () => import("@/views/NewLogEntry.vue"),
    })),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;