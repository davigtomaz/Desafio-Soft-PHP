/* eslint-disable no-case-declarations */
import CartActionTypes from "./actionTypes";

const initialState = {
  products: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.addProduct:

      let productsIsAlreadyInCart = state.products.find(
        (product) => product.product.code == action.payload.product.code
      );
      if (productsIsAlreadyInCart) {
        return {
          ...state,
          products: state.products.map((product) =>
            product.product.code == action.payload.product.code
              ? { ...product, amount: product.amount + action.payload.amount }
              : product
          ),
        };
      }

      return {
        products: [...state.products, { ...action.payload }],
      };
      case CartActionTypes.removeCart:
        return { ...state, products: []}

    case CartActionTypes.removeProduct:
      return {
        ...state,
        products: state.products.splice(1),
      };

    default:
      return state;
  }
};
export default cartReducer;
