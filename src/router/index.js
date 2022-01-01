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
import NewLogEntry from "../components/new/NewLogEntry";
import NewMovieLogEntry from "../components/new/NewMovieLogEntry";
import NewTvshowLogEntry from "../components/new/NewTvshowLogEntry";



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
						{
							path: 'tvshow',
							name: 'newTvshow',
							component: NewTvshowLogEntry,
						}
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
})

export default router;
