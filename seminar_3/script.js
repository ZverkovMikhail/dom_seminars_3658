/*
Вы разрабатываете интернет-магазин и хотите добавить функциональность динамического фильтрации товаров по категориям.
У вас есть форма с выпадающим списком (select), в котором пользователь может выбрать категорию товаров.
При выборе категории товаров, необходимо динамически обновлять список отображаемых товаров на странице,
чтобы пользователь видел только товары из выбранной категории.

    Создайте интерфейс веб-страницы, который включает в себя следующие элементы:
    Выпадающий список (select) с категориями товаров.
    Список товаров, который будет отображать товары в соответствии с выбранной категорией.
    Каждый товар в списке должен содержать название и категорию.

    Используйте JavaScript для обработки событий:
    При выборе категории товаров в выпадающем списке, форма должна следить за изменениями.
    Динамически обновите список товаров на странице, чтобы отображать только товары из выбранной категории.
    Создайте объекты товаров и их категорий для имитации данных магазина.
    Стилизуйте элементы интерфейса с помощью CSS для улучшения внешнего вида.

 */
const ACCESS_KEY = 'i5K8-Wq24NQ22ulKQU_i0glxdev-DtHAs_1K4eVk1RM';

// function createCart(data) {
//     const cartEl = document.createElement('li');
//     const titleEl = document.createElement('h3');
//     const CategoryEl = document.createElement('p');
//     cartEl.classList.add('product-cart');
//     titleEl.classList.add('product-title');
//     CategoryEl.classList.add('product-category');
//
//     titleEl.textContent = data.name;
//     cartEl.dataset.id = data.id;
//     CategoryEl.textContent = data.category;
//
//     cartEl.appendChild(titleEl);
//     cartEl.appendChild(CategoryEl);
//     return cartEl;
// }
//
// function displayProductList(productContainer, list) {
//     productContainer.innerHTML = '';
//     list.forEach((product) => {
//         productContainer.appendChild(createCart(product));
//     });
// }
//
// const productContainerEl = document.querySelector('.product-container');
// const productsData = [
//     {
//         id: 1,
//         name: "Ноутбук",
//         category: "Электроника",
//     },
//     {
//         id: 2,
//         name: "Смартфон",
//         category: "Электроника",
//     },
//     {
//         id: 3,
//         name: "Кофемашина",
//         category: "Бытовая техника",
//     },
//     {
//         id: 4,
//         name: "Фотокамера",
//         category: "Электроника",
//     },
//     {
//         id: 5,
//         name: "Микроволновая печь",
//         category: "Бытовая техника",
//     },
//     {
//         id: 6,
//         name: "Книга",
//         category: "Книги",
//     },
//     {
//         id: 7,
//         name: "Футболка",
//         category: "Одежда",
//     },
//     {
//         id: 8,
//         name: "Шапка",
//         category: "Одежда",
//     },
//     {
//         id: 9,
//         name: "Стул",
//         category: "Мебель",
//     },
//     {
//         id: 10,
//         name: "Стол",
//         category: "Мебель",
//     },
// ];
//
// displayProductList(productContainerEl, productsData);
//
// const categorySelectEl = document.querySelector('#category-select');
// categorySelectEl.addEventListener('change', () => {
//     const data = productsData.filter(
//         product => product.category.toLowerCase() === categorySelectEl.value.toLowerCase()
//     );
//     displayProductList(productContainerEl, data.length ? data : productsData);
// });

function addPictures(container) {
    fetch(`https://api.unsplash.com/photos/`, {
        method: 'GET',
        headers: {
            'Authorization': `Client-ID ${ACCESS_KEY}`,
        }
    })
        .then(response => response.json())
        .then((data) => {
            data.forEach((pic) => {
                const imgEl = document.createElement('img');
                imgEl.src = pic.urls.regular;
                imgEl.classList.add('unsplash-img');
                container.appendChild(imgEl);
            });
        })
        .catch(e => console.log(e));
}

const imageContainerEl = document.querySelector('.img-container');
addPictures(imageContainerEl);

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        addPictures(imageContainerEl);
        console.log('addPictures')
    }
});