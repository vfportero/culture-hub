<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Login Page</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content padding>
            <form novalidate>
                <ion-list>
                    <ion-row>
                        <ion-col size-lg="4" offset-lg="4">
                            <ion-button @click="doTwitterLogin" class="twitter-button" expand="full">
                                <ion-icon name="logo-twitter" style="font-size:32px"></ion-icon> Iniciar sesión con twitter
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-list>
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
    toastController,
    loadingController
} from '@ionic/vue';
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
        const doTwitterLogin = async () => {
            const loadingIndicator = await loadingController.create({
                message: 'Iniciando sesión...',
                spinner: 'crescent'
            });
            loadingIndicator.present();
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
            loadingIndicator.dismiss();
        };
        return { doTwitterLogin };
    },
});
</script>

<style lang="css" scoped>
    .twitter-button {
        --background: #1DA1F2;
    }
</style>