import Vue from 'vue';
import Vuex from 'vuex';
import { FirebaseDatabase } from '@/firebase';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		user: null,
		logEntries: [],
		loading: false
	},
	actions: {
		setUser({ commit, dispatch }, user) {
			commit('setUser', user);
			dispatch('getUserLogEntries');
		},
		async getUserLogEntries({ state, commit }) {
			if (state.user) {6;
				commit('setLoading', true);
				const userLogEntries = await FirebaseDatabase.collection('user_log_entries').doc(state.user.uid).collection('log_entries').get();
				commit('setUserLogEntries', await userLogEntries.docs.map(doc => doc.data()));
				commit('setLoading', false);
			}
		},
		async addUserLogEntry({ state, commit }, logEntry) {
			const newLogEntry = {
				...logEntry,
				created_date: new Date()
			};
			commit('setLoading', true);
			try {
				const userLogEntries = await FirebaseDatabase.collection('user_log_entries').doc(state.user.uid).collection('log_entries');
        
				await userLogEntries.add(newLogEntry);
				commit('addUserLogEntry', newLogEntry);
			}
			catch (error) {
				return error;
			}
			finally {
				commit('setLoading', false);
			}

			return true;
		}
	},
	mutations: {
		setLoading(state, loading) {
			state.loading = loading;
		},
		setUser(state, user) {
			state.user = user;
		},
		setUserLogEntries(state, logEntries) {
			state.logEntries = logEntries;
		},
		addUserLogEntry(state, logEntry) {
			state.logEntries.unshift(logEntry);
		}
	},
	getters: {
		userName: state => state.user?.displayName ?? state.user?.email ?? ''
	}
});

export default store;