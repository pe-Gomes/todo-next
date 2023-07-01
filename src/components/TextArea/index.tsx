import { HTMLProps } from 'react'
import styles from './styles.module.css'

export function TextArea({ ...rest }: HTMLProps<HTMLTextAreaElement>) {
  return (
    <textarea
      placeholder="Type your next task"
      className={styles.textarea}
      {...rest}
    ></textarea>
  )
}
