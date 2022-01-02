<template>
    <md-tabs md-sync-route>
      <md-tab id="tab-movie" md-label="Película" md-icon="movie" to="/new/movie" exact>
        <new-movie-log-entry></new-movie-log-entry>
      </md-tab>
      <md-tab id="tab-tvshow" md-label="Serie" md-icon="live_tv" to="/new/tvshow" exact>
        <new-tvshow-log-entry></new-tvshow-log-entry>
      </md-tab>
  </md-tabs>
</template>

<script>
import NewMovieLogEntry from './NewMovieLogEntry.vue';
import NewTvshowLogEntry from './NewTvshowLogEntry.vue';
export default {
	components: { NewMovieLogEntry, NewTvshowLogEntry },
	name: 'NewLogEntryTabs',
};
</script>

<style scoped>

</style>