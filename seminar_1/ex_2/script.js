"use strict";
let selectedElement = null;
const contentEl = document.querySelector('.content');

let boxes = Array.from(document.querySelectorAll('.box'));

boxes.forEach((box) => {
    box.addEventListener('click', clickBoxListener);
});

function clickBoxListener(e) {
    activeReset();
    if (selectedElement === e.target) {
        e.target.classList.remove('box_active');
        selectedElement = null;
    } else {
        e.target.classList.add('box_active');
        selectedElement = e.target;
    }
}

function activeReset() {
    boxes.forEach((box) => {
        box.classList.remove('box_active');
    });
}

document.querySelector('.create-button').addEventListener('click', () => {
    const boxEl = document.createElement('div');
    boxEl.classList.add('box');
    boxEl.addEventListener('click', clickBoxListener);
    boxEl.textContent = String(contentEl.childElementCount + 1);
    contentEl.append(boxEl)
    boxes.push(boxEl);
});

document.querySelector('.delete-button').addEventListener('click', () => {
    if (contentEl.childElementCount > 0) {
        if (selectedElement) {
            selectedElement.remove()
            selectedElement = null;
        } else {
            contentEl.lastChild.remove();
        }
    }

});

document.querySelector('.clone-button').addEventListener('click', () => {
    let clone;
    activeReset();
    if (selectedElement) {
        clone = selectedElement.cloneNode(true);
        selectedElement.after(clone);
    } else {
        clone = contentEl.lastElementChild.cloneNode(true)
        contentEl.append(clone);
    }
    boxes.push(clone);
    clone.addEventListener('click', clickBoxListener);
});
