import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import { LogEntry, LogEntryType, LogEntryTypeDefinition, User } from '@/models';
import { FirebaseDatabase, FirebaseStorage } from '@/firebase';

@Module({
  namespaced: true,
  dynamic: true,
  store,
  name: 'user_log_entries',
})
class UserLogEntriesStore extends VuexModule {
  user: User = null;
  logEntries: LogEntry[] = [];
  loading: boolean = false;

  get userName(): string {
    return this.user?.displayName ?? this.user?.email ?? '';
  }

  @Action
  userLogged(user: User) {
    this.context.commit('setUser', user);
    this.context.dispatch('fetchUserLogEntries');
  }

  @Action
  async fetchUserLogEntries() {
    if (this.user) {
      this.context.commit('setLoading', true);
      const userLogEntries = await FirebaseDatabase.collection('user_log_entries').doc(this.user.uid).collection('log_entries').orderBy('date', 'desc').orderBy('createdDate', 'desc').get();
      const mappedEntries = await userLogEntries.docs.map(doc => {
        const docData = doc.data();
        const entry = {
          ...docData,
          typeDefinition: new LogEntryTypeDefinition(docData.type),
          uid: doc.id,
          date: new Date(docData.date.seconds * 1000),
          createdDate: new Date(docData.createdDate.seconds * 1000),
          updatedDate: new Date(docData.updatedDate.seconds * 1000),
        };
        return entry;
      });
      this.context.commit('setUserLogEntries', mappedEntries);
      this.context.commit('setLoading', false);
    }
  }

  @Action
  async createNewUserLogEntry(payload: { date: Date, type: LogEntryType, name: string, platform: string, rating: number, review: string, images: FileList, externalId: string, }): Promise<boolean | string> {
    this.context.commit('setLoading', true);
    try {
      var storageRef = FirebaseStorage.ref();
      const imageUrls = [];

      for (const image of Array.from(payload.images)) {
        const result = await storageRef.child(image.name).put(image);
        if (result.state === 'success') {
          imageUrls.push(await result.ref.getDownloadURL());
        }
      }

      debugger; // eslint-disable-line

      const now = new Date();
      const newLogEntry: LogEntry = {
        createdDate: now,
        updatedDate: now,
        date: payload.date,
        type: payload.type,
        name: payload.name,
        platform: payload.platform,
        rating: payload.rating,
        review: payload.review,
        images: imageUrls,
        externalId: payload.externalId
      };
    
    
      const userLogEntries = await FirebaseDatabase.collection('user_log_entries').doc(this.user.uid).collection('log_entries');
      const newEntry = await userLogEntries.add(newLogEntry);
      newLogEntry.uid = newEntry.id;
      this.context.commit('addUserLogEntry', newLogEntry);
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
  setUser(user: User) {
    this.user = user;
  }

  @Mutation
  setUserLogEntries(logEntries: LogEntry[]) {
    this.logEntries = logEntries;
  }

  @Mutation
  addUserLogEntry(logEntry: LogEntry) {
    this.logEntries.unshift(logEntry);
  }

  @Mutation
  setLoading(loading: boolean) {
    this.loading = loading;
  }
}

export default getModule(UserLogEntriesStore);