class GameEngine {
	constructor(canvas) {
		this._canvas = canvas;
		this._canvasRect = canvas.getBoundingClientRect()
		this.context2D = canvas.getContext("2d");
		this.gameObjects = [];
		this._setupCanvas();
		this._isFullScreen = false;
		this._lastPerformance = performance.now();
		this._fpsLabel = new Label("FPS: ", new Vec2(2, 2), new Vec2(160, 40));
		this.gameObjects.push(this._fpsLabel);
	}

	_setupCanvas() {
		this.context2D.mouse = {
			x: 0,
			y: 0,
			movX: 0,
			movY: 0,
			click: false,
			down: false,
			pressed: false,
			up: false,
			move: false,
			button: 0,
			type: "mouse"
		};

		this.context2D.size = new Vec2(this._canvasRect.width, this._canvasRect.height);

		this._canvas.addEventListener("mousemove", this._onMouseMove.bind(this), false);
		this._canvas.addEventListener("mousedown", this._onMouseDown.bind(this), false);
		this._canvas.addEventListener("mouseup", this._onMouseUp.bind(this), false);
		this._canvas.addEventListener("touchstart", this._onTouchStart.bind(this), false);
		this._canvas.addEventListener("touchend", this._onTouchEnd.bind(this), false);
		this._canvas.addEventListener("touchmove", this._onTouchMove.bind(this), false);
	}

	_getMousePos(event) {
		return {
			x: event.clientX - this._canvasRect.left,
			y: event.clientY - this._canvasRect.top
		};
	}

	_onTouchStart(event) {
		let touchObj = event.touches[0];
		this.context2D.mouse.x = this._getMousePos(touchObj).x;
		this.context2D.mouse.y = this._getMousePos(touchObj).y;
		this.context2D.mouse.button = 1;
		this.context2D.mouse.down = true;
		this.context2D.mouse.up = false;
		this.context2D.mouse.type = "touch";
		event.preventDefault();
	}

	_onTouchEnd(event) {
		let touchObj = event.touches[0];
		this.context2D.mouse.x = this._getMousePos(touchObj).x;
		this.context2D.mouse.y = this._getMousePos(touchObj).y;
		this.context2D.mouse.button = 1;
		this.context2D.mouse.down = false;
		this.context2D.mouse.up = true;
		this.context2D.mouse.click = true;
		this.context2D.mouse.type = "touch";
		event.preventDefault();
	}

	_onTouchMove(event) {
		let touchObj = event.touches[0];
		let tempX = this._getMousePos(touchObj).x;
		let tempY = this._getMousePos(touchObj).y;
		this.context2D.mouse.movX = tempX - this.context2D.mouse.x;
		this.context2D.mouse.movY = tempY - this.context2D.mouse.y;
		this.context2D.mouse.x = tempX;
		this.context2D.mouse.y = tempY;
		this.context2D.mouse.move = true;
		this.context2D.mouse.type = "touch";
		event.preventDefault();
	}

	_onMouseMove(event) {
		let tempX = this._getMousePos(event).x;
		let tempY = this._getMousePos(event).y;
		this.context2D.mouse.movX = tempX - this.context2D.mouse.x;
		this.context2D.mouse.movY = tempY - this.context2D.mouse.y;
		this.context2D.mouse.x = tempX;
		this.context2D.mouse.y = tempY;
		this.context2D.mouse.move = true;
		this.context2D.mouse.type = "mouse";
	}

	_onMouseDown(event) {
		this.context2D.mouse.button = event.which;
		this.context2D.mouse.down = true;
		this.context2D.mouse.pressed = true;
		this.context2D.mouse.up = false;
		this.context2D.mouse.type = "mouse";
	}

	_onMouseUp(event) {
		this.context2D.mouse.button = event.which;
		this.context2D.mouse.pressed = false;
		this.context2D.mouse.up = true;
		this.context2D.mouse.click = true;
		this.context2D.mouse.type = "mouse";
	}

	_mouseEventReset() {
		this.context2D.mouse.down = false;
		this.context2D.mouse.move = false;
		this.context2D.mouse.click = false;
		this.context2D.mouse.button = 0;
	}

	_fpsCounter() {
		let delta = (performance.now() - this._lastPerformance) / 1000;
		this._lastPerformance = performance.now();
		let fps = 1.0 / delta;
		this._fpsLabel.text = "FPS: " + fps.toFixed(2).toString();
	}

	startFullScreen() {
		this._isFullScreen = true;
		launchFullScreen(this._canvas);
	}

	stopFullScreen() {
		this._isFullScreen = false;
		cancelFullScreen();
	}

	get isFullScreen() {
		return this._isFullScreen;
	}

	_draw() {
		let engine = this;
		engine.context2D.clearRect(0, 0, this._canvas.width, this._canvas.height);

		engine.gameObjects.forEach(function (object) {
			object.draw(engine.context2D);
		});
	}

	_update() {
		let engine = this;

		engine.gameObjects.forEach(function (object) {
			object.update(engine.context2D);
		});
	}

	run() {
		this._fpsCounter();
		this._update();
		this._draw();
		this._mouseEventReset();
		requestAnimationFrame(this.run.bind(this));
	}
}