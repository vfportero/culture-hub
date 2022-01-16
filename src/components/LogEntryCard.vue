<template>
  <ion-card>
    <template v-if="logEntry">
      <ion-img :src="logEntry.images[0]" :alt="logEntry.name"></ion-img>
      <ion-card-header>
        <ion-card-subtitle>{{getEntryDate(logEntry)}}</ion-card-subtitle>
        <ion-card-title><ion-icon :icon="logEntry.typeDefinition.icon" size="small"></ion-icon> {{ logEntry.name }}</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        {{logEntry.review}}
      </ion-card-content>
      <ion-button fill="outline" @click="tweet">Tweet</ion-button>
    </template>
    <template v-else>
      <ion-thumbnail class="img-skeleton">
        <ion-skeleton-text animated></ion-skeleton-text>
      </ion-thumbnail>
      <ion-card-header>
        <ion-card-subtitle>
          <ion-skeleton-text animated></ion-skeleton-text>
        </ion-card-subtitle>
        <ion-card-title>
          <ion-skeleton-text animated></ion-skeleton-text>
        </ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-skeleton-text animated></ion-skeleton-text>
      </ion-card-content>
    </template>
  </ion-card>
</template>

<script lang="ts">
import { LogEntryModel } from '@/models';
import userLogEntries from '@/store/modules/userLogEntries';
import { IonCard, IonImg, IonCardHeader, IonThumbnail, IonButton, IonSkeletonText, IonCardSubtitle, IonCardTitle, IonIcon, IonCardContent } from '@ionic/vue';
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  name: 'LogEntryCard',
  components: {  IonCard, IonImg, IonCardHeader,IonThumbnail,IonButton, IonSkeletonText, IonCardSubtitle, IonCardTitle, IonIcon, IonCardContent },
  props: {
    logEntry: Object as PropType<LogEntryModel>
  },
  setup(props) {
    const getEntryDate = (entry: LogEntryModel) => {
      return entry.date.toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const tweet = () => {
      userLogEntries.tweetUserLogEntry(props.logEntry);
    };
    return {
      getEntryDate,
      tweet
    }
  }
});
</script>

<style scoped lang="css">
  .img-skeleton {
    width: 100%;
    height: 200px;
  }
</style>