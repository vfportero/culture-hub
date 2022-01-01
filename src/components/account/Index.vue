<template>
	<div id="account-index-container">
		<md-app md-waterfall md-mode="fixed" :md-theme="userTheme">
			<md-app-toolbar class="md-primary" md-elevation="5">
				<router-link class="router-link" to="/home">
					<img class="bar-logo" src="../../assets/logo.png" alt="Logo"/>
					<span class="md-title">Vue.js Dashboard with Firebase - Account</span>
				</router-link>
			</md-app-toolbar>

			<md-app-content>
				<div class="middle-center">
					<img class="logo" src="../../assets/logo.png" alt="Logo">
					<router-view @themeChanged="themeChanged"/>
				</div>
			</md-app-content>
		</md-app>
	</div>
</template>

<script>
	export default {
		name: "AccountIndex",
		data: () => ({
			userTheme: "default",
		}),
		mounted() {
			this.themeChanged();
		},
		methods: {
			themeChanged: function () {
				if (localStorage.userTheme === "dark") this.userTheme = "dark";
				else this.userTheme = "default";
			}
		}
	}
</script>

<style lang="scss">
	#account-index-container {
		.md-app {
			height: 100vh;

			.router-link {
				display: flex;
				align-items: center;
			}

			.bar-logo {
				width: 35px !important;
			}

			.middle-center {
				position: absolute;
				top: 50%;
				left: 50%;
				width: 300px;
				transform: translate(-50%, -50%);
				-ms-transform: translate(-50%, -50%);
				text-align: center;
			}

			.logo {
				height: 200px;
			}
		}
	}
</style>
