import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseCredentials from './credentials';
firebase.initializeApp(firebaseCredentials.config);

const FirebaseAuth = firebase.auth();
const FirebaseDatabase = firebase.firestore();

export {
  FirebaseAuth,
  FirebaseDatabase
};