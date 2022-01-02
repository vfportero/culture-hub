<template>
    <md-tabs md-sync-route>
      <md-tab id="tab-movie" md-label="Película" md-icon="movie" to="/new/movie" exact>
        <new-movie-log-entry></new-movie-log-entry>
      </md-tab>
      <md-tab id="tab-tvshow" md-label="Serie" md-icon="live_tv" to="/new/tvshow" exact>
        TODO
      </md-tab>
  </md-tabs>
</template>

<script lang="ts">
import NewMovieLogEntry from './NewMovieLogEntry.vue';
export default {
  components: { NewMovieLogEntry },
  name: 'NewLogEntryTabs',
};
</script>

<style scoped>

</style>