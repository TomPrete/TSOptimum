import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCbtc5iyQhog6UcnTu-dhoqcqP1jtCc6II",
  authDomain: "tso-file-storage.firebaseapp.com",
  databaseURL: "https://tso-file-storage.firebaseio.com",
  projectId: "tso-file-storage",
  // storageBucket: "tso-file-storage.appspot.com",
  storageBucket: "gs://tso-file-storage.appspot.com",
  messagingSenderId: "501536158639",
  appId: "1:501536158639:web:60dd671fc9519b4760b55a"
};

firebase.initializeApp(firebaseConfig);

export default firebase
