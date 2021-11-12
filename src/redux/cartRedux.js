import {createSlice} from '@reduxjs/toolkit';


const cartSlice = createSlice({
    name : 'cart',
    initialState : {
        products : [],
        quantity : 0,
        totalPrice : 0,
    },

    reducers: {
        addProduct: (state, action) => {
            state.quantity +=1;
            state.products.push(action.payload);
            state.totalPrice += action.payload.price * action.payload.quantity;
        },
        
        emptyingCart : (state) => {
            state.quantity = 0;
            state.products = [];
            state.totalPrice = 0;
        }

    }
})

export const {addProduct , emptyingCart } = cartSlice.actions;
export default cartSlice.reducer;