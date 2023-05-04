"use strict"

const tablo = document.querySelector('.tablo >span')
const loos = document.querySelector('.loos')
const button = document.querySelector('.button')
const user__name = document.querySelector('.user__name')
const user__money = document.querySelector('.user__money > span')
const input = document.querySelector('.input')
const moneyError = document.querySelector('.no-money');
const dontBid = document.querySelector('.no-bid');
const userWin = document.querySelector('.win-game');
const userWinInfo = document.querySelector('.win-game__body');

//const nameUser = prompt("Введи имя: ")

if (!localStorage.getItem('userMoney')) {
	localStorage.setItem('userMoney', '100000')
}



const userInfo = {
	name: '',
	money: +localStorage.getItem('userMoney')
}

const rachetArray = [];
const rachetHistory = [];

user__money.textContent = userInfo.money
let rachet = 1.00
let bid;
let randomSecond;


const gameBank = [
	{ money: 500000 },
]
const userBidInfo = [];


const lineWhite = document.querySelector('.game-reset__line');
const gameReset = document.querySelector('.game-reset');

function animate(time) {
	requestAnimationFrame(animate);
	console.log(userInfo.money)
	if (userInfo.name) {
		if (!lineWhite.classList.contains('active') && !lineWhite.classList.contains('_js-active')) {
			lineWhite.classList.add('active');
			lineWhite.classList.add('_js-active');
			setTimeout(function (e) {
				lineWhite.classList.remove('active');
				gameReset.classList.add('removeRest');
				if (gameReset.closest('.removeRest')) {
					if (button.closest('._cancellation')) {
						button.classList.remove('_cancellation');
						button.classList.add('_js-active-bid');
					}
				}

				loos.classList.remove('_js-loos')


				if (!loos.classList.contains('_js-tablo-active')) {
					let random;
					let randomRound;
					if (gameBank[0].money <= 100000) {
						random = Math.random() * 1.4;
						randomRound = Math.round(random * 100) / 100;

					} else if (gameBank[0].money <= 200000) {
						random = Math.random() * 4;
						randomRound = Math.round(random * 100) / 100;

					} else if (gameBank[0].money <= 250000) {
						random = Math.random() * 6;
						randomRound = Math.round(random * 100) / 100;

					}
					else {
						random = Math.random() * 11;
						randomRound = Math.round(random * 100) / 100;
					}
					loos.classList.remove('_js-loos');

					if (randomRound <= 0.99) {
						randomRound = 1.00
					}
					loos.classList.add('_js-tablo-active');

					let intervalId = setInterval(e => {
						if (rachet <= randomRound) {
							if (rachet > 2.00) {
								let c = rachet + 0.02 + Number.EPSILON;
								rachet = Math.round(c * 100) / 100;
							}
							else {
								let c = rachet + 0.01 + Number.EPSILON;
								rachet = Math.round(c * 100) / 100;
							}

							rachetArray.push(rachet);
							tablo.textContent = rachet;
							getWinMoney()

						} else if (rachet >= randomRound) {
							clearInterval(intervalId)
							loos.classList.add('_js-loos')
							button.classList.remove('_js-active-bid');
							setTimeout(function () {
								rachet = 1.00;
								bid = '';
								loos.classList.remove('_js-tablo-active');
								lineWhite.classList.remove('_js-active');
								gameReset.classList.remove('removeRest');
								rachetHistory.push(rachetArray[rachetArray.length - 1])
								neElement();
								newUserHistoryNum();
								ifNum();
								rachetArray.length = 0;
							}, 2000)

						}
					}, 100)

				}
			}, 7000)

		}
	}

}
animate()


