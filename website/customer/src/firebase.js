import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBpCdT3B1iSzXQCgoW7wp2csjUxv1C5nWQ",
  authDomain: "realtime-chat-97471.firebaseapp.com",
  projectId: "realtime-chat-97471",
  storageBucket: "realtime-chat-97471.appspot.com",
  messagingSenderId: "705456494997",
  appId: "1:705456494997:web:f5660108551012042f7e9c",
  measurementId: "G-41MGRSE72Q",
});

const db = firebaseApp.firestore();

export {db}