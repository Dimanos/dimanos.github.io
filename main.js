let canvas = document.getElementById("canvas");

class GameEngine{
	constructor(canvas){
		this.canvas = canvas;
		this.context2D = canvas.getContext("2d");
		this.gameObjects = [];
		this._setupCanvas();
		this._lastPerformance = performance.now();
		this._fpsLabel = new Label("FPS: ", new Vec2(160, 40), new Vec2(5, 5));
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
			button: 0
		};
		
		this.canvas.addEventListener("mousemove",   this._onMouseMove.bind(this),   false);
		this.canvas.addEventListener("mousedown",   this._onMouseDown.bind(this),   false);
		this.canvas.addEventListener("mouseup",     this._onMouseUp.bind(this),     false);
		this.canvas.addEventListener("touchstart",  this._onTouchStart.bind(this),  false);
		this.canvas.addEventListener("touchend",    this._onTouchEnd.bind(this),    false);
		this.canvas.addEventListener("touchmove",   this._onTouchMove.bind(this),   false);
	}

	_onTouchStart(event){
		event.preventDefault();
		this.context2D.mouse.button = 1;
		this.context2D.mouse.down = true;
		this.context2D.mouse.up = false;
	}

	_onTouchEnd(event){
		event.preventDefault();
		this.context2D.mouse.button = 1;
		this.context2D.mouse.down = false;
		this.context2D.mouse.up = true;
		this.context2D.mouse.click = true;
	}

	_onTouchMove(event){
		event.preventDefault();
		this.context2D.mouse.x = event.offsetX;
		this.context2D.mouse.y = event.offsetY;
		this.context2D.mouse.movX = event.movementX;
		this.context2D.mouse.movY = event.movementY;
		this.context2D.mouse.move = true;
	}
	
	_onMouseMove(event){
		this.context2D.mouse.x = event.offsetX;
		this.context2D.mouse.y = event.offsetY;
		this.context2D.mouse.movX = event.movementX;
		this.context2D.mouse.movY = event.movementY;
		this.context2D.mouse.move = true;
	}
	
	_onMouseDown(event){
		this.context2D.mouse.button = event.which;
		this.context2D.mouse.down = true;
		this.context2D.mouse.up = false;
	}
	
	_onMouseUp(event){
		this.context2D.mouse.button = event.which;
		this.context2D.mouse.down = false;
		this.context2D.mouse.up = true;
		this.context2D.mouse.click = true;
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
let button = new Button("Button", new Vec2(160, 40), new Vec2(45, 50));
let label = new Label("Label", new Vec2(160, 40), new Vec2(45, 100));
let slider = new Slider(new Vec2(300, 1), new Vec2(10, 22), new Vec2(45, 150));
slider.text = "%";
let checkBox = new CheckBox("Music", new Vec2(12, 12), new Vec2(45, 200));
let pBar = new ProgressBar(new Vec2(300, 25), new Vec2(45, 250));

button.eventClick = function(){
    label.text = "Label";
};

slider.eventScroll = function(value){
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
engine.gameObjects.push(label);
engine.gameObjects.push(slider);
engine.gameObjects.push(checkBox);
engine.gameObjects.push(pBar);
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