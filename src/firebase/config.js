import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAlXJyAWLW7fjSrz777Bj1gRRw3etsrVKw',
  authDomain: "propertyswap-e7fa9.firebaseapp.com",
  databaseURL: 'https://propertyswap-e7fa9.firebaseio.com',
  projectId: 'propertyswap-e7fa9',
  storageBucket: 'propertyswap-e7fa9.appspot.com',
  messagingSenderId: "117802568001",
  appId: "1:117802568001:web:1146f3d0b48558c9b339c0",
  measurementId: "G-3QYS7RB3BH"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore()

export { firebase, db };