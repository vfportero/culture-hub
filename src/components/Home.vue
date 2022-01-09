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
        <md-card class="md-layout-item md-size-50 md-small-size-100" v-for="logEntry in logEntries" :key="logEntry.id">
          <md-card-header>
            <md-card-header-text>
              <h2 class="md-title">
                <md-icon>{{logEntry.typeDefinition.icon}}</md-icon> {{ logEntry.name }}</h2>
              <div class="md-subhead">
                <md-icon>event</md-icon> {{ logEntry.date | dateFormat('DD/MM/YYYY') }}
              </div>
            </md-card-header-text>
            <md-card-media md-medium>
              <img :src="logEntry.images[0]" :alt="logEntry.name">
            </md-card-media>
          </md-card-header>
          <md-card-content>
            <div v-html="logEntry.review"></div>
          </md-card-content>
        </md-card>
      </div>
      
    </div>

  </div>
</template>

<script lang="ts">
import { LogEntry } from '@/models/domain';
import UserLogEntriesStore from '@/store/modules/userLogEntries';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Home extends Vue {
  get logEntries(): LogEntry[] {
    return UserLogEntriesStore.currentYearLogEntries;
  }

  get loading(): boolean{
    return UserLogEntriesStore.loading;
  }
}
</script>

<style scoped lang="scss">
  .md-fab {
    position: fixed;
    bottom: 16px;
    right: 16px;
  }

	.md-card-header {
		.md-card-media {
			&.md-big, &.md-medium {
				height: 100%;
			}
		}

    .md-card-content {
      white-space: pre-wrap;
      line-break: anywhere;
    }
	}
 
</style>