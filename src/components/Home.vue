<template>
	<div>
		<h1>Home</h1>

		<div class="section">
			<md-button class="md-raised">Default</md-button>
			<md-button class="md-raised" :md-ripple="false">Ripple Off</md-button>
			<md-button class="md-raised md-primary">Primary</md-button>
			<md-button class="md-raised md-accent">Accent</md-button>
			<md-button class="md-raised" disabled>Disabled</md-button>
		</div>

		<div>You can change <b>theme color</b> in the account page</div>

		<div class="section">
			<md-field>
				<label>Marvel Movies</label>
				<md-select v-model="selectedMovies" name="movies" id="movies" multiple>
					<md-option value="iron-man">Iron Man</md-option>
					<md-option value="hulk">The Incredible Hulk</md-option>
					<md-option value="iron-man-2">Iron Man 2</md-option>
					<md-option value="thor">Thor</md-option>
					<md-option value="captain-america">Captain America</md-option>
					<md-option value="the-avengers">Marvel's The Avengers</md-option>
				</md-select>
			</md-field>
			<div>
				<strong>Selected movies:</strong>
				{{ selectedMovies }}
			</div>
		</div>

		<div class="section">
			<md-button class="md-raised md-primary" @click="showSuccess">Success noty</md-button>
			<md-button class="md-raised md-accent" @click="showError">Error noty</md-button>
		</div>

		<div class="section">
			<md-datepicker v-model="selectedDate"/>
			<md-field>
				<label>First day of a week</label>
				<md-select v-model="firstDayOfAWeek">
					<md-option value="0">Sunday</md-option>
					<md-option value="1">Monday</md-option>
				</md-select>
				<span class="md-helper-text">This config is global.</span>
			</md-field>
			<md-field>
				<label>Date format</label>
				<md-select v-model="dateFormat">
					<md-option value="yyyy-MM-dd">default</md-option>
					<md-option value="yyyy/MM/dd">yyyy/MM/dd</md-option>
					<md-option value="dd/MM/yyyy">dd/MM/yyyy</md-option>
					<md-option value="MM/dd/yyyy">MM/dd/yyyy</md-option>
				</md-select>
				<span class="md-helper-text">This config is global.</span>
			</md-field>
		</div>

		<div class="section">
			<md-switch v-model="boolean">Accent <small>(Default)</small></md-switch>
			<md-switch v-model="boolean" class="md-primary">Primary</md-switch>
		</div>

		<div class="section">
			<md-chip>Static</md-chip>
			<md-chip class="md-primary" md-deletable>Deletable</md-chip>
			<md-chip class="md-accent" md-clickable>Clickable</md-chip>
			<md-chip md-disabled>Disabled</md-chip>
		</div>

		<div class="section contact">
			<md-toolbar :md-elevation="1">
				<span class="md-title">Full</span>
			</md-toolbar>

			<md-list class="md-double-line">
				<md-subheader>Phone</md-subheader>

				<md-list-item>
					<md-icon class="md-primary">phone</md-icon>

					<div class="md-list-item-text">
						<span>(650) 555-1234</span>
						<span>Mobile</span>
					</div>

					<md-button class="md-icon-button md-list-action">
						<md-icon>sms</md-icon>
					</md-button>
				</md-list-item>

				<md-list-item class="md-inset">
					<div class="md-list-item-text">
						<span>(650) 555-1234</span>
						<span>Mobile</span>
					</div>

					<md-button class="md-icon-button md-list-action">
						<md-icon>sms</md-icon>
					</md-button>
				</md-list-item>

				<md-divider></md-divider>
				<md-subheader>Email</md-subheader>

				<md-list-item>
					<md-icon class="md-primary">email</md-icon>

					<div class="md-list-item-text">
						<span>aliconnors@example.com</span>
						<span>Personal</span>
					</div>
				</md-list-item>

				<md-list-item class="md-inset">
					<div class="md-list-item-text">
						<span>ali_connors@example.com</span>
						<span>Work</span>
					</div>
				</md-list-item>
			</md-list>
		</div>

		<div class="section">
			<md-avatar>
				<img src="../assets/logo.png" alt="Avatar">
				<md-tooltip md-direction="top">Top</md-tooltip>
			</md-avatar>

			<md-avatar>
				<img src="../assets/logo.png" alt="Avatar">
				<md-tooltip md-direction="right">Right</md-tooltip>
			</md-avatar>

			<md-avatar>
				<img src="../assets/logo.png" alt="Avatar">
				<md-tooltip md-direction="bottom">Bottom</md-tooltip>
			</md-avatar>

			<md-avatar>
				<img src="../assets/logo.png" alt="Avatar">
				<md-tooltip md-direction="left">Left</md-tooltip>
			</md-avatar>
		</div>

	</div>
</template>

<script>
	export default {
		name: "Home",
		data: () => ({
			selectedMovies: [],
			selectedDate: null,
			boolean: false
		}),
		computed: {
			firstDayOfAWeek: {
				get() {
					return this.$material.locale.firstDayOfAWeek;
				},
				set(val) {
					this.$material.locale.firstDayOfAWeek = val;
				}
			},
			dateFormat: {
				get() {
					return this.$material.locale.dateFormat;
				},
				set(val) {
					this.$material.locale.dateFormat = val;
				}
			}
		},
		methods: {
			showSuccess: function () {
				this.$noty.success("Succes!");
			},
			showError: function () {
				this.$noty.error("Error :(", {
					killer: true,
					timeout: 1500,
				});
			}
		}
	}
</script>

<style scoped>
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