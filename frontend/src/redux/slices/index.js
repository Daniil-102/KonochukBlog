import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isAuth: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeAuth(state, payload) {
            state.isAuth = payload
        }
    }
})

export const {changeAuth} = authSlice.actions
export default authSlice.reducer