import { Link } from 'react-router-dom';
import styles from './Categories.module.css';

type CategoryImages = {
  [key: string]: string;
};

const categoryImages: CategoryImages = {
  electronics: 'https://i.imgur.com/ZANVnHE.jpeg',
  jewelery: 'https://i.imgur.com/BG8J0Fj.jpg',
  "men's clothing": 'https://i.imgur.com/QkIa5tT.jpeg',
  "women's clothing": 'https://i.imgur.com/mp3rUty.jpeg',
};

type CategoriesProps = {
  title: string;
  categories: string[];
  amount: number;
};

export const Categories = ({
  title,
  categories = [],
  amount,
}: CategoriesProps) => {
  const filtredCategories = categories.filter((_, i) => i < amount);

  return (
    <section className={styles.categories}>
      <h2>{title}</h2>
      <div className={styles.list}>
        {filtredCategories.map((category) => {
          let image = '';
          if (category in categoryImages) {
            image = categoryImages[category];
          }

          return (
            <Link
              to={`/categories/${category}`}
              key={category}
              className={styles.item}
            >
              <div
                className={styles.image}
                style={{
                  backgroundImage: `url('${image}')`,
                }}
              />
              <h3 className={styles.title}>{category}</h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
