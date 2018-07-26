let canvas     = document.getElementById("canvas");
let engine     = new GameEngine(canvas);
let button     = new Button("Button", new Vec2(45, 50), new Vec2(160, 40));
let button2    = new Button("FullScreen", new Vec2(210, 50), new Vec2(160, 40));
let label      = new Label("Label", new Vec2(45, 100), new Vec2(160, 40));
let slider     = new Slider(new Vec2(45, 150), new Vec2(300, 10));
let checkBox   = new CheckBox("Music", new Vec2(45, 200), new Vec2(12, 12));
let pBar       = new ProgressBar(new Vec2(45, 250), new Vec2(300, 25));
let block      = new Block(new Vec2(300, 300), new Vec2(120, 26));
block.color    = new RGB(178, 239, 71);
block.text     = "input";

button.eventClick = function () {
	label.text = "Label";
};

button2.eventClick = function () {
	if (engine.isFullScreen) {
		engine.stopFullScreen();
	} else {
		engine.startFullScreen();
	}
};

slider.eventScroll = function (value) {
	label.text = value + "%";
};

checkBox.eventChecked = function (value) {
	label.text = value === true ? "checked" : "unchecked";
};

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

let timerId = setInterval(async function () {
		await sleep(Math.random() * 300);
		if (pBar.value < pBar.maxValue) {
			pBar.value += 1;
		} else {
			clearInterval(timerId);
		}
	}, 100);

engine.gameObjects.push(button);
engine.gameObjects.push(button2);
engine.gameObjects.push(label);
engine.gameObjects.push(slider);
engine.gameObjects.push(checkBox);
engine.gameObjects.push(pBar);
engine.gameObjects.push(block);
engine.run();

/*
 / Контекст рисования
let ctx = canvas.getContext('2d');
//Высота и ширина канвы
let heightWindow = canvas.height;
let widthWindow = canvas.width;
//Ссылка на gameLoop
let mainLoop;

let block = new Block();

//Функция запускающая игру
function gameStart(callback) {
	setMainLoop(callback);
	gameStep();
}

//Устанавливаем необходимый игровой цикл как текущий
function setMainLoop(loop) {
	mainLoop = loop;
}

//Функция запускает игровой цикл
function gameStep() {
	mainLoop();
	nextAnimationFrame(gameStep);
}

//Инициализация игры
function initGame() {
	block.position = {
		x: 100,
		y: 100
	};
	block.size = {
		x: 120,
		y: 26
	};
	block.color = new RGB(178, 239, 71);
	block.text = "input";
}

//Функция отрисовки графики
function drawGame() {
	//Чистим экран
	//ctx.clearRect(0, 0, widthWindow, heightWindow);
	ctx.fillStyle = "#ccc";
	ctx.fillRect(0, 0, widthWindow, heightWindow);
	block.draw(ctx);
}

//Обновление игровой логики
function updateGame() {}

//Главный игровой цикл
function gameLoop() {
	//Производим обновление игровой логики
	updateGame();
	//Отрисовываем все изменения
	drawGame();
}

//После того как страница полностью загрузится запускаем нашу игру
window.onload = function () {
	//Инициализация игры
	initGame();
	//Запуск игры
	gameStart(gameLoop);
};
*/