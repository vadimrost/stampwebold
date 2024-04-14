import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC3Mu6nMbWgdzBMgCtAEzSPw-LFadlF0Ig",
  authDomain: "stamp-2c915.firebaseapp.com",
  projectId: "stamp-2c915",
  storageBucket: "stamp-2c915.appspot.com",
  messagingSenderId: "188176648213",
  appId: "1:188176648213:web:548c91ec592befd82b261c",
  measurementId: "G-364MMHXSJT"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore(app)
const Storage = getStorage(app)
export { auth, db, Storage }