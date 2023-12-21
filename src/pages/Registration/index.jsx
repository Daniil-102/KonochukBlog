import React, { useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss';
import { useRegisterMutation } from '../../redux/auth/auth.api';
import axios from 'axios';

export const Registration = () => {

  const [register, { error }] = useRegisterMutation()

  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const inputFileRef = useRef(null)
  const [imageUrl, setImageUrl] = useState('')

  const handleClick = async () => {
    let data
    if (imageUrl !== '') {
      data = {
        fullName: name,
        password: pass,
        email,
        avatarUrl: imageUrl
      }
    } else {
      data = {
        fullName: name,
        password: pass,
        email,
      }
    }


    await register(data)
    if (!error?.data) {

      setEmail('')
      setPass('')
      setName('')
      setImageUrl('')
      navigate('/login')
    }

  }
  const onClickRemoveImage = () => {
    setImageUrl('')
  };
  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file)
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/uploads`, formData);
      setImageUrl(process.env.REACT_APP_API_URL + data.url)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper elevation={0} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar onClick={() => inputFileRef.current.click()} src={imageUrl} sx={{
          width: 100,
          height: 100,
          margin: '0 auto',
          cursor: 'pointer',
          ...(imageUrl && { marginBottom: '20px' })
        }} />
        {imageUrl && (<Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>)}
      </div>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      <TextField value={name} onChange={e => setName(e.target.value)} className={styles.field} label="Полное имя" fullWidth />
      <TextField value={email} onChange={e => setEmail(e.target.value)} className={styles.field} label="E-Mail" fullWidth />
      <TextField value={pass} onChange={e => setPass(e.target.value)} className={styles.field} label="Пароль" fullWidth />
      <Button onClick={() => handleClick()} size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
      {error?.data ? <h4 style={{ color: 'red', textAlign: 'center' }}>Неправильный логин или пароль или имя</h4> : ''}
    </Paper>
  );
};