button.addEventListener('click', function (event) {
	if (!button.closest('._js-active-bid')) {
		if (!gameReset.classList.contains('removeRest')) {
			if (input.value >= 1400 && userInfo.money >= input.value) {
				button.classList.toggle('_cancellation');
				if (event.target.closest('._cancellation')) {
					bid = +input.value;
					newUserHistory();
					userBidInfo.push(bid)
					gameBank[0].money += bid;
					localStorage.setItem('userMoney', userInfo.money - bid)
					userInfo.money = +localStorage.getItem('userMoney');
					user__money.textContent = userInfo.money;
				} else {
					bid = +input.value;
					gameBank[0].money -= bid;
					localStorage.setItem('userMoney', userInfo.money + bid)
					userInfo.money = +localStorage.getItem('userMoney');
					user__money.textContent = userInfo.money;
					removeElement()
				}
			} else {
				if (event.target.closest('._cancellation')) {
					bid = +input.value;
					gameBank[0].money -= bid;
					userInfo.money = userInfo.money + bid;
					user__money.textContent = userInfo.money;
					button.classList.remove('_cancellation');
				} else {
					noMoney()
				}

			}
		} else {
			gameDontStope()
		}

	} else {
		let win = bid * Math.round(rachetArray[rachetArray.length - 1] * 100) / 100;
		gameBank[0].money -= win;
		localStorage.setItem('userMoney', win)
		userInfo.money += +localStorage.getItem('userMoney');
		localStorage.setItem('userMoney', userInfo.money)
		gameWin();
		newUserHistoryWin()
		button.classList.remove('_js-active-bid');

		user__money.textContent = userInfo.money;
	}

});

const mainBid = document.forms[0];
mainBid.addEventListener('submit', event => {
	event.preventDefault();
});


function noMoney() {
	moneyError.classList.add('_js-money');
	setTimeout(e => moneyError.classList.remove('_js-money'), 1000);
}
function gameDontStope() {
	dontBid.classList.add('_js-stop');
	setTimeout(e => dontBid.classList.remove('_js-stop'), 1000);
}
function gameWin() {
	userWin.classList.add('_js-win');
	const iconWin = document.querySelector('#col1');
	iconWin.lastElementChild.textContent = `x${rachetArray[rachetArray.length - 1]}`
	const iconWin2 = document.querySelector('#col2');
	iconWin2.firstElementChild.textContent = `${bid * Math.round(rachetArray[rachetArray.length - 1] * 100) / 100}S`

	setTimeout(e => userWin.classList.remove('_js-win'), 4000);
}

const neElement = function () {
	const elemet = document.createElement('div');
	elemet.classList.add('game-history__item');
	const lastNum = rachetHistory[rachetHistory.length - 1]
	elemet.textContent = lastNum;
	if (+lastNum >= 10) {
		elemet.classList.add('yellow');

	} else if (+lastNum >= 2) {
		elemet.classList.add('purple');
	}
	else {
		elemet.classList.add('blue');
	}

	const rachetHistoryContainer = document.querySelector('.game-history__row');
	rachetHistoryContainer.prepend(elemet)
}

function getWinMoney() {
	const winningMoney = document.getElementById('money');
	winningMoney.textContent = bid * Math.round(rachetArray[rachetArray.length - 1] * 100) / 100 + ' Сум';
}


let block;
const newUserHistory = function () {
	block = document.createElement('div');
	block.classList.add('user__story-bid-column');
	block.innerHTML = `
		<div class="user__story-bid-money">${input.value}Сум</div>
		<div id="2el" class="user__story-bid-over"></div>
		<div class="user__story-bid-win">—</div>
		`;
	const userHistoryBody = document.querySelector('.user__story-bid-body');
	userHistoryBody.prepend(block)
}

function newUserHistoryNum() {
	const lastNum = rachetHistory[rachetHistory.length - 1]
	document.getElementById('2el').textContent = `${lastNum}`
}

function newUserHistoryWin() {
	block.lastElementChild.textContent = `${bid * Math.round(rachetArray[rachetArray.length - 1] * 100) / 100}`
	block.classList.add('_js-win')
}
function ifNum() {
	const rachetNum = document.getElementById('2el');
	const lastNum = rachetHistory[rachetHistory.length - 1]
	if (+lastNum >= 10) {
		rachetNum.classList.add('yellow');

	} else if (+lastNum >= 2) {
		rachetNum.classList.add('purple');
	}
	else {
		rachetNum.classList.add('blue');
	}
}
function removeElement() {
	const userHistoryBody = document.querySelector('.user__story-bid-body');
	userHistoryBody.firstElementChild.remove();
}