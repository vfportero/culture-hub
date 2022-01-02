import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import { LogEntry, User } from '@/models';
import { FirebaseDatabase } from '@/firebase';

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
      const userLogEntries = await FirebaseDatabase.collection('user_log_entries').doc(this.user.uid).collection('log_entries').get();
      this.context.commit('setUserLogEntries', await userLogEntries.docs.map(doc => doc.data()));
      this.context.commit('setLoading', false);
    }
  }

  @Action
  async createNewUserLogEntry(logEntry: LogEntry): Promise<boolean | string> {
    const newLogEntry = {
      ...logEntry,
      created_date: new Date()
    };
    this.context.commit('setLoading', true);
    try {
      const userLogEntries = await FirebaseDatabase.collection('user_log_entries').doc(this.user.uid).collection('log_entries');
      
      await userLogEntries.add(newLogEntry);
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