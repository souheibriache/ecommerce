import {loginStart , loginFailure , loginSuccess} from './userRedux'
import {publicRequest} from '../requestMethods'
import axios from 'axios'
const baseUrl = process.env.BASE_URL
export const login = async (dispatch , user)=>{
    
    dispatch(loginStart());
    try{
        const res = await publicRequest.post('/auth/login' , user);
        dispatch(loginSuccess(res.data));
    }catch(error){
        dispatch(loginFailure())
    }
}

export const register = async (dispatch , user)=>{
    
    dispatch(loginStart());
    try{
        const res = await publicRequest.post('/auth/register' , user);
        dispatch(loginSuccess(res.data));
    }catch(error){
        dispatch(loginFailure())
    }
}