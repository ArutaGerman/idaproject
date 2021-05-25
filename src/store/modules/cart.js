const state = () => ({
    success: false, // Флаг успешно оформленного заказа
    cartProducts: [], // Список товаров в корзине    
});

const getters = {
    productsInCart: state => state.cartProducts, // Список товаров в корзине                                                                            
    goodsCounter: state => state.cartProducts.length, // Счетчикт товаров в корзине        
    successCart: state => state.success, // Состояние успешного оформления заказа        
};

const actions = {
    deleteFromCart: (context, item) => context.commit('DELETE_FROM_CART', item),
    showOrderSuccess: context => context.commit('SHOW_ORDER_SUCCESS'), // Action для мутации showOrderSuccess - меняем  success для отображения компонента CartSuccess, если заказ верно оформлен        
    hideOrderSuccess: context => context.commit('HIDE_ORDER_SUCCESS'), // Action для мутации showOrderSuccess - меняем  success, чтобы не отобразило компонент CartSuccess при открытии корзины        
    countProductsInCart: context => context.commit('LIST_OF_PRODUCTS_IN_CART'), // Action для мутации goodsCounter - меняем cartCount для подсчета кол-ва товаров в корзине        
};

const mutations = {
    ADD_TO_CART: (state, item) => {
        const storage = JSON.parse(localStorage.getItem("products"));
        storage ? state.cartProducts = storage : state.cartProducts = []; // Дополнительно: для сохранения корзины при перезагрузке, но надо через бэк делать лучше для авторизованных юзеров
        state.cartProducts.push(item); // Добавляем новый товар в список корзины                              
    },
    // Получение списка товаров в корзине и подсчет их кол-ва при загрузке страницы 
    LIST_OF_PRODUCTS_IN_CART: state => {
        const storage = JSON.parse(localStorage.getItem("products"));
        state.cartProducts = storage || [];
    },
    /* 
        Удаляем товар из корзины по клику на картинку корзины по текущему индексу, 
        т.к. для товаров не предусмотрен счетчик и повторяться могут одни и те же товары. 
        Если удалять по ID, то удалятся все товары по ID, а не один, который лишний 
    */
    DELETE_FROM_CART: (state, item) => {
        const newState = state.cartProducts.filter(index => index !== item); // Удаляем из списка корзины выбранный товар     
        state.cartProducts = newState; // Обновляем список товаров в корзине            
    },
    // Меняем state succes, если данные заполнены в корзине верно
    SHOW_ORDER_SUCCESS: state => {
        state.success = true, // Меняем флаг для отображения компонента успешно оформленного заказа
        state.cartProducts = []; // Очищаем список товаров корзины
        state.cartCount = 0; // Сбрасываем счетчик товаров корзины
        localStorage.removeItem("products") //Очищаем localStorage, чтобы не прогрузило из него товары, которые были оформлены в заказе
    },
    HIDE_ORDER_SUCCESS: state => state.success = false // При закрытии корзины меняем state succes false, чтобы не отобразило компонент CartSuccess при открытии корзины
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}