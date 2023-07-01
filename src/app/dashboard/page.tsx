'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { db } from '@/services/firebaseConnection'
import { addDoc, collection } from 'firebase/firestore'
import Head from 'next/head'
import styles from './styles.module.css'

import { TextArea } from '@/components/TextArea'
import { FiShare2, FiTrash } from 'react-icons/fi'

export default function Dashboard() {
  // eslint-disable-next-line no-unused-vars
  const { data: session } = useSession({
    required: true,
  })

  const [task, setTask] = useState<string | null>('')
  const [isPublic, setIsPublic] = useState<boolean>(false)

  async function handleNewTask(e: FormEvent) {
    e.preventDefault()
    if (!task) {
      alert('Type a new task')
    }

    try {
      await addDoc(collection(db, 'tasks'), {
        task,
        createdAt: new Date(),
        user: session?.user?.email,
        public: isPublic,
      })
      setTask('')
      setIsPublic(false)
      alert('Task created successfully')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {}, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>My dashboard</title>
      </Head>
      <main className={styles.name}>
        <section className={styles.content}>
          <div className={styles.formWrapper}>
            <h1 className={styles.title}>What is your task?</h1>
            <form onSubmit={handleNewTask}>
              <TextArea
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setTask(e.target.value)
                }
              />
              <div className={styles.checkboxArea}>
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setIsPublic(e.target.checked)
                  }
                />
                <label htmlFor="">Make task public?</label>
              </div>
              <button type="submit" className={styles.button}>
                Add new task
              </button>
            </form>
          </div>
        </section>
        <section className={styles.taskWrapper}>
          <h1>My Tasks</h1>

          <article className={styles.task}>
            <div className={styles.tagWrapper}>
              <label htmlFor="" className={styles.tag}>
                Public
              </label>
              <button className={styles.shareButton}>
                <FiShare2 size={22} color="#3183ff" />
              </button>
            </div>
            <div className={styles.taskContent}>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              <button className={styles.trashButton}>
                <FiTrash size={24} color="#ea3140" />
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  )
}
