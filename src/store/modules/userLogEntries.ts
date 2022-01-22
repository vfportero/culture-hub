import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import { LogEntryModel, LogEntryType, UserLogEntriesLoadingStatus } from '@/models';
import { FirebaseStorage } from '@/services/firebase';
import UserStore from './user';
import databaseService from '@/services/firebase/databaseService';
import TwitterService from '@/services/twitter';
import { loadingController } from '@ionic/vue';

@Module({
  namespaced: true,
  dynamic: true,
  store,
  name: 'user_log_entries',
})
class UserLogEntriesStore extends VuexModule {
  currentYearLogEntries: LogEntryModel[] = [];
  loadingStatus: UserLogEntriesLoadingStatus = UserLogEntriesLoadingStatus.idle;

  @Action
  async fetchCurrentYearUserLogEntries() {
    if (UserStore.user) {
      this.setLoadingStatus(UserLogEntriesLoadingStatus.commuicatingWithServer);
      const userLogEntries = await databaseService.getYearUserLogEntries(UserStore.user.uid, new Date().getFullYear());
      this.setUserLogEntries(userLogEntries);
      this.setLoadingStatus(UserLogEntriesLoadingStatus.idle);
    }
  }

  @Action
  async createNewUserLogEntry(payload: { date: Date; type: LogEntryType; name: string; platform: string; rating: number; review: string; images: File[]; externalId: string }): Promise<boolean | string> {
    const loading = await loadingController
      .create({
        message: 'Creando nuevo registro...',
      });
        
    await loading.present();
    
    this.setLoadingStatus(UserLogEntriesLoadingStatus.commuicatingWithServer);
    
    try {
      const newEntryId = await databaseService.createUserLogEntry(UserStore.user.uid, payload);

      if (payload.images?.length > 0) {
        this.setLoadingStatus(UserLogEntriesLoadingStatus.uploadingMedia);
        loading.message = 'Subiendo imágenes...';
        const storageRef = FirebaseStorage.ref();
        const imageUrls: string[] = [];

        for (const image of Array.from(payload.images)) {
          const result = await storageRef.child(`${newEntryId}/${image.name}`).put(image);
          if (result.state === 'success') {
            imageUrls.push(await result.ref.getDownloadURL());
          }
        }

        await databaseService.updateUserLogEntry(UserStore.user.uid, newEntryId, { images: imageUrls });
      }

      loading.message = 'Guardando registro...';
      this.setLoadingStatus(UserLogEntriesLoadingStatus.commuicatingWithServer);

      const newEntry = await databaseService.getUserLogEntry(UserStore.user.uid, newEntryId);

      this.setLoadingStatus(UserLogEntriesLoadingStatus.publishingTweet);
      loading.message = 'Publicando tweets...';
      this.tweetUserLogEntry(newEntry);
      this.setLoadingStatus(UserLogEntriesLoadingStatus.commuicatingWithServer);

      this.addUserLogEntry(await databaseService.getUserLogEntry(UserStore.user.uid, newEntryId));
    }
    catch (error) {
      return error.toString();
    }
    finally {
      this.setLoadingStatus(UserLogEntriesLoadingStatus.idle);
      loading.dismiss();

    }

    return true;
  }

  @Action
  async tweetUserLogEntry(logEntry: LogEntryModel) {
    let lastTweetId: string;
    for (const logEntry of this.currentYearLogEntries) {
      if (logEntry.tweetId) {
        lastTweetId = logEntry.tweetId;
        break;
      }
    }

    if (lastTweetId) {
      const tweetId = await TwitterService.notifyLogEntry(this.currentYearLogEntries.length, lastTweetId, logEntry, UserStore.user.twitterAccessToken, UserStore.user.twitterTokenSecret);
      await databaseService.updateUserLogEntry(UserStore.user.uid, logEntry.uid, { tweetId: tweetId });
      this.setUserLogEntryTweetId(logEntry.uid, tweetId);
    }
  }

  @Mutation
  setUserLogEntries(logEntries: LogEntryModel[]) {
    this.currentYearLogEntries = logEntries;
  }

  @Mutation
  setUserLogEntryTweetId(logEntryId: string, tweetId: string) {
    const logEntry = this.currentYearLogEntries.find(x => x.uid === logEntryId);
    if (logEntry) {
      logEntry.tweetId = tweetId;
    }
  }

  @Mutation
  addUserLogEntry(logEntry: LogEntryModel) {
    this.currentYearLogEntries.unshift(logEntry);
  }

  @Mutation
  setLoadingStatus(loading: UserLogEntriesLoadingStatus) {
    this.loadingStatus = loading;
  }
}

export default getModule(UserLogEntriesStore);