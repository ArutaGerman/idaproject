const state = () => ({
    currentProduct: [],
    cartProducts: [],
    cartCount: null
})

const getters = {
    productsInCart: state => state.cartProducts,
    countProducts: state => state.cartCount
}


export default {
    namespaced: true,
    state,
    getters
}