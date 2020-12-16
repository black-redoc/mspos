import { CART_ADD, CART_CLEAR } from './cart.actions';

export const cartReducer = (state, {payload, action}) => {
    switch (action) {
        case CART_ADD:
            const item = state.find(e => e.name === payload.name)
            if (item) {
                return state.map(e => {
                    if (e.name === payload.name) {
                        e.quantity += 1;
                    }
                    return e;
                })
            } else {
                return state.concat({...payload, quantity: 1});
            }
        case CART_CLEAR:
            return [];
        default:
            return state;
    }
}