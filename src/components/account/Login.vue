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

<script>
	import {FirebaseAuth} from "@/firebase";

	export default {
		name: "AccountLogin",
		data() {
			return {
				email: "",
				password: "",
				errorMessage: ""
			}
		},
		mounted() {
			FirebaseAuth.onAuthStateChanged((user) => {
				if (user && this.email === "") this.$router.replace('/account').catch(() => {
				}); // User already logged
			});
		},
		methods: {
			login: function () {
				if (this.email.length < 6 || this.password.length < 4) {
					this.errorMessage = "Insert email and password";
				} else {
					let _this = this;
					FirebaseAuth.signInWithEmailAndPassword(this.email, this.password).then(() => {
						this.password = "";
						this.$router.replace('/home'); // User logged
					}).catch((error) => {
						if (error.code === 'auth/wrong-password') {
							_this.errorMessage = "Password wrong";
						} else {
							_this.errorMessage = "Check email and password";
						}
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	#account-login-container {

	}
</style>
