'use client'

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import { ITask } from '@/types/dbTypes'
import Database from '@/controller/DatabaseController'

import { db } from '@/services/firebaseConnection'
import { addDoc, collection } from 'firebase/firestore'

import Link from 'next/link'
import Head from 'next/head'
import { TextArea } from '@/components/TextArea'
import { FiShare2, FiTrash } from 'react-icons/fi'
import styles from './styles.module.css'

export default function Dashboard() {
  const { data: session } = useSession({
    required: true,
  })
  const [data, setData] = useState<ITask[]>([] as ITask[])
  const [task, setTask] = useState<string | null | undefined>('')
  const [isPublic, setIsPublic] = useState<boolean>(false)
  const database = useMemo(() => new Database(), [])

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

  async function handleShare(id: string) {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/task/${id}`,
    )
    alert('Link copied to clipboard')
  }

  async function handleDelete(id: string) {
    await database.deleteTask(id)
    alert('Task deleted!')
  }

  useEffect(() => {
    async function fetchTasks() {
      try {
        const dbRes = await database.loadUserTasks(session!.user!.email)
        setData(dbRes)
      } catch (err) {
        console.log(err)
      }
    }
    fetchTasks()
  }, [data, database, session])
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

          {data &&
            data.map((task) => (
              <article className={styles.task} key={task.id}>
                {task.public === true && (
                  <div className={styles.tagWrapper}>
                    <label htmlFor="" className={styles.tag}>
                      Public
                    </label>
                    <button
                      className={styles.shareButton}
                      onClick={() => handleShare(task.id)}
                    >
                      <FiShare2 size={22} color="#3183ff" />
                    </button>
                  </div>
                )}
                <div className={styles.taskContent}>
                  {task.public === true ? (
                    <Link href={`/task/${task.id}`}>
                      <p>{task.task}</p>
                    </Link>
                  ) : (
                    <p>{task.task}</p>
                  )}
                  <button
                    className={styles.trashButton}
                    onClick={() => handleDelete(task.id)}
                  >
                    <FiTrash size={24} color="#ea3140" />
                  </button>
                </div>
              </article>
            ))}
        </section>
      </main>
    </div>
  )
}
