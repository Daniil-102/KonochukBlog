import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import {
  useGetCommentsQuery, useGetPostsQuery, useGetTagsQuery, useLazyGetNewPostsQuery,
  useLazyGetPopularPostsQuery, useLazyGetPostsQuery
} from '../redux/posts/post.api';
import { useGetMeQuery } from '../redux/auth/auth.api';


export const Home = () => {
  const { data: postss, error } = useGetPostsQuery();
  const { data: tagss } = useGetTagsQuery();
  const { data: commentss } = useGetCommentsQuery()
  const { data: me } = useGetMeQuery()
  const [newPosts,] = useLazyGetNewPostsQuery()
  const [popularPosts] = useLazyGetPopularPostsQuery()
  const [postsTrig] = useLazyGetPostsQuery()
  const [posts, setPosts] = useState(postss || [])
  const [tags, setTags] = useState(tagss || [])
  const [postsLoad, setPostsLoad] = useState(true)
  const [comments, setComments] = useState(commentss || [])
  const [isCommentsLoading, setIsCommentsLoading] = useState(true)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (postss) {
      setPostsLoad(false)
      setPosts(postss.posts);
      setTags(postss.tags)
    }
  }, [postss]);
  useEffect(() => {
    if (commentss) {
      setComments(commentss)
      setIsCommentsLoading(false)
    }
  }, [commentss]);



  const changeValue = async (newValue) => {
    setValue(newValue);
    try {
      let data;
      if (newValue === 1) {
        data = await newPosts();
        setPosts(data.data.posts);
        setTags(data.data.tags);
      } else if (newValue === 2) {
        data = await popularPosts();
        setPosts(data.data.posts);
        setTags(data.data.tags);
      } else {
        data = await postsTrig();
        setPosts(data.data.posts);
        setTags(data.data.tags);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  if (error) {
    return <p>Error: {error.message}</p>
  }


  return (
    <>
      <Tabs style={{ marginBottom: 15 }} onChange={(e, newValue) => changeValue(newValue)} value={value} aria-label="basic tabs example">
        <Tab value={0} label="Все" />
        <Tab value={1} label="Новые" />
        <Tab value={2} label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(postsLoad ? [...Array(5)] : (posts || postss.posts)).map((post, index) =>
            postsLoad ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={post._id}
                id={post._id}
                title={post.title}
                  imageUrl={post.imageUrl ? `${process.env.REACT_APP_API_URL}${post.imageUrl}` : ''}
                user={post.user}
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                commentsCount={post.comments.length}
                tags={post.tags}
                isEditable={me?._id === post.user?._id}
              />
            ))}
        </Grid>
        <Grid xs={4} item>
          {postsLoad ? <TagsBlock items={['oegrg', 'dfef', 'dfff', 'oegrg', 'dfef']} isLoading={true} /> : <TagsBlock items={tags} isLoading={false} />}
          <CommentsBlock
            items={comments}
            isLoading={isCommentsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
