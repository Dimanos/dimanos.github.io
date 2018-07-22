let canvas = document.getElementById("canvas");

class GameEngine{
	constructor(canvas){
		this.canvas = canvas;
		this.context2D = canvas.getContext("2d");
		this.gameObjects = [];
		this._setupCanvas();
		this._lastPerformance = performance.now();
		this._fpsLabel = new Label("FPS: ", new Vec2(2, 2), new Vec2(160, 40));
		this.gameObjects.push(this._fpsLabel);
	}
	
	_setupCanvas(){
		this.context2D.mouse = {
			x: 0,
			y: 0,
			movX: 0,
			movY: 0,
			click: false,
			down: false,
			up: false,
			move: false,
			button: 0,
			type: "mouse"
		};

		this.context2D.size = new Vec2(this.canvas.width, this.canvas.height);
		
		this.canvas.addEventListener("mousemove",   this._onMouseMove.bind(this),   false);
		this.canvas.addEventListener("mousedown",   this._onMouseDown.bind(this),   false);
		this.canvas.addEventListener("mouseup",     this._onMouseUp.bind(this),     false);
		this.canvas.addEventListener("touchstart",  this._onTouchStart.bind(this),  false);
		this.canvas.addEventListener("touchend",    this._onTouchEnd.bind(this),    false);
		this.canvas.addEventListener("touchmove",   this._onTouchMove.bind(this),   false);
	}

	_onTouchStart(event){
		let touchObj = event.changedTouches[0];
		this.context2D.mouse.x = touchObj.clientX + this.canvas.left;
		this.context2D.mouse.y = touchObj.clientY + this.canvas.top;
		this.context2D.mouse.button = 1;
		this.context2D.mouse.down = true;
		this.context2D.mouse.up = false;
		this.context2D.mouse.type = "touch";
		event.preventDefault();
	}

	_onTouchEnd(event){
		let touchObj = event.changedTouches[0];
		this.context2D.mouse.x = touchObj.clientX + this.canvas.left;
		this.context2D.mouse.y = touchObj.clientY + this.canvas.top;
		this.context2D.mouse.button = 1;
		this.context2D.mouse.down = false;
		this.context2D.mouse.up = true;
		this.context2D.mouse.click = true;
		this.context2D.mouse.type = "touch";
		event.preventDefault();
	}

	_onTouchMove(event){
		let touchObj = event.changedTouches[0];
		this.context2D.mouse.movX = touchObj.clientX + this.canvas.left - this.context2D.mouse.x;
		this.context2D.mouse.movY = touchObj.clientY + this.canvas.top - this.context2D.mouse.y;
		this.context2D.mouse.x = touchObj.clientX + this.canvas.left;
		this.context2D.mouse.y = touchObj.clientY + this.canvas.top;
		this.context2D.mouse.move = true;
		this.context2D.mouse.type = "touch";
		event.preventDefault();
	}
	
	_onMouseMove(event){
		this.context2D.mouse.x = event.offsetX;
		this.context2D.mouse.y = event.offsetY;
		this.context2D.mouse.movX = event.movementX;
		this.context2D.mouse.movY = event.movementY;
		this.context2D.mouse.move = true;
		this.context2D.mouse.type = "mouse";
	}
	
	_onMouseDown(event){
		this.context2D.mouse.button = event.which;
		this.context2D.mouse.down = true;
		this.context2D.mouse.up = false;
		this.context2D.mouse.type = "mouse";
	}
	
	_onMouseUp(event){
		this.context2D.mouse.button = event.which;
		this.context2D.mouse.down = false;
		this.context2D.mouse.up = true;
		this.context2D.mouse.click = true;
		this.context2D.mouse.type = "mouse";
	}
	
	_mouseEventReset(){
		this.context2D.mouse.move = false;
		this.context2D.mouse.click = false;
		this.context2D.mouse.button = 0;
	}

	_fpsCounter(){
		let delta = (performance.now() - this._lastPerformance) / 1000;
		this._lastPerformance = performance.now();
		let fps = 1.0 / delta;
		this._fpsLabel.text = "FPS: " + fps.toFixed(2).toString();
	}
	
	_draw(){
		let engine = this;
		engine.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		engine.gameObjects.forEach(function(object) {
			object.draw(engine.context2D);
		});
	}
	
	_update(){
		let engine = this;
		
		engine.gameObjects.forEach(function(object){
			object.update(engine.context2D);
		});
	}
	
	run(){
		this._fpsCounter();
		this._update();
		this._draw();
		this._mouseEventReset();
		requestAnimationFrame(this.run.bind(this));
	}
}

let engine = new GameEngine(canvas);
let button = new Button("Button", new Vec2(45, 50), new Vec2(160, 40));
let button2 = new Button("FullScreen", new Vec2(210, 50), new Vec2(160, 40));
let label = new Label("Label", new Vec2(45, 100), new Vec2(160, 40));
let slider = new Slider(new Vec2(300, 1), 10, new Vec2(45, 150));
let checkBox = new CheckBox("Music", new Vec2(45, 200), new Vec2(12, 12));
let pBar = new ProgressBar(new Vec2(45, 250), new Vec2(300, 25));
let block = new Block();
block.position = new Vec2(300, 300);
block.size = new Vec2(120, 26);
block.color = new RGB(178, 239, 71);
block.text = "input";

button.eventClick = function(){
    label.text = "Label";
};

button2.eventClick = function(){
	console.log(canvas.isFullScreen); //Вот тут фигня
    if (canvas.isFullScreen){
		launchFullScreen(canvas);
	}else{
		cancelFullScreen(canvas);
	}
};

slider.eventScroll = function(value){
	label.text = value + "%";
};

checkBox.eventChecked = function(value){
	label.text = value === true ? "checked" : "unchecked";
};

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
  
let timerId = setInterval(async function(){ 
	await sleep(Math.random() * 300);
	if (pBar.value < pBar.maxValue){
		pBar.value += 1;
	}else{
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

/*//Контекст рисования
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
};*/