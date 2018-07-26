class Block extends Object {
	constructor(position, size) {
		super(position, size);
		this._font = new Font();
		this._font.load("CCSmash", "fonts/v_CCSmash.ttf");
		this._font.fontFamily = "CCSmash";
		this._font.style = "bold";
		this._font.size = 14;
		this._text = "";
		this._fillColor = new RGB();
		this._strokeColor = new RGB();
		this._radius = this._size.y / 2;
		this._drag = false;
	}

	set size(value) {
		super.size = value;
		this._radius = value.y / 2;
	}

	set text(value) {
		this._text = value;
	}

	get text() {
		return this._text;
	}

	get font() {
		return this._font;
	}

	set font(value) {
		this._font = value;
	}

	set color(value) {
		let hsvStroke = value.toHSV();
		let hsvText = value.toHSV();
		hsvStroke.v *= 0.7;
		hsvText.v *= 0.5;
		this._fillColor = value.toString();
		this._strokeColor = hsvStroke.toRGB().toString();
		this._font.color = hsvText.toRGB().toString();
	}

	update(canvas) {
		if (canvas.mouse.down && this.contains(canvas.mouse)) {
			this._drag = true;
		}

		if (this._drag && canvas.mouse.move) {
			this._position.x += canvas.mouse.movX;
			this._position.y += canvas.mouse.movY;
		}

		if (this._drag && canvas.mouse.up) {
			this._drag = false;
		}
	}

	draw(canvas) {
		let cornerRadius = {
			r1: this._radius,
			r2: this._radius,
			r3: this._radius,
			r4: this._radius
		};

		canvas.fillStyle = this._fillColor;
		canvas.fillRoundRect(this._position.x, this._position.y, this._size.x, this._size.y, cornerRadius);

		canvas.strokeStyle = this._strokeColor;
		canvas.strokeRoundRect(this._position.x, this._position.y, this._size.x, this._size.y, cornerRadius);

		this._font.setFont(canvas);
		canvas.fillText(this._text, this._position.x + this._size.x / 2, this._position.y + this._size.y / 2);
	}
}