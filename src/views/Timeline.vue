<template>
  <ion-page>
    <ion-content fullscreen padding>
      <ion-title>Timeline</ion-title>
      
      <template v-if="loading"> 
        <log-entry-card v-for="i of [1,2,3,4,5]" :key="i"></log-entry-card>
      </template>
      <template v-else>
        <log-entry-card v-for="logEntry in logEntries" :key="logEntry.id" :log-entry="logEntry"></log-entry-card>
      </template>

    </ion-content>
    <ion-fab vertical="bottom" horizontal="end">
      <ion-fab-button>
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>
      <ion-fab-list side="top">
        <ion-fab-button  @click="createNewLogEntry(LogEntryType.Movie)">
          <ion-icon name="film"></ion-icon>
        </ion-fab-button>
        <ion-fab-button  @click="createNewLogEntry(LogEntryType.TvShow)">
          <ion-icon name="tv"></ion-icon>
        </ion-fab-button>
        <ion-fab-button  @click="createNewLogEntry(LogEntryType.VideoGame)">
          <ion-icon name="game-controller"></ion-icon>
        </ion-fab-button>
        <ion-fab-button  @click="createNewLogEntry(LogEntryType.BoardGame)">
          <ion-icon name="dice"></ion-icon>
        </ion-fab-button>
        <ion-fab-button  @click="createNewLogEntry(LogEntryType.Book)">
          <ion-icon name="book"></ion-icon>
        </ion-fab-button>
        <ion-fab-button  @click="createNewLogEntry">
          <ion-icon name="ellipsis-horizontal"></ion-icon>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>   
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonIcon, IonFab, IonFabButton, IonFabList, IonTitle  } from '@ionic/vue';
import { calendarClearOutline } from 'ionicons/icons';
import { defineComponent, computed } from 'vue';
import UserLogEntriesStore from '@/store/modules/userLogEntries';
import LogEntryCard from '@/components/LogEntryCard.vue';
import { useRouter } from 'vue-router';
import { LogEntryType } from '@/models';

export default defineComponent({
  name: 'HomePage',
  components: { IonPage, IonIcon, IonContent, LogEntryCard, IonFab, IonFabButton, IonFabList, IonTitle  },
  setup() {
    const router = useRouter();
    const logEntries = computed(() => UserLogEntriesStore.currentYearLogEntries);
    const createNewLogEntry = (logEntryType: LogEntryType) => router.push('/new-log-entry/' + logEntryType);
    const loading = computed(() => UserLogEntriesStore.loading);

    return {
      logEntries,
      calendarClearOutline,
      createNewLogEntry,
      LogEntryType,
      loading
    }
  }
});
</script>

<style scoped>

</style>