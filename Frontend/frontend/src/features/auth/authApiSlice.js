import {apiSlice } from '../../app/api/apiSlice'
import {logOut } from './authSlice'

export const authApiSlice = apiSLice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth.logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled }) {
                try {
                    //const {data} = 
                    await queryFulfilled
                    //console.log(data)
                    dispatch(logOut())
                    dispatch(apiSlice.util.resetApiState())
                } catch (err) {
                    console.log(err)
                }
            }
        })
    })
})