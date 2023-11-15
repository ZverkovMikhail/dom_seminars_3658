/*
Цель: Разработать веб-приложение, которое каждый день будет отображать новое случайное изображение из коллекции
Unsplash, давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.

Регистрация на Unsplash:

• Перейдите на веб-сайт Unsplash (https://unsplash.com/).
• Зарегистрируйтесь или войдите в свой аккаунт. (если у вас не было регистрации до этого, новый аккаунт создавать
  не нужно).

Создание приложения:

• Перейдите на страницу разработчика Unsplash (https://unsplash.com/developers).
• Нажмите "New Application".
• Заполните необходимую информацию о приложении (можете использовать http://localhost для тестирования).
• Получите свой API-ключ после создания приложения.

Разработка веб-приложения:

• Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк", при нажатии на которую
  подсвечивается "лайкнутый" элемент
 */
const ACCESS_KEY = 'YOUR ACCESS_KEY';
const AUTH_ACCESS_KEY = 'YOUR AUTH_KEY';
let currentPhotoId = '';
let currentPhotoData = {};

function getRandomPhoto(callback) {
    fetch(`https://api.unsplash.com/photos/random`, {
        method: 'GET', headers: {
            'Authorization': `Client-ID ${ACCESS_KEY}`,
        }
    })
        .then(response => response.json())
        .then(callback)
        .catch(e => console.log(e));
}

function getPhoto(id, callback) {
    fetch(`https://api.unsplash.com/photos/${id}`, {
        method: 'GET', headers: {
            'Authorization': `Client-ID ${ACCESS_KEY}`,
        }
    })
        .then(response => response.json())
        .then(callback)
        .catch(e => console.log(e));
}

function setPhoto(container, data) {
    currentPhotoId = data.id;
    const cartEl = document.createElement('div');
    cartEl.innerHTML = `<img class="unsplash-img" src="${data.urls.regular}" alt="${data.alt_description}">
        <div class="created-date">${new Date(data.created_at).toLocaleDateString()}</div>
        <div class="username">${data.user.name}</div>
        <a href="https://www.instagram.com/${data.user.instagram_username}/">Перейти в инстаграм пользователя</a>
        <div class="location">${data.user.location}</div>
        <span class="like-counter">Лайков: ${data.likes}</span>
        <button class="like-button">
            <svg class="like-icon">
                <use xlink:href="#like-icon"></use>
            </svg>
        </button>`;
    cartEl.querySelector('.like-button').addEventListener('click', () => {
        likePhoto(data.id, () => {
            getPhoto(data.id, (data) => {
                setPhoto(imageContainerEl, data);
            });

        });
    })
    container.appendChild(cartEl);
}

function likePhoto(id, callback) {
    fetch(`https://api.unsplash.com/photos/${id}/like/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AUTH_ACCESS_KEY}`,
        }
    })
        .then(response => response.json())
        .then(callback)
        .catch(e => console.log(e));
}

const imageContainerEl = document.querySelector('.img-container');
const now = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf()
lastPhotoUpdatedDate = localStorage.getItem('last_photo_updated_date');

if (!lastPhotoUpdatedDate || parseInt(lastPhotoUpdatedDate) < today) {
    localStorage.setItem('last_photo_updated_date', String(today));
    getRandomPhoto((data) => {
        currentPhotoData = data;
        localStorage.setItem('last_photo_data', JSON.stringify(currentPhotoData));
        setPhoto(imageContainerEl, currentPhotoData);
    });
} else {
    data = JSON.parse(localStorage.getItem('last_photo_data'));
    setPhoto(imageContainerEl, data);
}

