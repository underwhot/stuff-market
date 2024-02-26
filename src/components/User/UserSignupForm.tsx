import { useDispatch } from 'react-redux';
import { ChangeEvent, FormEvent, useState } from 'react';
import { AppDispatch } from '../../redux/store';
import { createUser } from '../../redux/slices/userSlice';

import styles from './User.module.css';

type UserSignupFormProps = {
  closeForm: () => void;
  toggleFormType: (type: string) => void;
};

export const UserSignupForm = ({
  closeForm,
  toggleFormType,
}: UserSignupFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    avatar: 'https://i.pravatar.cc/300?img=39',
  });

  const handleChange = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: value });
  };

  const hangleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).some((val) => val);

    if (!isNotEmpty) return;

    dispatch(
      createUser({ url: 'https://api.escuelajs.co/api/v1/users', user: values })
    );
    closeForm();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref="/sprite.svg#close" />
        </svg>
      </div>

      <div className={styles.title}>Sigh up</div>

      <form onSubmit={hangleSubmit} className={styles.form}>
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

        <div
          className={styles.link}
          onClick={() => {
            toggleFormType('login');
          }}
        >
          I already have account
        </div>

        <button type="submit" className={styles.sumbit}>
          Create account
        </button>
      </form>
    </div>
  );
};
