import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const authApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3002/auth',
        prepareHeaders: (headers, { getState }) => {
            const token = window.localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    endpoints: build => ({
        getMe: build.query({
            query: () => ({
                url: '/me'
            })
        }),
        register: build.mutation({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data
            })
        }),
        login: build.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data
            })
        }),
        logout: build.mutation({
            query: () => ({
                url: '/logout', 
                method: 'POST',
            }),
        }),
    })
})



export const { useLoginQuery, useRegisterMutation, useLoginMutation, useLogoutMutation, useGetMeQuery, useLazyGetMeQuery } = authApi