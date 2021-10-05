import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD1_7S4a5xpBIQy0yft8b_raYf6a-GMIcs",
    authDomain: "netflix-20-ae107.firebaseapp.com",
    projectId: "netflix-20-ae107",
    storageBucket: "netflix-20-ae107.appspot.com",
    messagingSenderId: "209145670925",
    appId: "1:209145670925:web:6b7c1daef80ab331a41444"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();

  export { auth }; 
  export default db;