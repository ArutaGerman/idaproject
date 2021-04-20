const URL_CATEGORY_PRODUCTS = "https://front-test.idalite.com/api/product?category=";
const URL_CATEGORIES_LIST = "https://front-test.idalite.com/api/product-category";

export const fetchProducts = (id, array) =>
    fetch(URL_CATEGORY_PRODUCTS + id)
    .then(response => response.json())
    .then(answer => {
        array.push(...answer);
    });

export const fetchCategories = array =>
      fetch(URL_CATEGORIES_LIST)
        .then(response => response.json())
        .then(answer => array.push(...answer));   