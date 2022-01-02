import Vue from 'vue';
import VueRouter  from 'vue-router';
import {FirebaseAuth} from '../firebase';
Vue.use(VueRouter);

import Index from '../components/Index.vue';
import Error404 from '../components/Error404.vue';
import AccountIndex from '../components/account/Index.vue';
import AccountInfo from '../components/account/AccountInfo.vue';
import AccountLogin from '../components/account/Login.vue';

import Home from '../components/Home.vue';
import NewLogEntry from '../components/new/NewLogEntry.vue';
import NewMovieLogEntry from '../components/new/NewMovieLogEntry.vue';



const router = new VueRouter ({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '*',
      name: 'error404',
      component: Error404,
    },
    {
      path: '/',
      component: Index,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home,
        },
        {
          path: 'new',
          name: 'new',
          component: NewLogEntry,
          children: [
            {
              path: 'movie',
              name: 'NewMovieLogEntry',
              component: NewMovieLogEntry,
            },
          ]
        },
      ]
    },
    {
      path: '/account',
      component: AccountIndex,
      children: [
        {
          path: '',
          name: 'account-info',
          component: AccountInfo,
        },
        {
          path: 'login',
          name: 'account-login',
          component: AccountLogin,
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  let currentUser = FirebaseAuth.currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser) next('/account/login');
  else next();
});

export default router;
