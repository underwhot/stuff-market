import { Link } from 'react-router-dom';

import styles from './Footer.module.css';

import LOGO from '/images/logo.svg';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={LOGO} alt="Stuff" />
        </Link>
      </div>

      <div className={styles.rights}>
        Developed by <a href="#">artpetrovskiy</a>
      </div>

      <ul className={styles.socials}>
        <li>
          <a href="#">
            <svg className="icon">
              <use xlinkHref="/sprite.svg#instagram" />
            </svg>
          </a>
        </li>
        <li>
          <a href="#">
            <svg className="icon">
              <use xlinkHref="/sprite.svg#facebook" />
            </svg>
          </a>
        </li>
        <li>
          <a href="#">
            <svg className="icon">
              <use xlinkHref="/sprite.svg#youtube" />
            </svg>
          </a>
        </li>
      </ul>
    </footer>
  );
};
