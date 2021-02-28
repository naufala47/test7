import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCtp4Q7a5_BV_VEMnJdhbSZ-GOhr0EZ4wY",
    authDomain: "nativenaufala.firebaseapp.com",
    databaseURL: "https://nativenaufala-default-rtdb.firebaseio.com",
    projectId: "nativenaufala",
    storageBucket: "nativenaufala.appspot.com",
    messagingSenderId: "801748911194",
    appId: "1:801748911194:web:d820f0bd8c6adaefb70463"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };