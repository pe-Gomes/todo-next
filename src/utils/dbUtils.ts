import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '@/services/firebaseConnection'

interface IUser {
  email: string
}

class Database {
  async loadUserTasks({ email }: IUser) {
    const tasksRef = collection(db, 'tasks')
    const q = query(
      tasksRef,
      orderBy('created', 'desc'),
      where('user', '==', { email }),
    )
    const allUserTasks = onSnapshot(q, () => {})

    return allUserTasks
  }
}

module.exports = Database
