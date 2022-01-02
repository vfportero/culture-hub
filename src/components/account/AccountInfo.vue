<template>
	<div id="account-info-container">
		<div v-if="!loading" class="center">
			<p><b>Email:</b> {{email}}</p>
			<div>
				<md-switch v-model="themeSwitch" @change="changeTheme">Theme light/dark</md-switch>
			</div>
			<p>
				<router-link to="/">Home page</router-link>
			</p>
			<md-button class="md-raised md-primary" @click="logout">Logout</md-button>
		</div>
	</div>
</template>

<script lang="ts">
import { FirebaseAuth } from '@/firebase';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
})
export default class AccountInfo extends Vue {

  loading = true;
  email = '';
  themeSwitch=  false; // false = 'default'; true = 'dark'

  mounted() {
    if (localStorage.userTheme === 'dark') {
      this.themeSwitch = true;
    }
    FirebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        this.email = user.email;
        this.loading = false;
      } else this.$router.replace('/account/login').catch(() => {
      }); // User not logged
    });
  }


  changeTheme() {
    if (this.themeSwitch) localStorage.userTheme = 'dark';
    else localStorage.userTheme = 'light';
    this.$emit('themeChanged');
  }

  logout() {
    this.loading = true;
    FirebaseAuth.signOut();
  }
  
}
</script>

<style lang="scss">
	#account-info-container {
		.center {
			text-align: center;
		}
	}
</style>
