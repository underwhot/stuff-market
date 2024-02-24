import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectCategory,
  selectIsLoading,
} from '../../redux/slices/categoriesSlice';

import styles from './Sidebar.module.css';

export const Sidebar = () => {
  const categories = useSelector(selectCategory);
  const isLoading = useSelector(selectIsLoading);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.title}>CATEGORIES</div>
      <nav>
        <ul className={styles.menu}>
          {categories.map((category) => (
            <li key={category.id}>
              <NavLink
                to={`/categories/${category.id}`}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <a href="/help" className={styles.link}>
          Help
        </a>
        <a
          href="/terms"
          className={styles.link}
          style={{ textDecoration: 'underline' }}
        >
          Terms & Conditionals
        </a>
      </div>
    </aside>
  );
};
