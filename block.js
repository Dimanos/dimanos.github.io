class Block{
    constructor(){
        this._position    = new Vec2();
        this._size        = new Vec2();
        this._font        = new Font();
        this._fillColor   = new RGB();
        this._strokeColor = new RGB();
        this._font.style  = "bold";
        this._font.size   = 14;
        this._text        = "";
        this._radius      = 0.0;
    }

    set position(value){
        this._position = value;
    }

    get position(){
        return this._position;
    }

    set size(value){
        this._size = value;
        this._radius = this._size.y / 2.0;
    }

    get size(){
        return this._size;
    }

    set text(value){
        this._text = value;
    }

    get text(){
        return this._text;
    }

    get font(){
		return this._font;
	}
	
	set font(value){
		this._font = value;
	}

    set color(value){
        let hsvStroke     = value.toHSV();
        let hsvText       = value.toHSV();
        hsvStroke.v      *= 0.7;
        hsvText.v        *= 0.5;
        this._fillColor   = value.toString();
        this._strokeColor = hsvStroke.toRGB().toString();
        this._font.color  = hsvText.toRGB().toString();
    }

    update(canvas){

    }

    draw(canvas){
        let cornerRadius = {r1: this._radius, r2: this._radius, r3: this._radius, r4: this._radius};

        canvas.fillStyle = this._fillColor;
        canvas.fillRoundRect(this._position.x, this._position.y, this._size.x, this._size.y, cornerRadius);
        
        canvas.strokeStyle = this._strokeColor;
        canvas.strokeRoundRect(this._position.x, this._position.y, this._size.x, this._size.y, cornerRadius);
        
        this._font.setFont(canvas);
        canvas.fillText(this._text, this._position.x + this._size.x / 2.0, this._position.y + this._size.y / 2.0);
    }
}