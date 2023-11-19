import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => { 
            state.token = action.payload.accessToken
            state.username = action.payload.username
            state.role = action.payload.highestRole
        },
        logOut: (state, action) => {
            state.token = null
        },
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentUsername = (state) => state.auth.username;
export const selectCurrentUserRole = (state) => state.auth.role;
