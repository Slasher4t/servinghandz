import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA7_MQUYibk47xVL-Y1Msg5WJ2KDcPlrCw',
  authDomain: 'servinghandz.firebaseapp.com',
  projectId: 'servinghandz',
  storageBucket: 'servinghandz.firebasestorage.app',
  messagingSenderId: '192466884693',
  appId: '1:192466884693:web:0fa333196e4760aae7dcdc',
  measurementId: 'G-SMF25HCLJY'
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
