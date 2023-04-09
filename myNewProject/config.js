import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCLdLvpziLgcbTMAM3KTLkuRwEPo5K4Vs8",
  authDomain: "mynewproject-2bcb3.firebaseapp.com",
  projectId: "mynewproject-2bcb3",
  storageBucket: "mynewproject-2bcb3.appspot.com",
  messagingSenderId: "637732340313",
  appId: "1:637732340313:web:cef6344ac649d8ab436748",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };