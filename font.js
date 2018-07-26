class Font {
	constructor() {
		this._size = 12;
		this._unit = "pt";
		this._fontFamily = "Arial";
		this._verticalAligment = "middle";
		this._horizontalAligment = "center";
		this._color = new RGB();
		this._style = "normal";
	}

	set size(value) {
		this._size = value;
	}

	get size() {
		return this._size;
	}

	set unit(value) {
		this._unit = value;
	}

	get unit() {
		return this._unit;
	}

	set fontFamily(value) {
		this._fontFamily = value;
	}

	get fontFamily() {
		return this._fontFamily;
	}

	set verticalAligment(value) {
		this._verticalAligment = value;
	}

	get verticalAligment() {
		return this._verticalAligment;
	}

	set horizontalAligment(value) {
		this._horizontalAligment = value;
	}

	get horizontalAligment() {
		return this._horizontalAligment;
	}

	set color(value) {
		this._color = value;
	}

	get color() {
		return this._color;
	}

	set style(value) {
		this._style = value;
	}

	get style() {
		return this._style;
	}

	load(fontName, fileName) {
		let font = new FontFace(fontName, "url(" + fileName + ")");
		font.load().then(function (loadedFace) {
  			document.fonts.add(loadedFace);
		});
	}

	heightСharacter(canvas) {
		return parseFloat(canvas.font.match(/\d+/), 10) - 6;
	}

	setFont(canvas) {
		canvas.fillStyle = this._color.toString();
		canvas.textBaseline = this._verticalAligment;
		canvas.textAlign = this._horizontalAligment;
		canvas.font = this.toCanvasFont();
	}

	toCanvasFont() {
		return this._style + " " + this._size + this._unit + " " + this._fontFamily;
	}
}