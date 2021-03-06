class UIObject extends Object {
	constructor(position = new Vec2(), size = new Vec2()) {
		super(position, size);
		this._hovered = false;
		this._clicked = false;
		this._pressed = false;
		this._font = new Font();
	}

	_updateStats(canvas) {
		if (this.contains(canvas.mouse)) {
			if (canvas.mouse.type === "mouse") {
				this._hovered = true;
			}

			if (!this._pressed) {
				this._pressed = canvas.mouse.down;
			}

			this._clicked = canvas.mouse.click && this._pressed;

			if (this._clicked === true) {
				this._pressed = false;
			}

		} else {
			this._hovered = false;
			this._pressed = this._pressed === true ? canvas.mouse.pressed : false;
			this._clicked = false;
		}
	}

	get font() {
		return this._font;
	}

	set font(value) {
		this._font = value;
	}
}

class Button extends UIObject {
	constructor(text = "button", position = new Vec2(), size = new Vec2()) {
		super(position, size);
		this._handler = function() {};
		this._text = text;
		this._fillColor = "#00CE8C";
		this._hoverColor = "#00FFA9";
		this._pressedColor = "#00A56E";
	}

	set eventClick(listener) {
		this._handler = listener;
	}

	set fillColor(value) {
		this._fillColor = value;
	}

	get fillColor() {
		return this._fillColor;
	}

	set hoverColor(value) {
		this._hoverColor = value;
	}

	get hoverColor() {
		return this._hoverColor;
	}

	set pressedColor(value) {
		this._pressedColor = value;
	}

	get pressedColor() {
		return this._pressedColor;
	}

	update(canvas) {
		this._updateStats(canvas);

		if (this._clicked) {
			this._handler();
		}
	}

	draw(canvas) {
		canvas.fillStyle = this._fillColor;

		if (this._hovered) {
			canvas.fillStyle = this._hoverColor;
		}

		if (this._pressed) {
			canvas.fillStyle = this._pressedColor;
		}

		canvas.fillRect(this._position.x, this._position.y, this._size.x, this._size.y);

		this._font.setFont(canvas);
		canvas.fillText(this._text, this._position.x + this._size.x / 2, this._position.y + this._size.y / 2);
	}
}

class Label extends UIObject {
	constructor(text = "label", position = new Vec2(), size = new Vec2()) {
		super(position, size);
		this._text = text;
		this._font.horizontalAligment = "left";
		this._font.verticalAligment = "top";
	}

	get text() {
		return this._text;
	}

	set text(value) {
		this._text = value;
	}

	update(canvas) {
		this._updateStats(canvas);
	}

	draw(canvas) {
		this._font.setFont(canvas);
		canvas.fillText(this._text, this._position.x, this._position.y);
	}
}

class Slider extends UIObject {
	constructor(position = new Vec2(), size = new Vec2(), min = 0, max = 100, value = 0) {
		super(position, size);
		this._trackSize = new Vec2(size.x - size.y, 1);
		this._trackPos = new Vec2(position.x + size.y / 2, position.y + size.y / 2 - this._trackSize.y);
		this._sliderSize = size.y;
		this._sliderPos = new Vec2(position.x + size.y / 2, this._trackPos.y);
		this._min = min;
		this._max = max;
		this._value = value;
		this._handler = function() {};
		this._trackColor = "#9970A2";
		this._trackFillColor = "#000000";
		this._sliderFillColor = "#00CE8C";
		this._sliderHoveredColor = "#00FFA9";
	}

	set eventScroll(listener) {
		this._handler = listener;
	}

	set value(val) {
		this._value = val;
	}

	get value() {
		return this._value;
	}

	update(canvas) {
		this._updateStats(canvas);

		if (this._pressed) {
			let pos = canvas.mouse.x;

			pos = Math.max(pos, this._trackPos.x);
			pos = Math.min(pos, this._trackPos.x + this._trackSize.x);

			let range = this._max - this._min;
			let percent = (pos - this._trackPos.x) / this._trackSize.x;

			this._value = Math.round(this._min + (percent * range));
			this._handler(this._value);
		}
	}

