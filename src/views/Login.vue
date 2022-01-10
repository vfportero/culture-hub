<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Login Page</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="ion-padding">
            <form class="login-form">
                <ion-button expand="block" @click="doLogin">
                    <ion-icon slot="start" :icon="logoTwitter" class="twitter-login"></ion-icon>
                    Iniciar sesión con Twitter
                </ion-button>
            </form>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonPage,
    toastController 
} from '@ionic/vue';
import { logoTwitter } from 'ionicons/icons';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import UserStore from '@/store/modules/user';
export default defineComponent({
    name: 'LoginPage',
    components: {
        IonButton,
        IonContent,
        IonHeader,
        IonTitle,
        IonIcon,
        IonToolbar,
        IonPage,
    },
    setup() {
        const router = useRouter();
        const doLogin = async () => {
          const loginResult = await UserStore.loginWithTwitter();
          if (loginResult === true) {
            router.replace('/');
          }
          else {
            (await toastController
              .create({
                message: loginResult.toString(),
                duration: 2000
              })).present();
          }
        };
        return { logoTwitter, doLogin };
    },
});
</script>

<style lang="css" scoped>
    .twitter-login {
        --background: #00acee
    }
</style>