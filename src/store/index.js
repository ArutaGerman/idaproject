import Vue from 'vue'
import Vuex from 'vuex'
// import cart from "./modules/cart"
// import mutations from "./mutations"

Vue.use(Vuex)

export default new Vuex.Store({
    // cart,
    state: {
        currentProduct: [],
        cartProducts: [],
        cartCount: 0,
        success: false,
        idCategory: null,
        getLocalStorage: JSON.parse(localStorage.getItem("products"))
    },
    actions: {
        // Action для мутации addToCart - Добавляем в корзину товар
        addToCar: (context, payload) => context.commit('addToCart', payload),
        // Action для мутации showOrderSuccess - меняем state success для отображения компонента CartSuccess
        showOrderSuccess: context => context.commit('showOrderSuccess'),
        // Action для мутации showOrderSuccess - меняем state success, чтобы не отобразило компонент CartSuccess при открытии корзины
        hideOrderSuccess: context => context.commit('hideOrderSuccess'),
        CountProductsInCart: context => context.commit('CountProductsInCart'),
        getID: (context, payload) => context.commit('getIdCategories', payload)

    },
    mutations: {
        getIdCategories: (state, payload) =>{
            state.idCategory = payload;
            console.log(payload);
        },
        // Получение списка товаров в корзине и подсчет их кол-ва при загрузке страницы 
        CountProductsInCart: state => {
            state.cartProducts = state.getLocalStorage;
            if (state.getLocalStorage) {
                state.cartCount = state.cartProducts.length;
            } else {
                state.cartCount = 0;
            }            
        },
        // Добавляем товары в корзину по клику на кнопку "добавить/купить" и обновляем счетчик
        addToCart: (state, payload) => {     
            state.getLocalStorage ? state.cartProducts = state.getLocalStorage : state.cartProducts = []; // Дополнительно: для сохранения корзины при перезагрузке, но надо через бэк делать такое
            state.cartProducts.push(payload);  //добавляем новый товар в список корзины          
            localStorage.setItem("products", JSON.stringify(state.cartProducts)); // Дополнительно: добавляем новые товары в localstorage
            state.cartCount = state.cartProducts.length;            
        },
        /* 
            Удаляем товар из корзины по клику на картинку корзины по текущему индексу, 
            т.к. для товаров не предусмотрен счетчик и повторяться могут одни и те же товары. 
            Если удалять по ID, то удалятся все товары по ID, а не один, который лишний 
        */
        deleteFromCart: (state, payload) => {
            const newState = state.cartProducts.filter(index => index !== payload); // Удаляем из списка корзины выбранный товар     
            localStorage.setItem("products", JSON.stringify(newState));   // Обновляем список товаров в localStorage         
            state.cartProducts = newState; // Обновляем список товаров в корзине      
            state.getLocalStorage.length == 0 ? state.cartCount = 0 : state.cartCount = state.cartProducts.length;     // Обновляем счетчик кол-ва товаров       
        },
        // Меняем state succes, если данные заполнены в корзине верно
        showOrderSuccess: state => state.success = true,
        // При закрытии корзины меняем state succes false, чтобы не отобразило компонент CartSuccess при открытии корзины
        hideOrderSuccess: state => state.success = false
    },
    getters: {
        // Список товаров в корзине
        productsInCart: state => state.cartProducts,
        // Счетчикт товаров в корзине
        countProducts: state => state.cartCount,
        successCart: state => state.success,
        // получаем id категории товаров
        idCategories: state => state.idCategory,
    },
    modules: {}
})