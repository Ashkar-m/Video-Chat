import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import hostName from '../config';

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userCredentials)=>{
        const request = await axios.post(`${hostName}api/admin/v1/auth/login`,userCredentials)
        const response = await request.data.data;
        localStorage.setItem('user', JSON.stringify(response));
        return response;
    }
)
const userSlice = createSlice({
    name: 'user',
    initialState:{
        loading: false,
        user: null,
        error: null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            state.user = null;
            if(action.error.message === 'Request failed with status code 401'){
                status.error = 'Access Denied! Invalid Credentials';
            }else{
                state.error = action.error.message;
            }
            
        })
    }
});

export default userSlice.reducer;