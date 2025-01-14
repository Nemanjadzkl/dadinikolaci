import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "dadini-kolaci.firebaseapp.com",
  projectId: "dadini-kolaci",
  storageBucket: "dadini-kolaci.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
