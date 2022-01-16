<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Culture Hub</ion-title>
        <user-menu></user-menu>
      </ion-toolbar>
    </ion-header>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/app/timeline">
          <ion-icon :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonHeader, IonToolbar, IonTitle} from '@ionic/vue';
import { settingsOutline, homeOutline } from 'ionicons/icons';
import { computed, defineComponent } from 'vue';
import UserStore from '@/store/modules/user';
import UserMenu from '@/components/UserMenu.vue';
export default defineComponent({
  name: 'HomePage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet, UserMenu, IonHeader, IonToolbar, IonTitle },
  setup() {
    const userAvatar = computed(() => {
      if (UserStore.user) {
        return UserStore.user?.avatar;
      }
      return null;      
    })

    return {
      settingsOutline, 
      homeOutline, 
      userAvatar
    }
  }
});
</script>

<style scoped>
  ion-toolbar {
    padding-right: 20px;
  }
</style>