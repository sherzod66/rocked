const rulesButton = document.querySelector('.rules__game');
const rulesBody = document.querySelector('.rules__game-body');

rulesButton.onclick = getClick;

rulesBody.addEventListener('click', getClick2);

function getClick(event) {
    rulesBody.classList.remove('_js-remove');
    if (!rulesBody.closest('._js-remove')) {
        document.body.classList.add('lock');
        wrapper.classList.add('blur');
        rulesBody.classList.add('_js-show');
    }

}

function getClick2(event) {
    if (!event.target.closest('.rules__game-body-content')) {
        wrapper.classList.remove('blur');
        rulesBody.classList.remove('_js-show');
        rulesBody.classList.add('_js-remove');
        document.body.classList.remove('lock');
    } else if (event.target.closest('.fa-circle-xmark')) {
        wrapper.classList.remove('blur');
        rulesBody.classList.remove('_js-show');
        rulesBody.classList.add('_js-remove');
        document.body.classList.remove('lock');
    }
}