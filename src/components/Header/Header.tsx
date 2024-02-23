import { Link } from 'react-router-dom';

import styles from './Header.module.css';

import LOGO from '/images/logo.svg';
import AVATAR from '/images/avatar.jpg';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={LOGO} alt="Stuff" />
        </Link>
      </div>

      <div className={styles.info}>
        <div className={styles.user}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${AVATAR})` }}
          ></div>
          <div className={styles.username}></div>
        </div>

        <form className={styles.form}>
          <div className={styles.icon}>
            <svg className="icon">
              <use xlinkHref="/sprite.svg#search" />
            </svg>
          </div>
          <div className={styles.input}>
            <input
              type="search"
              name="search"
              placeholder="Search..."
              autoComplete="off"
            />
          </div>
          {/* <div className={styles.box}></div> */}
        </form>

        <div className={styles.account}>
          <Link to="/" className={styles.favourites}>
            <svg className={styles['icon-fav']}>
              <use xlinkHref="/sprite.svg#heart" />
            </svg>
          </Link>
          <Link to="/cart" className={styles.cart}>
            <svg className={styles['icon-cart']}>
              <use xlinkHref="/sprite.svg#bag" />
            </svg>
            <span className={styles.count}>2</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
