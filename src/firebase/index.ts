import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebaseCredentials from './credentials';
firebase.initializeApp(firebaseCredentials.config);

const FirebaseAuth = firebase.auth();
const FirebaseDatabase = firebase.firestore();
const FirebaseStorage = firebase.storage();

export {
  FirebaseAuth,
  FirebaseDatabase,
  FirebaseStorage
};