import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const postApi = createApi({
    reducerPath: 'posts/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3002',
        prepareHeaders: (headers, { getState }) => {
            const token = window.localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    endpoints: build => ({
        getPosts: build.query({
            query: () => ({
                url: '/posts'
            })
        }),
        getNewPosts: build.query({
            query: () => ({
                url: '/posts/new'
            })
        }),
        getPopularPosts: build.query({
            query: () => ({
                url: '/posts/popular'
            })
        }),
        getTags: build.query({
            query: () => ({
                url: '/tags'
            })
        }),
        getComments: build.query({
            query: (posts) => ({
                url: '/comments',
                body: posts
            })
        }),
        getByTag: build.query({
            query: (tag) => ({
                url: `/posts/tag/${tag}`
            })
        }),
        getPost: build.query({
            query: (id) => ({
                url: `/posts/${id}`
            })
        }),
        createPost: build.mutation({
            query: (fields) => ({
                url: '/posts',
                method: 'POST',
                body: fields
            })
        }),
        deletePost: build.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            })
        }),
        updatePost: build.mutation({
            query: (data) => ({
                url: `/posts/${data.id}`,
                method: 'PATCH',
                body: data.fields
            })
        }),
    })
})

export const {useGetByTagQuery, useLazyGetByTagQuery, useGetPostsQuery, useLazyGetPostsQuery, useGetTagsQuery, useGetPostQuery, useLazyGetPostQuery, 
    useCreatePostMutation, useDeletePostMutation, useUpdatePostMutation, useLazyGetNewPostsQuery, useLazyGetPopularPostsQuery, useGetCommentsQuery,
    useLazyGetCommentsQuery, useLazyGetTagsQuery} = postApi