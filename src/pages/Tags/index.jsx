import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetByTagQuery, useLazyGetByTagQuery } from '../../redux/posts/post.api'
import { Post } from '../../components/Post'
import { useGetMeQuery } from '../../redux/auth/auth.api'
import Grid from '@mui/material/Grid';
import { TagsBlock } from '../../components/TagsBlock'
import { CommentsBlock } from '../../components/CommentsBlock'
import { Postt } from '../../components/Postt'


export const Tags = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: me } = useGetMeQuery()

  const { data: posts, isLoading } = useGetByTagQuery(id)




  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isLoading ? [...Array(5)] : (posts)).map((post, index) =>
            isLoading ? (
              <Postt key={index} isLoading={true} />
            ) : (
              <Postt
                key={post._id}
                id={post._id}
                title={post.title}
                imageUrl={post.imageUrl ? `${process.env.REACT_APP_API_URL}${post.imageUrl}` : ''}
                user={post.user}
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                commentsCount={3}
                tags={post.tags}
                isEditable={me?._id === post.user?._id}
              />
            ))}
        </Grid>
        <Grid xs={4} item>
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Michail Berezov',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Nice. Great to hear you again',
              },
              {
                user: {
                  fullName: 'Yan Nepomniatsiy',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'Controller approach is the best one!',
              },
            ]}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </>
  )
}
