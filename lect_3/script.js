const selectElement = document.querySelector('#country-select');
const capitalInfoElement = document.querySelector('#capital-info');

selectElement.onchange = (el) => {
    const selectCountry = selectElement.value;
    let capital = '';
    switch (selectCountry) {
        case 'russia':
            capital = 'Москва';
            break;
        case 'usa':
            capital = 'Вашингтон';
            break;
        case 'china':
            capital = 'Пекин';
            break;
        default:
            capital = 'Выберите страну, чтобы узнать столицу.';
    }
    capitalInfoElement.textContent = capital;
};

(async () => {
    const response = await fetch('https://catfact.ninja/fact');
    console.log(response.status);
    console.log(response.ok);
    console.log(await response.json());
})();
fetch('https://catfact.ninja/fact')
    .then(response => response.json())
    .then(console.log)
    .catch(e => console.log(e));

fetch('https://randomuser.me/api/?results=5')
    .then(response => response.json())
    .then(console.log)
    .catch(e => console.log(e));
