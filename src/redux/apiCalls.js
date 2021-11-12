import {loginStart , loginFailure , loginSuccess } from './userRedux'
import {getProductStart , getProductSuccess , getProductFailure,
         deleteProductStart, deleteProductFailure, deleteProductSuccess,
         addProductStart, addProductFailure , addProductSuccess} from './productRedux'
import {publicRequest , userRequest} from '../requestMethods'

const baseUrl = process.env.BASE_URL
export const login = async (dispatch , user)=>{
    
    dispatch(loginStart());
    try{
        const res = await publicRequest.post('/auth/login' , user);
        dispatch(loginSuccess(res.data));
        window.location.href = '/'
    }catch(error){
        dispatch(loginFailure())
    }
}

export const getProducts = async (dispatch)=>{
    
    dispatch(getProductStart());
    try{
        const res = await publicRequest.get('/products' );
        dispatch(getProductSuccess(res.data));
        
    }catch(error){
        dispatch(getProductFailure())
    }
}

export const deleteProduct = async (id , dispatch)=>{
    
    dispatch(deleteProductStart());
    try{
        const res = await userRequest.delete('/products/'+id );
        dispatch(deleteProductSuccess(id));
        
    }catch(error){
        dispatch(deleteProductFailure())
    }
}

export const addProduct = async (product , dispatch)=>{
    
    dispatch(addProductStart());
    try{
        const res = await userRequest.post('/products/', product );
        dispatch(addProductSuccess(res.data));
        
    }catch(error){
        dispatch(addProductFailure())
    }
}