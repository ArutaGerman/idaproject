export const Url = "https://front-test.idalite.com"

const URL_CATEGORY_PRODUCTS = `${Url}/api/product?category=`;
const URL_CATEGORIES_LIST = `${Url}/api/product-category`;

// отправляем запрос на API для получения списка товаров
export const fetchProducts = async (id) => {
    const response = await fetch(URL_CATEGORY_PRODUCTS + id);
    return response.json()
}

// отправляем запрос на API для получения списка категорий товаров
export const fetchCategories = async () => {
    const response = await fetch(URL_CATEGORIES_LIST);
    return response.json()
}