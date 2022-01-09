import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import { LogEntryModel, LogEntryType } from '@/models';
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
  loading = false;

  @Action
  async fetchCurrentYearUserLogEntries() {
    if (UserStore.user) {
      this.setLoading(true);
      const userLogEntries = await databaseService.getYearUserLogEntries(UserStore.user.uid, new Date().getFullYear());
      this.setUserLogEntries(userLogEntries);
      this.setLoading(false);
    }
  }

  @Action
  async createNewUserLogEntry(payload: { date: Date; type: LogEntryType; name: string; platform: string; rating: number; review: string; images: FileList; externalId: string }): Promise<boolean | string> {
    this.setLoading(true);
    
    try {
      const newEntryId = await databaseService.createUserLogEntry(UserStore.user.uid, payload);

      if (payload.images?.length > 0) {
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

      const newEntry = await databaseService.getUserLogEntry(UserStore.user.uid, newEntryId);

      this.tweetUserLogEntry(newEntry);

      this.addUserLogEntry(await databaseService.getUserLogEntry(UserStore.user.uid, newEntryId));
    }
    catch (error) {
      return error.toString();
    }
    finally {
      this.context.commit('setLoading', false);
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
      await databaseService.updateUserLogEntry(UserStore.user.uid, logEntry.uid, { tweetId });
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
  setLoading(loading: boolean) {
    this.loading = loading;
  }
}

export default getModule(UserLogEntriesStore);