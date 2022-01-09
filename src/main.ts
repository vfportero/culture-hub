import Vue from 'vue';
import router from './router';
import VueMaterial from 'vue-material';
import VueMaterialLocales from '@undecaf/vue-material-locales';
import es from '@undecaf/vue-material-locales/dist/locale/es';
import 'vue-material/dist/vue-material.min.css';
import VueNoty from 'vuejs-noty';
import App from './App.vue';
import { FirebaseAuth } from '@/services/firebase';
import store from './store';
import UserStore from './store/modules/user';
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';

Vue.use(VueMaterial);
Vue.use(VueMaterialLocales, [es]);
Vue.use(VueNoty, {
  timeout: 4000,
  progressBar: true,
  layout: 'topRight',
});
Vue.use(VueFilterDateFormat);


let app;
Vue.config.productionTip = false;



FirebaseAuth.onAuthStateChanged((user) => { // Mount app only after firebase auth initialized
  
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');

    app.$material.selectLocale('es');

    if (user) {
      UserStore.userLogged(user.uid);
    }
  }
});
