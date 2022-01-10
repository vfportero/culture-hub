import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

import { FirebaseAuth } from '@/services/firebase';
import store from './store';
import UserStore from './store/modules/user';

/* Theme variables */
import './theme/variables.css';

let app: any;

FirebaseAuth.onAuthStateChanged((user) => { // Mount app only after firebase auth initialized
  
  if (!app) {
    const app = createApp(App)
      .use(IonicVue)
      .use(store)
      .use(router);
      
    router.isReady().then(() => {
      app.mount('#app');
    });

    if (user) {
      UserStore.userLogged(user.uid);
    }
  }
});