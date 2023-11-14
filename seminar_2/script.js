
const button = document.querySelector('.button');
if (button) {
    document.querySelector('.button').addEventListener('click', (e) => {
        if (e.isTrusted) {
            const text = e.target.textContent;
            e.target.textContent = 'Товар добавлен в корзину';
            setTimeout(() => {
                e.target.textContent = text;
            }, 2000);
        }
    });
}

window.addEventListener('load', () => {
    if (getLastPartOfUrl(window.location.href) === 'product.html') {
        setTimeout(() => {
            history.back();
        }, 2000);
    }
});

function getLastPartOfUrl(url) {
    const parts = url.split('/');
    return parts.at(-1);
}