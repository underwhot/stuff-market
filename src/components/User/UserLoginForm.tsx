import { useDispatch } from 'react-redux';
import { ChangeEvent, FormEvent, useState } from 'react';
import { AppDispatch } from '../../redux/store';
import { loginUser } from '../../redux/slices/userSlice';

import styles from './User.module.css';

type UserLoginFormProps = {
  closeForm: () => void;
  toggleFormType: (type: string) => void;
};

export const UserLoginForm = ({
  closeForm,
  toggleFormType,
}: UserLoginFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [values, setValues] = useState({
    email: '',
    password: '',
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
      loginUser({
        loginURL: 'https://api.escuelajs.co/api/v1/auth/login',
        profileURL: 'https://api.escuelajs.co/api/v1/auth/profile',
        user: values,
      })
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

      <div className={styles.title}>Log in</div>

      <form onSubmit={hangleSubmit} className={styles.form}>
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

        <div className={styles.link} onClick={() => toggleFormType('signup')}>
          Create account
        </div>

        <button type="submit" className={styles.sumbit}>
          Login
        </button>
      </form>
    </div>
  );
};
