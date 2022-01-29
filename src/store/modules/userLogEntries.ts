import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import { LogEntryModel, LogEntryType, Platform, UserLogEntriesLoadingStatus } from '@/models';
import { FirebaseStorage } from '@/services/firebase';
import UserStore from './user';
import databaseService from '@/services/firebase/databaseService';
import TwitterService from '@/services/twitter';

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
      this.setLoadingStatus(UserLogEntriesLoadingStatus.communicatingWithServer);
      const userLogEntries = await databaseService.getYearUserLogEntries(UserStore.user.uid, new Date().getFullYear());
      this.setUserLogEntries(userLogEntries);
      this.setLoadingStatus(UserLogEntriesLoadingStatus.idle);
    }
  }

  @Action
  async createNewUserLogEntry(payload: { date: Date; type: LogEntryType; name: string; platform: Platform; rating: number; review: string; images: File[]; externalId: string }): Promise<boolean | string> {    
    this.setLoadingStatus(UserLogEntriesLoadingStatus.communicatingWithServer);
    
    try {
      const newEntryId = await databaseService.createUserLogEntry(UserStore.user.uid, payload);

      if (payload.images?.length > 0) {
        this.setLoadingStatus(UserLogEntriesLoadingStatus.uploadingMedia);
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

      
      this.setLoadingStatus(UserLogEntriesLoadingStatus.communicatingWithServer);

      const newEntry = await databaseService.getUserLogEntry(UserStore.user.uid, newEntryId);

      
      await this.tweetUserLogEntry(newEntry);

      this.addUserLogEntry(await databaseService.getUserLogEntry(UserStore.user.uid, newEntryId));
    }
    catch (error) {
      return error.toString();
    }
    finally {
      this.setLoadingStatus(UserLogEntriesLoadingStatus.idle);

    }

    return true;
  }

  @Action
  async tweetUserLogEntry(logEntry: LogEntryModel) : Promise<string> {
    let lastTweetId: string;
    for (const logEntry of this.currentYearLogEntries) {
      if (logEntry.tweetId) {
        lastTweetId = logEntry.tweetId;
        break;
      }
    }

    if (lastTweetId) {
      this.setLoadingStatus(UserLogEntriesLoadingStatus.publishingTweet);

      const tweetId = await TwitterService.notifyLogEntry(this.currentYearLogEntries.length, lastTweetId, logEntry, UserStore.user.twitterAccessToken, UserStore.user.twitterTokenSecret);

      this.setLoadingStatus(UserLogEntriesLoadingStatus.communicatingWithServer);

      await databaseService.updateUserLogEntry(UserStore.user.uid, logEntry.uid, { tweetId });
      this.setUserLogEntryTweetId(logEntry.uid, tweetId);

      return tweetId;
    }

    return null;
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