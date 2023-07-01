import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAQXa8M_tdR-VNodtYHSRWuNYc3jMIzlIA',
  authDomain: 'todo-23f5f.firebaseapp.com',
  projectId: 'todo-23f5f',
  storageBucket: 'todo-23f5f.appspot.com',
  messagingSenderId: '587186945275',
  appId: '1:587186945275:web:2376cb2024b7f76efe045e',
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

export { db }
