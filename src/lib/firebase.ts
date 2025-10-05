import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDk33ndbWNJydS4Lxq1_ZZBFnBmQk2p57Q',
  authDomain: 'rent-redi-users.firebaseapp.com',
  databaseURL: 'https://rent-redi-users-default-rtdb.firebaseio.com',
  projectId: 'rent-redi-users',
  storageBucket: 'rent-redi-users.firebasestorage.app',
  messagingSenderId: '528555687409',
  appId: '1:528555687409:web:930119676e2228b5409850',
  measurementId: 'G-DPQQ9NB3E4'
}


const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
