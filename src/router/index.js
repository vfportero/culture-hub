import Vue from 'vue';
import VueRouter  from 'vue-router';
import {FirebaseAuth} from '../firebase';
Vue.use(VueRouter);

import Index from "../components/Index";
import Error404 from "../components/Error404";
import AccountIndex from "../components/account/Index";
import AccountInfo from "../components/account/AccountInfo";
import AccountLogin from "../components/account/Login";

import Home from "../components/Home";
import Ciao from "../components/Ciao";
import Info from "../components/Info";


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
					path: 'ciao',
					name: 'ciao',
					component: Ciao,
				},
				{
					path: 'info',
					name: 'info',
					component: Info,
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
})

export default router;
