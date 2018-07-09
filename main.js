//Элемент канва
let canvas = document.getElementById("canvas");
//Контекст рисования
let ctx = canvas.getContext('2d');
//Высота и ширина канвы
let heightWindow = canvas.height;
let widthWindow = canvas.width;
//Ссылка на gameLoop
let mainLoop;

let x = 10;
let y = 10;
let cellHeight = 26;
let cellRadius = cellHeight / 2.0;
let space = cellHeight + 5;

//Функция запускающая игру
function gameStart(callback){
	setMainLoop(callback);
	gameStep();
}

//Устанавливаем необходимый игровой цикл как текущий
function setMainLoop(loop){
	mainLoop = loop;
}

//Функция запускает игровой цикл
function gameStep(){
	mainLoop();
	nextAnimationFrame(gameStep);
}

//Инициализация игры
function initGame(){

}

//Функция отрисовки графики
function drawGame(){
	//Чистим экран
	ctx.clearRect(0, 0, widthWindow, heightWindow);

	ctx.fillStyle = "#B2EF47";
	ctx.strokeStyle = "#6DE043";
	ctx.roundRect(100, 100, 100, cellHeight, {r1: cellRadius, r2: 0, r3: 0, r4: cellRadius}).fill();
	ctx.roundRect(100, 100, 100, cellHeight, {r1: cellRadius, r2: 0, r3: 0, r4: cellRadius}).stroke();
	ctx.roundRect(205, 100, 40, cellHeight, {r1: 0, r2: cellRadius, r3: cellRadius, r4: 0}).fill();
	ctx.roundRect(205, 100, 40, cellHeight, {r1: 0, r2: cellRadius, r3: cellRadius, r4: 0}).stroke();
	ctx.roundRect(100, 131, 145, cellHeight, {r1: cellRadius, r2: cellRadius, r3: cellRadius, r4: cellRadius}).fill();
	ctx.roundRect(100, 131, 145, cellHeight, {r1: cellRadius, r2: cellRadius, r3: cellRadius, r4: cellRadius}).stroke();

	ctx.fillStyle = "black";
	ctx.fillRect(x, y, 50, 50);
}

//Обновление игровой логики
function updateGame(){
	x += 1;
}

//Главный игровой цикл
function gameLoop(){
	//Производим обновление игровой логики
	updateGame();
	//Отрисовываем все изменения
	drawGame();
}

//После того как страница полностью загрузится запускаем нашу игру
window.onload = function() {
	//Инициализация игры
	initGame();
	//Запуск игры
	gameStart(gameLoop);

	let rgb = { r: 178, g: 239, b:71 };
	let fillColor = rgb2str(rgb);
	console.log(fillColor);
	let hsv = rgb2hsv(rgb);
	console.log(hsv);
	let newHsv = { h: hsv.h, s: hsv.s, v: hsv.v * 0.35 };
	console.log(newHsv);
	let strokeColor = rgb2str(hsv2rgb(newHsv));
	console.log(strokeColor);
};