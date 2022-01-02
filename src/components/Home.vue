<template>
	<div>
		<h1>Home</h1>

		<md-button class="md-fab md-primary" to="/new/movie">
			<md-icon>add</md-icon>
		</md-button>

		<div class="section">
			<h2>¿Qué has estado viendo/haciendo ultimamente?</h2>
			<md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate" v-if="loading"></md-progress-spinner>

			<div class="md-layout">
				<md-card class="md-layout-item" v-for="logEntry in logEntries" :key="logEntry.id">
					<md-card-media>
						<img :src="logEntry.image_url" :alt="logEntry.name">
					</md-card-media>
					<md-card-header>
						<h3>{{ logEntry.name }}</h3>
						<h4>{{ logEntry.platform }}</h4>
					</md-card-header>
					<md-card-content>
						{{logEntry.review}}
					</md-card-content>
				</md-card>
			</div>
			
		</div>

	</div>
</template>

<script>
	export default {
		name: "Home",
		data: () => ({
		}),
		computed: {
			logEntries() {
				return this.$store.state.logEntries;
			},
			loading() {
        return this.$store.state.loading;
      },
		},
	}
</script>

<style scoped>
	.md-fab {
		position: fixed;
		bottom: 16px;
		right: 16px;
	}
	.md-field {
		max-width: 500px;
	}

	.section {
		margin-bottom: 50px;
	}

	.contact {
		width: 320px;
		max-width: 100%;
		display: inline-block;
		vertical-align: top;
		overflow: auto;
		border: 1px solid orange;
	}

	.md-avatar {
		margin: 36px;
	}
</style>