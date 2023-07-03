'use client'

import Head from 'next/head'
import styles from './styles.module.css'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import DatabaseController from '@/controller/DatabaseController'
import { ITask } from '@/types/dbTypes'
import { TextArea } from '@/components/TextArea'

export default function Task() {
  const params = useParams()
  const { id } = params

  const [data, setData] = useState<ITask>({} as ITask)
  useEffect(() => {
    async function fetchTask() {
      const database = new DatabaseController()
      const res = await database.fetchTaskById(id)
      setData(res)
    }
    fetchTask()
  }, [id])
  return (
    <div className={styles.container}>
      <Head>
        <title>Details</title>
      </Head>
      <main className={styles.main}>
        <h1>Task</h1>
        <article className={styles.task}>
          <p>{data.task}</p>
        </article>
      </main>
    </div>
  )
}
