<template>
	<div id="account-login-container">
		<md-field>
			<label>Email</label>
			<md-input id="email" v-model="email"></md-input>
		</md-field>

		<md-field>
			<label>Password</label>
			<md-input id="password" v-model="password" type="password"></md-input>
		</md-field>

		<p>{{errorMessage}}</p>

		<md-button class="md-raised md-primary" @click="login">Login</md-button>
	</div>
</template>

<script lang="ts">
import {FirebaseAuth} from '@/firebase';
import UserLogEntriesStore from '@/store/modules/userLogEntries';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class AccountLogin extends Vue {
  email = '';
  password = '';
  errorMessage = '';

  mounted() {
    FirebaseAuth.onAuthStateChanged((user) => {
      if (user && this.email === '') this.$router.replace('/account').catch(() => {
      }); // User already logged
    });
  }
  
  
  login() {
    if (this.email.length < 6 || this.password.length < 4) {
      this.errorMessage = 'Insert email and password';
    } else {
      FirebaseAuth.signInWithEmailAndPassword(this.email, this.password).then(() => {
        this.password = '';
        UserLogEntriesStore.userLogged({
          uid: FirebaseAuth.currentUser.uid,
          email: FirebaseAuth.currentUser.email,
          displayName: FirebaseAuth.currentUser.displayName,
        });
        this.$router.replace('/home'); // User logged
      }).catch((error) => {
        if (error.code === 'auth/wrong-password') {
          this.errorMessage = 'Password wrong';
        } else {
          this.errorMessage = 'Check email and password';
        }
      });
    }
  }
  
}
</script>

<style lang="scss">
	#account-login-container {

	}
</style>
