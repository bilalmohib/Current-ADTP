import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBBIftGf2_uFyc3fXNsHWiiax-hR3awuL0",
  authDomain: "agenciesthatdontpay.firebaseapp.com",
  projectId: "agenciesthatdontpay",
  storageBucket: "agenciesthatdontpay.appspot.com",
  messagingSenderId: "845627146040",
  appId: "1:845627146040:web:cd3c443de9630ec0418bcd",
  measurementId: "G-BEXGWTM17M"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
