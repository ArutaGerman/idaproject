
    const state = () => ({
        idCategory: null, // Id категории товаров из меню выбора категории товаров
        sortMenu: false
    });

    const getters = {
        idCategories: state => state.idCategory, // получаем id категории товаров
        sortMenu: state => state.sortMenu
    };
    
    const actions = {
        dropDown: (context, getter) => context.commit('DROP_DOWN', getter),
        addToCart: (context, item) => context.commit('cart/ADD_TO_CART', item, { root: true }), // Action для мутации addToCart - Добавляем в корзину товар
        getID: (context, id) => context.commit('GET_ID_CATEGORIES', id) // Action для мутации getIdCategories - получаем id категории для загрузки списка товаров на странице просмотра
    };

    const mutations = {
        // Получаем id категории товаров при выборе категории в меню
        GET_ID_CATEGORIES: (state, id) => {                    
            state.idCategory = id
        },
        DROP_DOWN: state => state.sortMenu = !state.sortMenu
             
    };


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}