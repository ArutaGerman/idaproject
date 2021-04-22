import Vue from 'vue'
import Vuex from 'vuex'
// import cart from "./modules/cart"
// import mutations from "./mutations"

Vue.use(Vuex)

export default new Vuex.Store({
    // cart,
    state: {
        cartProducts: [],                                                                       // Список товаров в корзине
        cartCount: 0,                                                                           // Счетчик товаров в корзине
        success: false,                                                                         // Флаг успешно оформленного заказа
        idCategory: 1                                                                           // Id категории товаров из меню выбора категории товаров
    },

    actions: {        
        addToCart: (context, payload) => context.commit('addToCart', payload),                  // Action для мутации addToCart - Добавляем в корзину товар
        showOrderSuccess: context => context.commit('showOrderSuccess'),                        // Action для мутации showOrderSuccess - меняем  success для отображения компонента CartSuccess, если заказ верно оформлен        
        hideOrderSuccess: context => context.commit('hideOrderSuccess'),                        // Action для мутации showOrderSuccess - меняем  success, чтобы не отобразило компонент CartSuccess при открытии корзины        
        CountProductsInCart: context => context.commit('CountProductsInCart'),                  // Action для мутации CountProductsInCart - меняем cartCount для подсчета кол-ва товаров в корзине        
        getID: (context, payload) => context.commit('getIdCategories', payload)                 // Action для мутации getIdCategories - получаем id категории для загрузки списка товаров на странице просмотра
    },

    mutations: {
        // Получаем id категории товаров при выборе категории в меню
        getIdCategories: (state, payload) => {
            localStorage.setItem("idCategory", JSON.stringify(payload));
            JSON.parse(localStorage.getItem("idCategory")) ? state.idCategory = payload : state.idCategory = 1;
        },
        // Получение списка товаров в корзине и подсчет их кол-ва при загрузке страницы 
        CountProductsInCart: state => {
            const storage = JSON.parse(localStorage.getItem("products"));
            state.cartProducts = storage || [];
            if (!storage) state.cartCount = 0;
        },
        // Добавляем товары в корзину по клику на кнопку "добавить/купить" и обновляем счетчик
        addToCart: (state, payload) => {
            const storage = JSON.parse(localStorage.getItem("products"));
            storage ? state.cartProducts = storage : state.cartProducts = [];                   // Дополнительно: для сохранения корзины при перезагрузке, но надо через бэк делать лучше для авторизованных юзеров
            state.cartProducts.push(payload);                                                   // Добавляем новый товар в список корзины          
            localStorage.setItem("products", JSON.stringify(state.cartProducts));               // Дополнительно: добавляем новые товары в localstorage
        },        
        /* 
            Удаляем товар из корзины по клику на картинку корзины по текущему индексу, 
            т.к. для товаров не предусмотрен счетчик и повторяться могут одни и те же товары. 
            Если удалять по ID, то удалятся все товары по ID, а не один, который лишний 
        */
        deleteFromCart: (state, payload) => {
            const newState = state.cartProducts.filter(index => index !== payload);             // Удаляем из списка корзины выбранный товар     
            localStorage.setItem("products", JSON.stringify(newState));                         // Обновляем список товаров в localStorage         
            state.cartProducts = newState;                                                      // Обновляем список товаров в корзине      
            if (JSON.parse(localStorage.getItem("products")).length == 0) state.cartCount = 0   // Обновляем счетчик кол-ва товаров       
        },        
        // Меняем state succes, если данные заполнены в корзине верно
        showOrderSuccess: state => {
            state.success = true,                                                               // Меняем флаг для отображения компонента успешно оформленного заказа
                state.cartProducts = [];                                                        // Очищаем список товаров корзины
            state.cartCount = 0;                                                                // Сбрасываем счетчик товаров корзины
            localStorage.removeItem("products")                                                 //Очищаем localStorage, чтобы не прогрузило из него товары, которые были оформлены в заказе
        },
        hideOrderSuccess: state => state.success = false                                        // При закрытии корзины меняем state succes false, чтобы не отобразило компонент CartSuccess при открытии корзины
    },

    getters: {        
        productsInCart: state => state.cartProducts,                                            // Список товаров в корзине                                                                            
        countProducts: state => state.cartCount = state.cartProducts.length,                    // Счетчикт товаров в корзине        
        successCart: state => state.success,                                                    // Состояние успешного оформления заказа        
        idCategories: state => state.idCategory,                                                // получаем id категории товаров
    },
    modules: {}
})