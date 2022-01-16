<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang='ts'>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>

<style >
:root {
}
.ion-page > ion-content {
  --padding-top: 32px
}

</style>
