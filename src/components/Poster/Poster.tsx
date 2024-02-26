import styles from './Home.module.css';

import BG from '/images/computer.png';

export const Poster = () => {
  return (
    <section className={styles.home}>
      <div className={styles.title}>BIG SALE 20%</div>
      <div className={styles.product}>
        <div className={styles.text}>
          <div className={styles.subtitle}>The bestseller of 2024</div>
          <h1 className={styles.head}></h1>
          <button type="button" className={styles.button}>
            Shop now
          </button>
        </div>
        <div className={styles.image}>
          <img src={BG} alt="Computer" />
        </div>
      </div>
    </section>
  );
};
