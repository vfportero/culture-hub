<template>
	<div id="vue-js-index-container">
		<md-app md-waterfall md-mode="fixed" :md-theme="userTheme">
			<md-app-toolbar class="md-primary" md-elevation="5">
				<md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
					<md-icon>menu</md-icon>
				</md-button>
				<toolbar-main-link></toolbar-main-link>
				<div class="md-toolbar-section-end">
					Hola {{userName}}
				</div>
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
import ToolbarMainLink from './shared/ToolbarMainLink.vue';
export default {
	components: { ToolbarMainLink },
	name: 'Index',
	data: () => ({
		menuVisible: false,
		userTheme: 'default',
		menuTab: [
			{
				icon: 'home',
				title: 'Home',
				link: '/home',
				auth: true,
			},
			{
				icon: 'add',
				title: 'New',
				link: '/new',
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
		if (localStorage.userTheme === 'dark') {
			this.userTheme = 'dark';
		}
		if (this.$route.fullPath === '/') {
			this.$router.replace('/home').catch(() => {
			});
		}
	},
	computed:{
		userName() {
			return this.$store.getters.userName;
		}
	},
	methods: {
		toggleMenu() {
			this.menuVisible = !this.menuVisible;
		}
	}
};
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
