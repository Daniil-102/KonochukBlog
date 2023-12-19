import React, { useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { useGetPostQuery, useLazyGetPostQuery, useUpdatePostMutation } from "../../redux/posts/post.api";
import { useGetMeQuery } from "../../redux/auth/auth.api";

export const Index = () => {

  const { id } = useParams()
  const [value, setValue] = useState()
  const [triger] = useUpdatePostMutation()
  const { data: post } = useGetPostQuery(id)
  const [trigger] = useLazyGetPostQuery()
  const { data: me } = useGetMeQuery()


  const onClick = async () => {
    await triger({
      fields: {
        title: post.title,
        comments: [...post.comments, { user: me, text: value }],
        imageUrl: post.imageUrl,
        tags: post.tags,
        text: post.text,
      },
      id,
    });

    trigger(id)
    setValue('')
  }
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={me.avatarUrl}
        />
        <div className={styles.form}>
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={() => onClick()} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
