<template>
  <div>
		<md-tabs md-sync-route>
      <md-tab :id="typeDefinition.type" :md-label="typeDefinition.name" :md-icon="typeDefinition.icon" :to='"/new/" + typeDefinition.type' exact v-for="typeDefinition in types" :key="typeDefinition.type">
        <new-log-entry-form :type="typeDefinition.type"></new-log-entry-form>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script lang="ts">
import { LogEntryType, LogEntryTypeDefinition } from '@/models';
import Vue from 'vue';
import Component from 'vue-class-component';
import NewLogEntryForm from './NewLogEntryForm.vue';

@Component({
  components: {
    NewLogEntryForm
  },
})
export default class NewLogEntry extends Vue{

  get types(): LogEntryTypeDefinition[] {
    return Object.keys(LogEntryType).map(key => new LogEntryTypeDefinition(LogEntryType[key]));
  }
  
}
</script>

<style lang="scss" scoped>

</style>
