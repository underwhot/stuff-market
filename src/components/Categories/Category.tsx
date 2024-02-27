import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../redux/api/apiSlice';
import { Products } from '../Products/Products';

import styles from './Category.module.css';

export const Category = () => {
  const { category } = useParams();
  const { data, isLoading, isSuccess } = useGetProductsQuery({ category });
  const [values, setValues] = useState({
    title: '',
    price_min: 0,
    price_max: 0,
  });
  const [params, setParams] = useState({
    title: '',
    price_min: 0,
    price_max: 0,
    limit: 5,
    offset: 0,
    categoryName: category,
  });

  const [filtredProducts, setFiltredProducts] = useState([]);

  useEffect(() => {
    if (!category) return;
    setParams({ ...params, categoryName: category });
  }, [category]);

  useEffect(() => {
    if (!data) return;

    setFiltredProducts(data);
  }, [data]);

  const handleChange = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setParams({ ...params, ...values });
    const filtred = data.filter((product: { title: string }) =>
      product.title
        .toLocaleLowerCase()
        .includes(values.title.toLocaleLowerCase())
    );
    setFiltredProducts(filtred);
  };

  const categoryTitle = `${
    category && category[0].toUpperCase()
  }${category?.slice(1, category.length)}`;

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{categoryTitle}</h2>

      {/* <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            placeholder="Product name"
            onChange={handleChange}
            value={values.title}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            placeholder="0"
            onChange={handleChange}
            value={values.price_min}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            placeholder="0"
            onChange={handleChange}
            value={values.price_max}
          />
        </div>

        <button type="submit" hidden></button>
      </form> */}

      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !data.length || !filtredProducts.length ? (
        <div className={styles.back}>
          <span>No results</span>
          <button>Reset</button>
        </div>
      ) : (
        <Products
          title=""
          products={filtredProducts}
          style={{ padding: 0 }}
          amount={data.length}
        />
      )}
    </section>
  );
};
