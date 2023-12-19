import React from 'react';
import Button from '@mui/material/Button';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../../redux/auth/auth.api';
import { changeAuth } from '../../redux/slices';




export const Header = () => {
  const isAuth = useSelector(state => state.auth.isAuth.payload)
  const dispatch = useDispatch()
  const [logout] = useLogoutMutation();

  const onClickLogout = async () => {
    try {
      await logout();
      window.localStorage.removeItem('token')
      dispatch(changeAuth(false))
      window.location.reload()

    } catch (error) { }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>KONONCHUK BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth || window.localStorage.getItem('token') ? (
              <>
                <Link to="/posts/create">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
