const URL_CATEGORY_PRODUCTS = "https://front-test.idalite.com/api/product?category=";
const URL_CATEGORIES_LIST = "https://front-test.idalite.com/api/product-category";

// отправляем запрос на API для получения списка товаров
export const fetchProducts = (id, listOfGoods) =>
    fetch(URL_CATEGORY_PRODUCTS + id)
        .then(response => response.json())
        .then(answer => listOfGoods.push(...answer));

// отправляем запрос на API для получения списка категорий товаров
export const fetchCategories = listOfCategories =>
    fetch(URL_CATEGORIES_LIST)
        .then(response => response.json())
        .then(answer => listOfCategories.push(...answer));