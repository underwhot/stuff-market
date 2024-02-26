import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import {
  selectFormType,
  selectShowForm,
  setToggleFormType,
  setToggleShowForm,
} from '../../redux/slices/userSlice';
import { UserSignupForm } from './UserSignupForm';
import { UserLoginForm } from './UserLoginForm';

import styles from './User.module.css';

export const UserForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const showForm = useSelector(selectShowForm);
  const formType = useSelector(selectFormType);

  const closeForm = () => {
    dispatch(setToggleShowForm(false));
  };

  const toggleFormType = (type: string) => {
    dispatch(setToggleFormType(type));
  };

  return showForm ? (
    <>
      <div className={styles.overlay} onClick={closeForm}></div>
      {formType === 'signup' ? (
        <UserSignupForm toggleFormType={toggleFormType} closeForm={closeForm} />
      ) : (
        <UserLoginForm toggleFormType={toggleFormType} closeForm={closeForm} />
      )}
    </>
  ) : null;
};
