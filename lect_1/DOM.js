const divB = document.createElement('div');
const divA = document.createElement('div');
divA.innerHTML = 'div A';
divB.innerHTML = 'div B';
document.querySelector('.div-3').insertAdjacentElement('beforebegin', divA);