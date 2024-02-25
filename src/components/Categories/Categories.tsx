import { Link } from 'react-router-dom';
import styles from './Categories.module.css';
import correctImagePath from '../../utils/correctImagePath';

export const Categories = ({ title, categories = [], amount }) => {
  const filtredCategories = categories.filter((_, i) => i < amount);

  return (
    <section className={styles.categories}>
      <h2>{title}</h2>
      <div className={styles.list}>
        {filtredCategories.map((category) => (
          <Link
            to={`/category/${category.id}`}
            key={category.id}
            className={styles.item}
          >
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(${correctImagePath(category.image)})`,
              }}
            />
            <h3 className={styles.title}>{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};
