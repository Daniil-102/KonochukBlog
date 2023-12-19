import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useNavigate, Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import axios from 'axios';
import { useCreatePostMutation, useLazyGetPostsQuery, useUpdatePostMutation, useLazyGetPostQuery, useLazyGetByTagQuery } from '../../redux/posts/post.api';

export const AddPost = () => {
  const { id } = useParams()
  const [text, setText] = useState('');
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const inputFileRef = useRef(null)
  const isAuth = useSelector(state => state.auth.isAuth.payload)
  const [create] = useCreatePostMutation()
  const navigate = useNavigate()
  const [trigger] = useLazyGetPostsQuery()
  const [update] = useUpdatePostMutation()
  const isAdeting = Boolean(id)
  const [triggerr] = useLazyGetPostQuery(id)
  const [triger] = useLazyGetByTagQuery()


  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file)
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
        headers: {
          'Authorization': window.localStorage.getItem('token'),
        },
      });
      setImageUrl(data.url)
    } catch (err) {
      console.log(err);
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onChange = React.useCallback((text) => {
    setText(text);
  }, []);

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`).then(({ data }) => {
        setTitle(data.title)
        setText(data.text)
        setTags(data.tags.join(', '))
        setImageUrl(data.imageUrl)
      })
    }
  }, [id])

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'l'
      },
    }),
    [],
  );
  const onSubmit = async () => {
    try {
      const tagsMap = tags.split(',').map(tag => tag.trim())
      const fields = {
        title, imageUrl, tags: tagsMap, text
      }
      const data = {
        fields, id
      }
      const response = !isAdeting ? await create(fields) : await update(data);
      const postId = isAdeting ? id : response.data._id;
      triggerr(postId)
      navigate(`/posts/${postId}`)
      await trigger()
      await Promise.all(tagsMap.map(tag => triger(tag)));
    } catch (err) {
      console.log(err);
    }
  }

  return (!isAuth && !window.localStorage.getItem('token')) ? <Navigate to='/' /> : (
    <Paper elevation={0} style={{ padding: 30 }}>
      <Button style={{ margin: '10px' }} onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt="Uploaded" />
        </>)}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField classes={{ root: styles.tags }} variant="standard" placeholder="Тэги" fullWidth value={tags}
        onChange={(e) => setTags(e.target.value)} />
      <SimpleMDE key={'l'} className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={() => onSubmit()} size="large" variant="contained">
          {isAdeting ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/posts/create">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
