import { useDispatch, useSelector } from 'react-redux';
import {
  selectCart,
  setAddtoCart,
  setRemoveItem,
} from '../../redux/slices/userSlice';

import styles from './Cart.module.css';
import { AppDispatch } from '../../redux/store';

const sumBy = (arr: number[]) => {
  return arr.reduce((prev, cur) => prev + cur, 0);
};

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
};

export const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartProducts = useSelector(selectCart);

  const changeQuantity = (item: Product, quantity: number) => {
    dispatch(setAddtoCart({ ...item, quantity }));
  };

  const removeItem = (id: number) => {
    dispatch(setRemoveItem(id));
  };

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your cart</h2>

      {!cartProducts.length ? (
        <div className={styles.empty}>Empty</div>
      ) : (
        <>
          <div className={styles.list}>
            {cartProducts.map((item: Product) => {
              const { title, category, image, price, id, quantity } = item;

              return (
                <div className={styles.item} key={id}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${image})` }}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{title}</h3>
                    <div className={styles.category}>{category}</div>
                  </div>

                  <div className={styles.price}>{price}$</div>

                  <div className={styles.quantity}>
                    <div
                      className={styles.minus}
                      onClick={() => {
                        changeQuantity(item, Math.max(1, quantity - 1));
                      }}
                    >
                      <svg className="icon">
                        <use xlinkHref="/sprite.svg#minus" />
                      </svg>
                    </div>

                    <span>{quantity}</span>

                    <div
                      className={styles.plus}
                      onClick={() => {
                        changeQuantity(item, Math.max(1, quantity + 1));
                      }}
                    >
                      <svg className="icon">
                        <use xlinkHref="/sprite.svg#plus" />
                      </svg>
                    </div>

                    <div className={styles.total}>{(price * quantity).toFixed(2)}$</div>

                    <div
                      className={styles.close}
                      onClick={() => removeItem(item.id)}
                    >
                      <svg className="icon">
                        <use xlinkHref="/sprite.svg#close" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.actions}>
            <div className={styles.total}>
              TOTAL PRICE:{' '}
              <span>
                {(sumBy(cartProducts.map((item) => item.quantity * item.price))).toFixed(2)}$
              </span>
            </div>

            <button type="button" className={styles.proceed}>
              Proceed to checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
};
