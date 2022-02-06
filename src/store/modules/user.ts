import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import { UserModel } from '@/models';
import UserLogEntriesStore from './userLogEntries';
import DatabaseService from '@/services/firebase/databaseService';
import databaseService from '@/services/firebase/databaseService';
import { FirebaseAuth, FirebaseTwitterAuth } from '@/services/firebase';
import { useRouter } from 'vue-router';

@Module({
  namespaced: true,
  dynamic: true,
  store,
  name: 'users',
})
class UserStore extends VuexModule {
  user: UserModel = null;

  get userName(): string {
    return this.user?.displayName ?? this.user?.email ?? '';
  }

  get isLoggedIn() {
    return this.user || FirebaseAuth.currentUser;
  }

  @Action
  async loginWithTwitter(): Promise<boolean | string> {
    try {
      const authResult = await FirebaseAuth.signInWithPopup(FirebaseTwitterAuth);
      if (authResult?.user) {
        const user = await DatabaseService.getUser(authResult.user.uid);
        if (!user) {
          if (authResult.additionalUserInfo.username !== 'vfportero') {
            FirebaseAuth.signOut();
            return 'Lo siento pero de momento solo yo puedo usar la aplicación. Más info en @vfportero';
          }
          const twitterCredentials = authResult.credential.toJSON();
          await databaseService.createUser(
            authResult.user.uid,
            authResult.user.email ?? authResult.additionalUserInfo.profile['email'],
            authResult.user.displayName ?? authResult.additionalUserInfo.profile['name'],
            authResult.user.photoURL ?? authResult.additionalUserInfo.profile['profile_image_url_https'],
            twitterCredentials['oauthAccessToken'],
            twitterCredentials['oauthTokenSecret'],
            authResult.additionalUserInfo.username
          );
        }
        else {
          this.userLogged(authResult.user.uid);
        }

        return true;
      }
      return false;
    }
    catch (error) {
      return error.toString();
    }
  }

  @Action
  async userLogged(userId: string) {
    const user = await DatabaseService.getUser(userId);
    if (user) {
      user.lastLoginDate = new Date();
      this.setUser(user);
      UserLogEntriesStore.fetchCurrentYearUserLogEntries();
    }
  }

  @Action
  async logout() {
    await FirebaseAuth.signOut();
    this.setUser(null);
    UserLogEntriesStore.setUserLogEntries([]);
    const router = useRouter();
    router.replace('/');
  }

  
  @Mutation
  setUser(user: UserModel) {
    this.user = user;
  }

}

export default getModule(UserStore);