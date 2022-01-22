import { LogEntryModel, LogEntryType, LogEntryTypeDefinition, Platform, UserModel } from '@/models';
import { FirebaseDatabase } from '.';
import { LogEntry, User } from '@/models/domain';
import { firestore } from 'firebase';

class DatabaseService {

  userCollection = FirebaseDatabase.collection('users');
  userLogEntriesCollection = FirebaseDatabase.collection('user_log_entries');

  async getUser(userId: string): Promise<UserModel | null> {
    const userRef = (await this.userCollection.doc(userId).get());
    if (userRef.exists) {
      const docData = userRef.data();
      if (docData) { 
        return {
          uid: userRef.id,
          displayName: docData.displayName,
          email: docData.email,
          lastLoginDate: docData.lastLoginDate,
          avatar: docData.avatar,
          twitterTokenSecret: docData.twitterTokenSecret,
          twitterAccessToken: docData.twitterAccessToken,
        };
      }
    }
    return null;
  }

  async createUser(uid: string, email: string, displayName: string, avatar: string, twitterAccessToken: string, twitterTokenSecret: string) {
    const user: User = {
      displayName: displayName,
      email: email,
      lastLoginDate: new Date(),
      avatar: avatar,
      twitterTokenSecret: twitterTokenSecret,
      twitterAccessToken: twitterAccessToken,
    };
    return this.userCollection.doc(uid).set(user);
  }

  async updateUser(user: UserModel): Promise<void> {
    const userRef = await this.userCollection.doc(user.uid);
    userRef.update({
      ...user,
      displayName: user.displayName,
      email: user.email,
      lastLoginDate: user.lastLoginDate,
      avatar: user.avatar,
      twitterTokenSecret: user.twitterTokenSecret,
      twitterAccessToken: user.twitterAccessToken,
    });
  }

  async getYearUserLogEntries(userId: string, year: number): Promise<LogEntryModel[]> {
    const userLogEntries = await this.userLogEntriesCollection.doc(userId).collection('log_entries').where('year', '==', year).orderBy('date', 'desc').orderBy('createdDate', 'desc').get();

    return await userLogEntries.docs.map(doc => {
      return this.mapToLogEntryModel(doc.id, doc.data());
    });
  }

  async getUserLogEntries(userId: string): Promise<LogEntryModel[]> {
    const userLogEntries = await this.userLogEntriesCollection.doc(userId).collection('log_entries').orderBy('date', 'desc').orderBy('createdDate', 'desc').get();
    return await userLogEntries.docs.map(doc => {
      return this.mapToLogEntryModel(doc.id, doc.data());
    });
  }

  mapToLogEntryModel(uid: string, docData: firestore.DocumentData): LogEntryModel {
    return {
      type: docData.type,
      name: docData.name,
      platform: docData.platform,
      rating: docData.rating,
      review: docData.review,
      externalId: docData.externalId,
      images: docData.images,
      typeDefinition: new LogEntryTypeDefinition(docData.type),
      uid: uid,
      date: new Date(docData.date.seconds * 1000),
      createdDate: new Date(docData.createdDate.seconds * 1000),
      updatedDate: new Date(docData.updatedDate.seconds * 1000),
      year: docData.year,
      tweetId: docData.tweetId,
    };
  }

  async createUserLogEntry(userId: string, payload: { date: Date; type: LogEntryType; name: string; platform: Platform; rating: number; review: string; externalId: string }): Promise<string> {
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
      externalId: payload.externalId,
      year: payload.date.getFullYear(),
    };

    const newEntry = await this.userLogEntriesCollection.doc(userId).collection('log_entries').add(newLogEntry);
    return newEntry.id;
  }

  async getUserLogEntry(userId: string, entryId: string): Promise<LogEntryModel | null> {
    const userLogEntryRef = (await this.userLogEntriesCollection.doc(userId).collection('log_entries').doc(entryId).get());
    if (userLogEntryRef.exists) {
      return this.mapToLogEntryModel(userLogEntryRef.id, userLogEntryRef.data());
    }
    return null;
  }

  async updateUserLogEntry(userId: string, entryId: string, payload: { date?: Date; name?: string; platform?: string; rating?: number; review?: string; images?: string[]; tweetId?: string }): Promise<void> {
    const userLogEntry = await this.userLogEntriesCollection.doc(userId).collection('log_entries').doc(entryId);
    await userLogEntry.update({
      ...payload,
    });
  }
}

export default new DatabaseService();