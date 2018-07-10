class Block{
    constructor(){
        this._position    = {x: 0.0, y: 0.0};
        this._size        = {x: 0.0, y: 0.0};
        this._text        = "";
        this._radius      = 0.0;
        this._fillColor   = new RGB();
        this._strokeColor = new RGB();
        this._textColor   = new RGB();
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

    set color(value){
        let hsvStroke     = value.toHSV();
        let hsvText       = value.toHSV();
        hsvStroke.v      *= 0.7;
        hsvText.v        *= 0.5;
        this._fillColor   = value.toHexString();
        this._strokeColor = hsvStroke.toRGB().toHexString();
        this._textColor   = hsvText.toRGB().toHexString();
    }

    draw(ctx){
        ctx.fillStyle = this._fillColor;
        ctx.strokeStyle = this._strokeColor;
        ctx.roundRect(this._position.x, this._position.y, this._size.x, this._size.y, {r1: this._radius, r2: this._radius, r3: this._radius, r4: this._radius}).fill();
        ctx.roundRect(this._position.x, this._position.y, this._size.x, this._size.y, {r1: this._radius, r2: this._radius, r3: this._radius, r4: this._radius}).stroke();
        ctx.fillStyle = this._textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 14pt Arial";
        ctx.fillText(this._text, this._position.x + this._size.x / 2.0, this._position.y + this._size.y / 2.0);
    }
}