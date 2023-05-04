

const circle = document.querySelector('.game__name-circle')
const imgIcon = document.getElementById('language')
const bidButton = document.getElementById('bid-button')
const getBid = document.getElementById('get-bid')
const canselBid = document.getElementById('cansel')
const corrency = document.getElementById('corrency')
const info1 = document.getElementById('info-1')
const info2 = document.getElementById('info-2')
const info3 = document.getElementById('info-3')
const info4 = document.getElementById('info-4')
const win1 = document.getElementById('win1')
const win2 = document.getElementById('win2')
const loosBid = document.querySelector('.loos')
const rulesGame = document.querySelector('.rules__game>p')
const gameHistory = document.querySelector('.user__story-bid__container>p')
const clientName = document.querySelector('.label-name')
const subBtt = document.querySelector('.button-submit')
const noMany = document.querySelector('.no-money__body>p')
const wait = document.querySelector('.no-bid__body>p')


circle.onclick = clickF;

getLang()
function clickF(event) {
    if (!this.classList.contains('_js-uzb')) {
        this.classList.toggle('_js-uzb')
        imgIcon.src = 'img/icon/uzbekistan.png'
        sendLang('uzb')
        changeLanguageUz()
    } else {
        this.classList.toggle('_js-uzb')
        imgIcon.src = 'img/icon/russia.png'
        sendLang('rus')
        changeLanguageRu()
    }
}

function getLang() {
    if (localStorage.getItem('lang')) {
        console.log('a')
        let info = localStorage.getItem('lang');
        if (info === 'uzb') {
            circle.classList.add('_js-uzb');
            imgIcon.src = 'img/icon/uzbekistan.png'
            changeLanguageUz()
        } else {
            circle.classList.remove('_js-uzb')
            changeLanguageRu()
        }

    }
}
function sendLang(lang) {
    localStorage.setItem('lang', lang)
}





function changeLanguageUz() {
    corrency.textContent = `So'm`
    loosBid.textContent = 'Siz tikishni ololmadingiz'
    bidButton.textContent = 'Tikish'
    getBid.textContent = 'Olish'
    canselBid.textContent = 'Bekor qilish'
    rulesGame.textContent = 'O\'yin qoidalari'
    gameHistory.innerHTML = '<i class="fa-solid fa-clock-rotate-left"></i> Tiklash tarixi'
    info1.textContent = 'Kerakli miqdorni kiriting va "Tikish" tugmani bosing'
    info2.textContent = 'Raqamlar o\'sishini kuzating'
    info3.textContent = 'To\'xtashdan oldin raqamlarni yechib oling va X marta ko\'proq yutib oling!'
    info4.textContent = "Biroq, vaqt chegaralari borligini unutmang. Senga kerak chekinmoq oldin mablag'lar raqamlar to'xtaydi, aks holda siz tikishingizni yo'qotasiz. Hamma narsa sizga bog'liq!"
    clientName.textContent = 'Nomingizni yozing:'
    subBtt.textContent = 'Keyingisi'
    noMany.textContent = 'Balans yetarli emas!'
    win1.textContent = 'Siz olishga muvaffaq bo\'ldingiz!'
    win2.textContent = 'Sizning yutuqingiz'
    wait.textContent = 'O\'yin oxirigacha kuting!'
}

function changeLanguageRu() {
    corrency.textContent = `Сум`
    loosBid.textContent = 'Всё улетел паршивец, кто успел тот и съел🤑'
    bidButton.textContent = 'Ставка'
    getBid.textContent = 'Забрать'
    canselBid.textContent = 'Отмена'
    rulesGame.textContent = 'Правила игры'
    gameHistory.innerHTML = '<i class="fa-solid fa-clock-rotate-left"></i> История ставок'
    info1.textContent = 'Введите нужную сумму и нажмите кнопку "СТАВКА"'
    info2.textContent = 'Следите как цифры растут'
    info3.textContent = 'Выводи прежде чем остановиться цифры и выиграй в X раз больше!'
    info4.textContent = "Однако не забывайте, что у вас есть ограничения по времени. Вам нужно вывести средства до того, как остановятся цифры, иначе вы потеряете свою ставку. Все зависит от вас!"
    clientName.textContent = 'Введите имя:'
    subBtt.textContent = 'Дальше'
    noMany.textContent = 'Недостаточно средств на балансе!'
    win1.textContent = 'Вы успели забрать!'
    win2.textContent = 'Ваш выигрыш'
    wait.textContent = 'Дождитесь окончания игры!'
}
