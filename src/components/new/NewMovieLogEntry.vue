<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validate">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">
            <md-icon>movie</md-icon>
            Añadir nuevo registro de película
          </div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-datepicker v-model="form.date" md-immediately :md-disabled-dates="disabledDates"/>
              <span class="md-error" v-if="!$v.form.date.required">Requerido</span>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('rating')">
                <star-rating :item-size="20"
                  :increment="0.5" 
                  v-model="form.rating">
                </star-rating>
                <span class="md-error" v-if="!$v.form.rating.required">Requerido</span>             
                <span class="md-error" v-if="!$v.form.rating.minValue">La nota mínima es 0.5⭐</span>     
                <span class="md-error" v-if="!$v.form.rating.maxValue">La nota máxima es 5⭐</span> 
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label for="name">Nombre</label>
                <md-input name="name" id="name" autocomplete="off" v-model="form.name" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.name.required">Requerido</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('platform')">
                <label for="platform">Plataforma</label>
                <md-select name="platform" id="platform" v-model="form.platform" md-dense :disabled="sending">
                  <md-optgroup label="Streaming">
                    <md-option value="netflix">Netflix</md-option>
                    <md-option value="disney_plus">Disney+</md-option>
                    <md-option value="hbo_max">HBO Max</md-option>
                    <md-option value="amazon_prime_video">Amazon Prive Video</md-option>
                    <md-option value="filmin">Filmin</md-option>
                  </md-optgroup>
                  <md-optgroup label="Clásico">
                    <md-option value="theater">Cine</md-option>
                    <md-option value="blueray">Soporte físico</md-option>
                    <md-option value="tv">TV</md-option>
                  </md-optgroup>
                </md-select>
                <span class="md-error">Requerido</span>
              </md-field>
            </div>

          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('review')">
                <label for="review">Crítica</label>
                <md-textarea  name="review" id="review" autocomplete="off" v-model="form.review" :disabled="sending" ></md-textarea>
                <span class="md-error" v-if="!$v.form.review.required">Requerido</span>
              </md-field>
            </div>

          </div>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Añadir</md-button>
        </md-card-actions>

        <md-snackbar :md-active.sync="logEntryError">{{logEntryError}}</md-snackbar>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';

import {
	required,
	minValue,
	maxValue
} from 'vuelidate/lib/validators';
import { StarRating } from 'vue-rate-it';

export default {
	name: 'NewMovieLogEntry',
	components: {
		StarRating
	},
	mixins:
        [validationMixin],
	data: () => ({
		form: {
			name: null,
			platform: null,
			rating: null,
			review: null,
			date: new Date()
		},
		logEntryError: null
	}),
	computed: {
		sending() {
			return this.$store.state.loading;
		},
	},
	validations: {
		form: {
			name: {
				required
			},
			rating: {
				required,
				minValue: minValue(0.5),
				maxValue: maxValue(5)
			},
			platform: {
				required
			},
			date: {
				required
			},
			review: {
				required
			}
		}
	},
	methods: {
		disabledDates: date => {
			return date > new Date();
		},
		getValidationClass (fieldName) {
			const field = this.$v.form[fieldName];

			if (field) {
				return {
					'md-invalid': field.$invalid && field.$dirty
				};
			}
		},
		clearForm () {
			this.$v.$reset();
			this.form.name = null;
			this.form.rating = null;
			this.form.platform = null;
			this.form.date = null;
			this.form.review = null;
			this.logEntryError = null;
		},
		async save () {
			const result = await this.$store.dispatch('addUserLogEntry', this.form);
			if (result === true) {
				this.clearForm();
				this.$router.push('/home');
			} else {
				this.logEntryError = result;
			}
        
		},
		validate () {
			this.$v.$touch();

			if (!this.$v.$invalid) {
				this.save();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

</style>
