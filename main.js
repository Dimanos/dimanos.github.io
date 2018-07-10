//Элемент канва
let canvas = document.getElementById("canvas");
//Контекст рисования
let ctx = canvas.getContext('2d');
//Высота и ширина канвы
let heightWindow = canvas.height;
let widthWindow = canvas.width;
//Ссылка на gameLoop
let mainLoop;

let block = new Block();

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
	block.position = {x: 100, y: 100};
	block.size = {x: 120, y: 26};
	block.color = new RGB(178, 239, 71);
	block.text = "input";
}

//Функция отрисовки графики
function drawGame(){
	//Чистим экран
	//ctx.clearRect(0, 0, widthWindow, heightWindow);
	ctx.fillStyle = "#ccc";
	ctx.fillRect(0, 0, widthWindow, heightWindow);
	block.draw(ctx);
}

//Обновление игровой логики
function updateGame(){

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
};