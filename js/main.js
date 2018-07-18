let cardSkin = 'homer';
let currentSkin = '';
let complexity = 6; 
let cardArray = []; 
let pair = null;
let flag = true;
let win = complexity/2;
let time = 0;

let images = [
	'Abraham_Simpson'
    , 'Apu_Nahasapeemapetilon'
    , 'Barney_Gumble'
    , 'Carl_Carlson'
    , 'Clancy_Wiggum'
    , 'Cletus_Spuckler'
    , 'Comic_Book_Guy'
    , 'Duff_man'
    , 'Edna_Krabappel'
    , 'Groundskeeper_Willie'
    , 'Herman_Hermann'
    , 'Homer_Simpson'
    , 'Jimbo_Jones'
    , 'Krusty_The_Clown'
    , 'Lenny_Leonard'
    , 'Lisa_Simpson'
    , 'Marge_Simpson'
    , 'Moe_Szyslak'
    , 'Montgomery_Burns'
    , 'Otto_Mann'
    , 'Selma_Bouvier'
];

let addCard = function (back_img) {
	let cont = document.createElement('div');
	let card = document.createElement('div');
	card.setAttribute('flipped_card', back_img);
	let front = document.createElement('div');
	let back = document.createElement('div');
	let frontImg = document.createElement('img');
	let backImg = document.createElement('img');
	frontImg.setAttribute('src', '../img/cards/skin/' + cardSkin + '.jpg');
	backImg.setAttribute('src', '../img/cards/' + back_img + '.png');
	cont.classList.add('flip');
	card.classList.add('card');
	front.classList = 'face front';
	back.classList = 'face back';
	front.appendChild(frontImg);
	back.appendChild(backImg);
	document.querySelector('.game_frame').appendChild(cont);
	cont.appendChild(card);
	card.appendChild(front);
	card.appendChild(back);
}

let init = function () {
	restart();
	addAllCards();
	setTimeout(showAllCards, 200);
	win = complexity/2;
	time = 0;
	increment();
	
}

let addAllCards = function () {
	cardRandom();
	cardStack = cardArray.slice();
	while (cardStack.length) {
		cardStack.sort(compareRandom);
		addCard(images[cardStack.shift()]);
	}
}

let cardRandom = function () {
	let arr = [];
	while (arr.length < complexity / 2) {
		let rnd = Math.floor(Math.random() * images.length);
		if (arr.indexOf(rnd) === -1) arr.push(rnd);
	}
	cardArray = arr.concat(arr);
}

let flipEvent = function (event) {
	let frame = event.target.parentElement.parentElement;
	if (frame.getAttribute('flipped_card') && flag) {
		switchClass(frame);
		if (pair !== null) {
			flag = !flag;
			setTimeout(checkCards, 1800, frame);
		}
		else pair = frame;
	}
}

let showAllCards = function rec(){
	flag= !flag;
	let cards = document.querySelectorAll('.card');
	for(let i = 0; i < cards.length; i++){
		switchClass(cards[i]);
	}
	if(!flag)setTimeout(rec, 2000);
}

let switchClass = function (element) {
	element.classList.toggle('flipped');
}

let checkCards = function (frame) {
	let atr = frame.getAttribute('flipped_card');
	if (frame.classList.contains('flipped')) {
		let pair_atr = pair.getAttribute('flipped_card');
		if (pair_atr === atr) {
			frame.style.display = 'none';
			pair.style.display = 'none';
			win--;
			checkWin();
		}
		else {
			switchClass(frame);
			switchClass(pair);
		}
		pair = null;
		flag = !flag;
	}
}

let skinCase = function(event) {
	let currElem = event.target;
	if (currElem.tagName === 'IMG') {
		currentSkin.style = '';
		cardSkin = event.target.alt;
		currElem.style = 'transform: scale(1.2); border: 5px solid #ead520;'
		currentSkin = currElem;
	}
	if (currElem.tagName === 'INPUT') {
		complexity = currElem.value;
		win = currElem.value / 2;
	}
}

let restart = function(){
	let gameFrame = document.querySelector('.game_frame');
	while (gameFrame.hasChildNodes()) {
		gameFrame.removeChild(gameFrame.lastChild);
	}
	let frame = gameFrame.parentElement;
	frame.onclick = flipEvent;
}

let checkWin = function(){
	if(!win){
		restart();
		let winImage = document.querySelector('.win-image').cloneNode(true);
		winImage.style = 'display: block';
		document.querySelector('.game_frame').appendChild(winImage);
	}
}

let compareRandom = function(a, b) {
	return Math.random() - 0.5;
}

let increment = function (){
	if(win){
        	setTimeout(function(){
            time++;
            let mins = Math.floor(time/10/60);
            let secs = Math.floor(time/10 % 60);
            let hours = Math.floor(time/10/60/60);
			if(hours < 10){
                hours = "0" + hours;
            }
            if(mins < 10){
                mins = "0" + mins;
            }
            if(secs < 10){
                secs = "0" + secs;
            }
            document.querySelector('.time').innerHTML = hours + ":" + mins + ":" + secs;
            increment();
        },100)
	}
}

document.querySelector('.game_select').addEventListener('click', skinCase);
document.querySelector('.startBtn').addEventListener('click', init);