import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDOorzy_UCYAuxX26WHxlI7EnciyH411Gw",
  authDomain: "adtp-a04bd.firebaseapp.com",
  projectId: "adtp-a04bd",
  storageBucket: "adtp-a04bd.appspot.com",
  messagingSenderId: "596482222382",
  appId: "1:596482222382:web:cc73922b18932899c772bf",
  measurementId: "G-8CPSE0XK0M"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

let storage = firebase.storage();

export {
  firebase as default,
  storage
};
