import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import { useGetPostQuery, } from "../redux/posts/post.api";

export const FullPost = () => {

  const { id } = useParams()
  const { data: post, isLoading: isPostLoading } = useGetPostQuery(id)


  if (isPostLoading) {
    return <Post isLoading={isPostLoading} isFullPost />
  }

  return (
    <>
      <Post
        id={post.id}
        title={post.title}
        imageUrl={post.imageUrl ? `${process.env.REACT_APP_API_URL}${post.imageUrl}` : ''}
        user={post.user}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={post.comments.length}
        tags={post.tags}
        isFullPost
      >
        <p>
          {post.text}
        </p>
      </Post>

      <CommentsBlock
        items={post.comments}
        isLoading={isPostLoading}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
