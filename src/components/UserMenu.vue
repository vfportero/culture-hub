<template>
  <div class="user-menu" v-if="userAvatar" slot="end">
    <ion-avatar  id="open-user-menu">
      <ion-img :src="userAvatar" ></ion-img>
    </ion-avatar>
    <ion-popover trigger="open-user-menu">
      <ion-content>
        <ion-list>
          <ion-item :button="true" :detail="false">
            <ion-label @click="logout">Cerrar sesión</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-popover>
  </div>
</template>

<script lang="ts">
import { IonItem, IonAvatar, IonPopover, IonList, IonContent, IonLabel, IonImg } from '@ionic/vue';
import { computed, defineComponent } from 'vue';
import UserStore from '@/store/modules/user';
export default defineComponent({
  name: 'UserMenu',
  components: {  IonItem, IonAvatar, IonPopover, IonList, IonContent, IonLabel, IonImg },
  setup() {
    const userAvatar = computed(() => {
      if (UserStore.user) {
        return UserStore.user?.avatar;
      }
      return null;      
    });

    const logout = async () => UserStore.logout();

    return {
      userAvatar,
      logout
    }
  }
});
</script>

<style scoped>
  ion-avatar {
    width: 32px;
    height: 32px;
  }
</style>