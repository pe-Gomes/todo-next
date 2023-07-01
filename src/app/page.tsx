import Image from 'next/image'
import styles from '../styles/page.module.css'

import heroImg from '../../public/assets/hero.png'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <Image
            className={styles.image}
            alt="Logo of To-do-Next"
            src={heroImg}
            priority={true}
          />
        </div>
        <h1 className={styles.title}>
          A system built for organizing studies and tasks
        </h1>
        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+12 posts</span>
          </section>
          <section className={styles.box}>
            <span>+90 comments</span>
          </section>
        </div>
      </main>
    </div>
  )
}
