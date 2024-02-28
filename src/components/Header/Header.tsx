import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import {
  selectCart,
  selectCurrentUser,
  setToggleShowForm,
} from '../../redux/slices/userSlice';
import { selectProducts } from '../../redux/slices/productsSlice';

import styles from './Header.module.css';

import LOGO from '/images/logo.svg';
import AVATAR from '/images/avatar.jpg';

type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const products = useSelector(selectProducts);
  const currentUser = useSelector(selectCurrentUser);
  const cart = useSelector(selectCart);
  const [values, setValues] = useState({ name: 'Guest', avatar: AVATAR });
  const [searchValue, setSearchValue] = useState('');
  const [filtredProducts, setFiltredProducts] = useState<Product[] | any[]>([]);

  const handleClick = () => {
    if (!currentUser) dispatch(setToggleShowForm(true));
    else {
      navigate('/profile');
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    const filtred = products.filter((product) =>
      product.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    setFiltredProducts(filtred);
  };

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={LOGO} alt="Stuff" />
        </Link>
      </div>

      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url('${values.avatar}')` }}
          ></div>
          <div className={styles.username}>{values.name}</div>
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
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
          {searchValue && (
            <div className={styles.box}>
              {!filtredProducts.length
                ? 'No results'
                : filtredProducts.map((product: Product) => {
                    return (
                      <Link
                        key={product.id}
                        to={`products/${product.id}`}
                        className={styles.item}
                        onClick={() => setSearchValue('')}
                      >
                        <div
                          className={styles.image}
                          style={{ backgroundImage: `url("${product.image}")` }}
                        />
                        <div className={styles.title}>{product.title}</div>
                      </Link>
                    );
                  })}
            </div>
          )}
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
            {!!cart.length && <span className={styles.count}>{cart.length}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};
