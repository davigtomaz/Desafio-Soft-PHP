import CartActionTypes from "./actionTypes";

export const addProductToCart = (payload) => ({
    type: CartActionTypes.addProduct,
    payload,
})

export const removeProductToCart = (payload) => ({
    type: CartActionTypes.removeProduct,
    payload,
})

