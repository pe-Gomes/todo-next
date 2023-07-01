import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '@/services/firebaseConnection'
import { ITask } from '@/types/dbTypes'

class DatabaseController {
  async loadUserTasks(user: string | null | undefined): Promise<ITask[]> {
    const tasksRef = collection(db, 'tasks')
    const q = query(
      tasksRef,
      orderBy('createdAt', 'desc'),
      where('user', '==', user),
    )

    const allUserTasks: ITask[] = []

    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        allUserTasks.push({
          id: doc.id,
          task: doc.data().task,
          user: doc.data().user,
          public: doc.data().public,
          createdAt: doc.data().createdAt,
        })
      })
    })

    return allUserTasks
  }

  async deleteTask(id: string): Promise<void> {
    const docRef = doc(db, 'tasks', id)

    await deleteDoc(docRef)
  }
}

export default DatabaseController
