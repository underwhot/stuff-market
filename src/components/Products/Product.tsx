import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { setAddtoCart } from '../../redux/slices/userSlice';

import styles from './Product.module.css';

type ProductProps = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
};

// const SIZES = [4, 4.5, 5];

export const Product = ({
  id,
  title,
  image,
  price,
  description,
  category,
}: ProductProps) => {
  const dispatch = useDispatch<AppDispatch>();
  // const [currentImage, setCurrentImage] = useState('');
  // const [curretnSize, setCurretnSize] = useState(SIZES[0]);

  // useEffect(() => {
  //   if (!images.length) return;

  //   setCurrentImage(images[0]);
  // }, [images]);

  const addToCartHandler = () => {
    dispatch(setAddtoCart({ title, image, price, id, category }));
  };

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
          style={{ backgroundImage: `url(${image})` }}
        />
        {/* <div
          className={styles.current}
          style={{ backgroundImage: `url(${currentImage})` }}
        /> */}
        {/* <div className={styles['images-list']}>
          {images.map((image, i) => {
            return (
              <div
                key={i}
                className={styles.image}
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => {
                  setCurrentImage(image);
                }}
              />
            );
          })}
        </div> */}
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price}$</div>
        {/* <div className={styles.color}>
          <span>Color:</span> Green
        </div> */}
        {/* <div className={styles.sizes}>
          <span>Sizes:</span>
          <div className={styles.list}>
            {SIZES.map((size) => (
              <div
                className={`${styles.size} ${
                  curretnSize === size ? styles.active : ''
                }`}
                onClick={() => {
                  setCurretnSize(size);
                }}
                key={size}
              >
                {size}
              </div>
            ))}
          </div>
        </div> */}

        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <button
            onClick={addToCartHandler}
            type="button"
            className={styles.add}
          >
            Add to cart
          </button>
          <button type="button" className={styles.favourite}>
            Add to favourite
          </button>
        </div>

        <div className={styles.bottom}>
          <div className={styles.purchase}>19 people purchased</div>
          <Link to="/" className={styles.description}>
            Return to store
          </Link>
        </div>
      </div>
    </section>
  );
};
