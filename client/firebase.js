import firebase from 'firebase/app'
import 'firebase/storage'



export const DB_CONFIG = {
  apiKey: "AIzaSyCbtc5iyQhog6UcnTu-dhoqcqP1jtCc6II",
  authDomain: "tso-file-storage.firebaseapp.com",
  databaseURL: "https://tso-file-storage.firebaseio.com",
  projectId: "tso-file-storage",
  storageBucket: "tso-file-storage.appspot.com",
  messagingSenderId: "501536158639"
};

firebase.initializeApp(DB_CONFIG);

export default firebase
