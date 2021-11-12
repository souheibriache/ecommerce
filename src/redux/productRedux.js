import {createSlice} from '@reduxjs/toolkit';


const productSlice = createSlice({
    name : 'product',
    initialState : {
        products : [],
        isFetching : false,
        error : false,
    },

    reducers: {
        //GET ALL
        getProductStart : (state) => {
            state.isFetching = true;
            state.error = false
        },

        getProductSuccess : (state , action) => {
            state.isFetching = false
            state.error = false
            state.products = action.payload
        },

        getProductFailure : (state , action) => {
            state.isFetching = false
            state.error = true
            state.products = action.payload
        },

         //DELETE
         deleteProductStart : (state) => {
            state.isFetching = true;
            state.error = false
            
        },

        deleteProductSuccess : (state , action) => {
            state.isFetching = false
            state.error = false
            state.products.splice(
                state.products.findIndex(item => item._id === action.payload) , 1
            )
            
        },

        deleteProductFailure : (state , action) => {
            state.isFetching = false
            state.error = true
            state.products = action.payload
        },

         //ADD
         addProductStart : (state) => {
            state.isFetching = true;
            state.error = false
            
        },

        addProductSuccess : (state , action) => {
            state.isFetching = false
            state.error = false
            state.products.push(action.payload)
            
        },

        addProductFailure : (state , action) => {
            state.isFetching = false
            state.error = true
            state.products = action.payload
        }
    }
})

export const {getProductStart, getProductSuccess, getProductFailure , 
            deleteProductSuccess , deleteProductFailure , deleteProductStart ,
            addProductSuccess , addProductFailure , addProductStart} = productSlice.actions;
export default productSlice.reducer;