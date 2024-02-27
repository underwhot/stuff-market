import { Link } from 'react-router-dom';
import styles from './Products.module.css';

type Product = {
  id: number;
  image: string;
  title: string;
  cat: string;
  price: number;
};

type ProductsProps = {
  title: string;
  style: object;
  products: Product[];
  amount: number;
};

export const Products = ({
  title,
  style = {},
  products = [],
  amount,
}: ProductsProps) => {
  const filtredProducts = products.filter((_, i) => i < amount);

  return (
    <section className={styles.products} style={style}>
      {title && <h2>{title}</h2>}
      <div className={styles.list}>
        {filtredProducts.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className={styles.product}
          >
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(${product.image})`,
              }}
            />
            <div className={styles.wrapper}>
              <h3 className={styles.title}>{product.title}</h3>
              <div className={styles.cat}>{product.cat}</div>
              <div className={styles.info}>
                <div className={styles.prices}>
                  <div className={styles.price}>{product.price}$</div>
                  <div className={styles.oldPrice}>
                    {Math.floor(product.price * 0.8)}$
                  </div>
                </div>

                <div className={styles.purchases}>
                  {Math.floor(Math.random() * 20 + 1)} purchaced
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
