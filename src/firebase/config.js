import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from '@firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyB7Rru6B1ZKt7p8Ld_FrLcRRRcSBlRyyvw',
    authDomain: 'postdb-bc491.firebaseapp.com',
    projectId: 'postdb-bc491',
    storageBucket: 'postdb-bc491.appspot.com',
    messagingSenderId: '628174612275',
    appId: '1:628174612275:web:cb7277f09b5dee35270046',
    measurementId: 'G-0VPR649MKR',
};

let app;
let auth;
if (getApps().length < 1) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app);
} else {
    app = getApp();
    auth = getAuth();
}
export { app, auth };
export const db = getFirestore(app);
