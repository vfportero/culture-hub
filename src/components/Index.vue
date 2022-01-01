<template>
	<div id="vue-js-index-container">
		<md-app md-waterfall md-mode="fixed" :md-theme="userTheme">
			<md-app-toolbar class="md-primary" md-elevation="5">
				<md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
					<md-icon>menu</md-icon>
				</md-button>
				<router-link class="router-link" to="/home">
					<img class="bar-logo" src="../assets/logo.png" alt="Logo"/>
					<span class="md-title">Vue.js Dashboard with Firebase</span>
				</router-link>
			</md-app-toolbar>

			<md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
				<md-toolbar class="md-transparent" md-elevation="3">
					<span>Navigation</span>
					<div class="md-toolbar-section-end">
						<md-button class="md-icon-button md-dense" @click="toggleMenu">
							<md-icon>keyboard_arrow_left</md-icon>
						</md-button>
					</div>
				</md-toolbar>

				<md-list>
					<div v-for="tab in menuTab" :key="tab.title">
						<router-link :to="tab.link">
							<md-list-item v-if="tab.auth" :class="{'active': $route.fullPath.includes(tab.link)}">
								<md-icon class="md-icon">{{tab.icon}}</md-icon>
								<span class="md-list-item-text">{{tab.title}}</span>
							</md-list-item>
						</router-link>
					</div>
				</md-list>
			</md-app-drawer>

			<md-app-content>
				<router-view/>
			</md-app-content>
		</md-app>
	</div>
</template>

<script>
	export default {
		name: 'Index',
		data: () => ({
			menuVisible: false,
			userTheme: "default",
			menuTab: [
				{
					icon: 'home',
					title: 'Home',
					link: '/home',
					auth: true,
				},
				{
					icon: 'place',
					title: 'Ciao',
					link: '/ciao',
					auth: true,
				},
				{
					icon: 'map',
					title: 'Error 404 ;)',
					link: '/ciao-ciao-error-404',
					auth: true,
				},
				{
					icon: 'info',
					title: 'Info',
					link: '/info',
					auth: true,
				},
				{
					icon: 'person',
					title: 'Account',
					link: '/account',
					auth: true,
				}
			]
		}),
		mounted() {
			if (localStorage.userTheme === "dark") {
				this.userTheme = "dark";
			}
			if (this.$route.fullPath === '/') {
				this.$router.replace('/home').catch(() => {
				});
			}
		},
		methods: {
			toggleMenu() {
				this.menuVisible = !this.menuVisible;
			}
		}
	}
</script>

<style lang="scss">
	@import "../../src/style/variables.scss";

	#vue-js-index-container {
		.md-app {
			height: 100vh;

			.router-link {
				display: flex;
				align-items: center;
			}

			.bar-logo {
				width: 35px !important;
			}

			.md-app-drawer {
				max-width: 300px !important;
			}

			.md-list-item {

				&:hover {
					.md-icon {
						color: $accent;
						opacity: 0.8;
					}

					.md-list-item-text {
						color: $accent;
						transition: color .4s cubic-bezier(.4,0,.2,1);
						opacity: 0.8;
					}
				}

				&.active {
					.md-icon {
						color: $accent;
					}

					.md-list-item-text {
						color: $accent;
					}
				}

				.md-list-item-text {
					font-weight: bold;
				}
			}
		}
	}
</style>
