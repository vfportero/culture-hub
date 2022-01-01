import Vue from 'vue';
import router from './router';


import VueMaterial from 'vue-material';
import VueMaterialLocales from '@undecaf/vue-material-locales';
import es from '@undecaf/vue-material-locales/dist/locale/es'


import 'vue-material/dist/vue-material.min.css';
Vue.use(VueMaterial);
Vue.use(VueMaterialLocales, [es]);

import VueNoty from 'vuejs-noty';
Vue.use(VueNoty, {
	timeout: 4000,
	progressBar: true,
	layout: 'topRight'
});


import App from './App.vue';
let app = null;
Vue.config.productionTip = false;


import {FirebaseAuth} from "@/firebase";
FirebaseAuth.onAuthStateChanged(() => { // Mount app only after firebase auth initialized
	if (!app) {
		app = new Vue({
			router,
			render: h => h(App)
		}).$mount('#app');

		app.$material.selectLocale('es');
	}
});
