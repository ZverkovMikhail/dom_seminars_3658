/*
Отслеживание изменения ориентации экрана: Напишите код, который отслеживает изменение ориентации экрана устройства
(с портретной на ландшафтную и наоборот) и выводит сообщение об этом на веб-странице.
*/


const printOrientation = () => {
    const orientationType = screen.orientation.type;
    let text = '';
    console.log(orientationType)
    if (orientationType === 'landscape-primary' || orientationType === 'landscape-secondary') {
        text = 'Ландшафтная';
    } else {

        text = 'Портретная';
    }
    document.querySelector('.position').textContent = text;
}
printOrientation();
window.addEventListener('orientationchange', printOrientation);


/*
Предупреждение о несохраненных данных:
Создайте веб-форму с текстовым полем. Реализуйте функционал, при котором при попытке закрыть вкладку браузера
появляется диалоговое окно с предупреждением о возможности потери введенных, но несохраненных данных.
*/

const beforeUnloadListener = function (event){
  event.preventDefault();
  // не нашел способа изменить сообщение выводимое браузера, в любом случае выводит стандартное.
  return event.returnValue = 'При закрытии окна введенные вами данные будут потеряны! Вы уверены?';
};

const nameInput = document.querySelector('#text-input');

nameInput.addEventListener('input', (event) => {
  if (event.target.value !== '') {

    window.addEventListener('beforeunload', beforeUnloadListener, );
  } else {
    window.removeEventListener('beforeunload', beforeUnloadListener, );
  }
});