	draw(canvas) {
		let range = this._max - this._min;
		let percent = this._value / range;
		this._sliderPos.x = this._position.x + (this._trackSize.x * percent) + this._sliderSize / 2;

		canvas.fillStyle = this._trackColor;
		canvas.fillRect(this._trackPos.x, this._trackPos.y, this._trackSize.x, this._trackSize.y);

		canvas.fillStyle = this._trackFillColor;
		canvas.fillRect(this._trackPos.x, this._trackPos.y, this._sliderPos.x - this._trackPos.x, this._trackSize.y);

		canvas.fillStyle = (this._hovered === true || this._pressed === true) ? this._sliderHoveredColor : this._sliderFillColor;
		canvas.fillCircle(this._sliderPos.x, this._sliderPos.y, this._sliderSize);
	}
}

class CheckBox extends UIObject {
	constructor(text = "checkBox", position = new Vec2(), size = new Vec2()) {
		super(position, size);
		this._text = text;
		this._font.horizontalAligment = "left";
		this._handler = function() {};
		this._hoverColor = "#DDDDDD";
		this._fillColor = "#FFFFFF";
		this._borderColor = "#9970A2";
		this._checkedColor = "#00CE8C";
		this._checked = false;
		this._space = 2;
	}

	set eventChecked(listener) {
		this._handler = listener;
	}

	get checked() {
		return this._checked;
	}

	set checked(value) {
		this._checked = value;
	}

	get text() {
		return this._text;
	}

	set text(value) {
		this._text = value;
	}

	update(canvas) {
		this._updateStats(canvas);

		if (this._clicked) {
			this._checked = !this._checked;
			this._handler(this._checked);
		}
	}

	draw(canvas) {
		canvas.fillStyle = this._hovered ? this._hoverColor : this._fillColor;
		canvas.fillRect(this._position.x, this._position.y, this._size.x, this._size.y);
		canvas.strokeStyle = this._borderColor;
		canvas.lineWidth = 1;
		canvas.strokeRect(this._position.x, this._position.y, this._size.x, this._size.y);

		if (this._checked) {
			canvas.fillStyle = this._checkedColor;
			canvas.fillRect(this._position.x + this._space, this._position.y + this._space, this._size.x - this._space * 2, this._size.y - this._space * 2);
		}

		this._font.setFont(canvas);
		canvas.fillText(this._text, this._position.x + this._size.x * 1.5, this._position.y + this._size.y / 2);
	}
}

class ProgressBar extends UIObject {
	constructor(position = new Vec2(), size = new Vec2(), min = 0, max = 100) {
		super(position, size);
		this._fillColor = "#FFFFFF";
		this._borderColor = "#9970A2";
		this._progressColor = "#00CE8C";
		this._borderWeight = 1;
		this._min = min;
		this._max = max;
		this._value = min;
	}

	get value() {
		return this._value;
	}

	set value(val) {
		this._value = val;
	}

	get minValue() {
		return this._min;
	}

	get maxValue() {
		return this._max;
	}

	update(canvas) {
		this._updateStats(canvas);
	}

	draw(canvas) {
		canvas.fillStyle = this._fillColor;
		canvas.strokeStyle = this._borderColor;
		canvas.lineWidth = this._borderWeight;
		canvas.fillRect(this._position.x, this._position.y, this._size.x, this._size.y);
		canvas.strokeRect(this._position.x, this._position.y, this._size.x, this._size.y);

		let delta = this._value / (this._max - this._min);
		let newPos = new Vec2(this._position.x + this._borderWeight, this._position.y + this._borderWeight);
		let newSize = new Vec2(this._size.x * delta - this._borderWeight * 2, this._size.y - this._borderWeight * 2);
		canvas.fillStyle = this._progressColor;
		canvas.fillRect(newPos.x, newPos.y, newSize.x, newSize.y);

		this._font.setFont(canvas);
		let text = Math.round(delta * 100) + "%"
		let textPos = new Vec2(this._position.x + this._size.x / 2, this._position.y + this._size.y / 2);
		canvas.fillText(text, textPos.x, textPos.y);
	}
}