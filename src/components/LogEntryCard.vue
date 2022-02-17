<template>
  <ion-card>
    <template v-if="logEntry">      
      <template v-if="logEntry.images">
        <ion-slides pager v-if="logEntry.images.length > 1">
          <ion-slide v-for="image in logEntry.images" :key="image">
            <ion-img :src="image" :alt="logEntry.name"></ion-img>
          </ion-slide>
        </ion-slides>
        <ion-img v-else :src="logEntry.images[0]" :alt="logEntry.name"></ion-img>
      </template>
      <ion-card-header>
        <ion-card-subtitle>{{getEntryDate(logEntry)}}</ion-card-subtitle>
        <ion-card-title>
          <ion-icon :icon="logEntry.typeDefinition.icon" size="small"></ion-icon> {{ logEntry.name }} ({{ratingDisplay}})</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        {{ logEntry.review }}
      </ion-card-content>
      <ion-item>
        <img class="platform--icon" :src="getPlatformIcon(logEntry)" v-if="showPlatformInfo" slot="start"> 
        <ion-button slot="end" fill="clear" :id="'open-share-social-' + logEntry.uid">
          <ion-icon slot="icon-only" name="share-social"></ion-icon>
        </ion-button>
        <ion-popover :trigger="'open-share-social-' + logEntry.uid">
          <ion-content>
            <ion-list>
              <ion-item button :detail="false" @click="twitterShare">
                <ion-icon name="logo-twitter" slot="start"></ion-icon>
                <ion-label >
                  <template v-if="logEntry.tweetId">
                    Compartido en Twitter
                  </template>
                  <template v-else>
                    Compartir en Twitter
                  </template>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-popover>

      </ion-item>
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
import { LogEntryModel, LogEntryType, Platform } from '@/models';
import userLogEntries from '@/store/modules/userLogEntries';
import userStore from '@/store/modules/user';
import twitterService from '@/services/twitter';
import { IonLabel, IonList, IonContent, IonItem, IonButton, IonPopover, IonCard, IonImg, IonCardHeader, IonThumbnail, IonSkeletonText, IonCardSubtitle, IonCardTitle, IonIcon, IonCardContent, loadingController, toastController, IonSlides, IonSlide } from '@ionic/vue';
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'LogEntryCard',
  components: { IonLabel, IonList, IonContent, IonItem, IonButton, IonPopover, IonCard, IonImg, IonCardHeader,IonThumbnail, IonSkeletonText, IonCardSubtitle, IonCardTitle, IonIcon, IonCardContent, IonSlides, IonSlide },
  props: {
    logEntry: Object as PropType<LogEntryModel>
  },
  setup(props) {
    const getEntryDate = (entry: LogEntryModel) => {
      return entry.date.toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const getPlatformIcon = (entry: LogEntryModel) => {
      return `/assets/icon/${entry.platform.toLowerCase()}.svg`;
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
          {
            return props.logEntry.platform !== Platform.Theaters && props.logEntry.platform !== Platform.Tv;
          }
        case LogEntryType.TvShow:
        case LogEntryType.VideoGame:
        case LogEntryType.Album:
          return true;
        default:
          return false;
      }
    });

    const twitterShare = async() => {
      if (!props.logEntry.tweetId) {
        const loading = await loadingController
          .create({
            message: 'Publicando tweets...',
          });
        await loading.present();
        try {
          await userLogEntries.tweetUserLogEntry(props.logEntry);
        }
        catch (error) {
          const toast = await toastController
              .create({
                message: error,
                duration: 3000,
                color: 'danger',
              });
            await toast.present();
        }
        finally {
          await loading.dismiss();
          const toast = await toastController
              .create({
                message: 'Tweets publicados correctamente',
                duration: 3000,
                color: 'success',
              });
            await toast.present();
        }
        

      } else {
        twitterService.goToTweet(userStore.user.integrations.twitter.username, props.logEntry.tweetId);
      }
    };


    return {
      getEntryDate,
      ratingDisplay,
      showPlatformInfo,
      twitterShare,
      getPlatformIcon
    }
  }
});
</script>

<style scoped lang="css">
  .img-skeleton {
    width: 100%;
    height: 200px;
  }

  .platform--icon {
    height: 32px;
    margin-right: 8px;
  }

</style>