
    const state = () => ({
        idCategory: 1 // Id категории товаров из меню выбора категории товаров
    });

    const getters = {
        idCategories: state => state.idCategory, // получаем id категории товаров
    };
    
    const actions = {
        addToCart: (context, item) => context.commit('cart/ADD_TO_CART', item, { root: true }), // Action для мутации addToCart - Добавляем в корзину товар
        getID: (context, id) => context.commit('getIdCategories', id) // Action для мутации getIdCategories - получаем id категории для загрузки списка товаров на странице просмотра
    };

    const mutations = {
        // Получаем id категории товаров при выборе категории в меню
        getIdCategories: (state, id) => {                    
            JSON.parse(sessionStorage.getItem("idCategory")) ? state.idCategory = id : state.idCategory = 1;
        },        
    };


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}