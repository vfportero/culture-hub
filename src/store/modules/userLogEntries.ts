import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import { LogEntryModel, LogEntryType } from '@/models';
import { FirebaseStorage } from '@/services/firebase';
import UserStore from './user';
import databaseService from '@/services/firebase/databaseService';


@Module({
  namespaced: true,
  dynamic: true,
  store,
  name: 'user_log_entries',
})
class UserLogEntriesStore extends VuexModule {
  logEntries: LogEntryModel[] = [];
  loading: boolean = false;

  @Action
  async fetchUserLogEntries() {
    if (UserStore.user) {
      this.setLoading(true);
      const userLogEntries = await databaseService.getUserLogEntries(UserStore.user.uid);
      this.setUserLogEntries(userLogEntries);
      this.setLoading(false);
    }
  }

  @Action
  async createNewUserLogEntry(payload: { date: Date, type: LogEntryType, name: string, platform: string, rating: number, review: string, images: FileList, externalId: string, }): Promise<boolean | string> {
    this.setLoading(true);
    
    try {
      const newEntryId = await databaseService.createUserLogEntry(UserStore.user.uid, payload);

      if (payload.images?.length > 0) {
        var storageRef = FirebaseStorage.ref();
        const imageUrls: string[] = [];

        for (const image of Array.from(payload.images)) {
          const result = await storageRef.child(`${newEntryId}/${image.name}`).put(image);
          if (result.state === 'success') {
            imageUrls.push(await result.ref.getDownloadURL());
          }
        }

        await databaseService.updateUserLogEntry(UserStore.user.uid, newEntryId, { images: imageUrls });
      }

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

  @Mutation
  setUserLogEntries(logEntries: LogEntryModel[]) {
    this.logEntries = logEntries;
  }

  @Mutation
  addUserLogEntry(logEntry: LogEntryModel) {
    this.logEntries.unshift(logEntry);
  }

  @Mutation
  setLoading(loading: boolean) {
    this.loading = loading;
  }
}

export default getModule(UserLogEntriesStore);