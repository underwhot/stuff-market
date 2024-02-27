import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { selectCurrentUser, updateUser } from '../../redux/slices/userSlice';

import styles from './Profile.module.css';

export const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectCurrentUser);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    avatar: 'https://i.pravatar.cc/300?img=39',
  });

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  const handleChange = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).some((val) => val);

    if (!isNotEmpty) return;

    if (!currentUser) return;

    dispatch(
      updateUser({
        url: `https://api.escuelajs.co/api/v1/users/${currentUser.id}`,
        user: values,
      })
    );
  };

  return (
    <section className={styles.profile}>
      {!currentUser ? (
        <h2>You have to login</h2>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.group}>
            <input
              onChange={handleChange}
              value={values.name}
              type="name"
              name="name"
              placeholder="Name"
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.group}>
            <input
              onChange={handleChange}
              value={values.email}
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.group}>
            <input
              onChange={handleChange}
              value={values.password}
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              required
            />
          </div>

          <button type="submit" className={styles.sumbit}>
            Update
          </button>
        </form>
      )}
    </section>
  );
};
