<template>
  <ion-card>
    <template v-if="logEntry">
      <ion-img :src="logEntry.images[0]" :alt="logEntry.name"></ion-img>
      <ion-card-header>
        <ion-card-subtitle>{{getEntryDate(logEntry)}}</ion-card-subtitle>
        <ion-card-title>
          <ion-icon :icon="logEntry.typeDefinition.icon" size="small"></ion-icon> {{ logEntry.name }} ({{ratingDisplay}})</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        {{ logEntry.review }}
        <br/>
        <div class="platform" v-if="showPlatformInfo">
          <img class="platform--icon" :src="'/assets/icon/' + logEntry.platform + '.svg'"> 
        </div>
      </ion-card-content>
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
import { LogEntryModel, LogEntryType } from '@/models';
import { IonCard, IonImg, IonCardHeader, IonThumbnail, IonSkeletonText, IonCardSubtitle, IonCardTitle, IonIcon, IonCardContent } from '@ionic/vue';
import { computed, defineComponent, PropType } from 'vue';
export default defineComponent({
  name: 'LogEntryCard',
  components: {  IonCard, IonImg, IonCardHeader,IonThumbnail, IonSkeletonText, IonCardSubtitle, IonCardTitle, IonIcon, IonCardContent },
  props: {
    logEntry: Object as PropType<LogEntryModel>
  },
  setup(props) {
    const getEntryDate = (entry: LogEntryModel) => {
      return entry.date.toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const ratingDisplay = computed(() => {
      let result = '★'.repeat(Math.floor(props.logEntry.rating));
      if (props.logEntry.rating % 1 > 0) {
        result += '½';
      }

      return result;
    });

    const showPlatformInfo = computed(() => {
      switch (props.logEntry.type) {
        case LogEntryType.Movie:
        case LogEntryType.TvShow:
        case LogEntryType.VideoGame:
        case LogEntryType.Album:
          return true;
        default:
          return false;
      }
    });

    return {
      getEntryDate,
      ratingDisplay,
      showPlatformInfo
    }
  }
});
</script>

<style scoped lang="css">
  .img-skeleton {
    width: 100%;
    height: 200px;
  }

  .platform {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .platform .platform--icon {
    height: 32px;
    margin-right: 8px;
  }

</style>