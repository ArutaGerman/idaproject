const URL_CATEGORY_PRODUCTS = "https://front-test.idalite.com/api/product?category=";
const URL_CATEGORIES_LIST = "https://front-test.idalite.com/api/product-category";

// отправляем запрос на API для получения списка товаров
export const fetchProducts = (id, array) =>
    fetch(URL_CATEGORY_PRODUCTS + id)
        .then(response => response.json())
        .then(answer => {
            array.push(...answer);

            // Преобразуем цену из числа формата 999999 в строку с разделителем '99 999', '999 999' 
            // и создаем новый ключ priceToTemplate в массиве для вывода в шаблон.
            // Старый ключ price используется для сортировки на странице при выборе соответствующего параметра пользователем
            const createPriceToTemplate = item => {
                if (item.price < 100000) {
                    let a = item.price.toString().slice(0, 2);
                    let b = item.price.toString().slice(2);
                    item.priceToTemplate = a + " " + b;
                } else if (item.price > 100000){
                    let a = item.price.toString().slice(0, 3);
                    let b = item.price.toString().slice(3);
                    item.priceToTemplate = a + " " + b;
                }                    
            }
            return array.map(item => createPriceToTemplate(item))
        });

// отправляем запрос на API для получения списка категорий товаров
export const fetchCategories = array =>
    fetch(URL_CATEGORIES_LIST)
        .then(response => response.json())
        .then(answer => array.push(...answer));