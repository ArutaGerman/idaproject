const mutations = {
        addToCart: (state, payload) => {
            state.cart.currentProduct = payload;
            state.cart.cartProducts.push(payload);
            state.cart.cartCount = state.cart.cartProducts.length;
        },
        deleteFromCart: (state, payload) => {
            const newState = state.cart.cartProducts.filter(index => index !== payload);
            state.cart.cartProducts = newState;
            state.cart.cartCount = state.cart.cartProducts.length;
        }
    }


export default {
    namespaced: true,
    mutations
}