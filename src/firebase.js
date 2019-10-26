import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBbENbmeOGDzt7SHsmdmKe8bGakyPci1MY",
    authDomain: "tree-d-plant-f1ef8.firebaseapp.com",
    databaseURL: "https://tree-d-plant-f1ef8.firebaseio.com",
    projectId: "tree-d-plant-f1ef8",
    storageBucket: "tree-d-plant-f1ef8.appspot.com",
    messagingSenderId: "718007493894",
    appId: "1:718007493894:web:5144a833c473642a666a87",
    measurementId: "G-7PFT378KLT"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  const storage=firebase.storage();

  export {
      storage,firebase as default
  }