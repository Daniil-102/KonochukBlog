import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "./posts/post.api";
import { authApi } from "./auth/auth.api";
import authReducer from "./slices";


const store = configureStore({
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer
    }
})

export default store