import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { changeAuth } from '../../redux/slices/index'
import styles from "./Login.module.scss";
import { useLazyGetMeQuery, useLoginMutation } from "../../redux/auth/auth.api";
import { useLazyGetPostsQuery } from "../../redux/posts/post.api";

export const Login = () => {
  const dispatch = useDispatch()
  const [login, { error, data }] = useLoginMutation()
  const [isAuth, setIsAuth] = useState(false);
  const [triger] = useLazyGetPostsQuery()
  const [trigger] = useLazyGetMeQuery()

  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = Boolean(data);
    setIsAuth(authStatus);
    if (authStatus) {
      dispatch(changeAuth(true));
      window.localStorage.setItem('token', data.token);
      trigger();
      triger();
      navigate('/');
    }
  }, [data]);

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleClick = async () => {
    const data = {
      password: pass,
      email
    }
    await login(data)


  }



  return (
    <Paper elevation={0} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <TextField
        className={styles.field}
        label="E-Mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        className={styles.field}
        label="Пароль"
        fullWidth value={pass}
        onChange={e => setPass(e.target.value)} />
      <Button onClick={() => handleClick()} size="large" variant="contained" fullWidth>
        Войти
      </Button>
      {error ? <h4 style={{ color: 'red', textAlign: 'center' }}>Неправильный логин или пароль</h4> : ''}
    </Paper>
  );
};
