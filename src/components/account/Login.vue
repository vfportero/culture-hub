<template>
	<div id="account-login-container">
		

		<p>{{errorMessage}}</p>

		<md-button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--twitter" @click="login">
      <i class="fa fa-twitter fa-fw"></i> Inicia sesión con Twitter
    </md-button>
	</div>
</template>

<script lang="ts">
import { FirebaseAuth } from '@/services/firebase';
import UserStore from '@/store/modules/user';
import Vue from 'vue';
import Component from 'vue-class-component';


@Component
export default class AccountLogin extends Vue {
  errorMessage = '';

  mounted() {
    FirebaseAuth.onAuthStateChanged((user) => {
      if (user) this.$router.replace('/account').catch(() => {
      }); // User already logged
    });
  }
  
  async login() {
    const loginResult = await UserStore.loginWithTwitter();
    if (loginResult === true) {
      this.$router.replace('/home');
    }
    else {
      this.errorMessage = loginResult.toString();
    }
  }
  
}
</script>

<style lang="scss">
	#account-login-container {
    .mdl-button.mdl-button--twitter {
      color: rgb(63, 81, 181)
    }.mdl-button.mdl-button--twitter {
        color: rgb(63, 81, 181)
    }
    .mdl-button.mdl-button--twitter:focus:not(:active) {
        background-color: #00acee
    }
    .mdl-button--raised.mdl-button--twitter {
        background: #00acee;
        color: rgb(255, 255, 255)
    }
    .mdl-button--raised.mdl-button--twitter:hover {
        background-color: #00acee
    }
    .mdl-button--raised.mdl-button--twitter:active {
        background-color: #00acee
    }
    .mdl-button--raised.mdl-button--twitter:focus:not(:active) {
        background-color: #00acee
    }
    .mdl-button--raised.mdl-button--twitter .mdl-ripple {
        background: rgb(255, 255, 255)
    }
	}
</style>
