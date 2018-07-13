class UIObject extends Object{
	constructor(size = new Vec2(0, 0), position = new Vec2(0, 0)){
		super(position, size);
		this._hovered = false;
		this._clicked = false;
		this._pressed = false;
		this._font = new Font();
	}
	
	_updateStats(canvas){
        if (this.contains(canvas.mouse)){
            this._hovered = true;
            this._clicked = canvas.mouse.click;
			this._pressed = canvas.mouse.down;
        }else{
            this._hovered = false;
			this._pressed = this._pressed === true ? !canvas.mouse.up : false;
			this._clicked = false;
        }             
    }
	
	get font(){
		return this._font;
	}
	
	set font(value){
		this._font = value;
	}
}

class Button extends UIObject{
	constructor(text = "button", size = new Vec2(0, 0), position = new Vec2(0, 0)){
		super(position, size);
		this._handler = function(){};
		this._text = text;
		this._fillColor = "#00CE8C";
		this._hoverColor = "#00FFA9";
		this._pressedColor = "#00A56E";
	}
	
	set eventClick(listener){
		this._handler = listener;
	}
	
	set fillColor(value){
		this._fillColor = value;
	}
	
	get fillColor(){
		return this._fillColor;
	}
	
	set hoverColor(value){
		this._hoverColor = value;
	}
	
	get hoverColor(){
		return this._hoverColor;
	}
	
	set pressedColor(value){
		this._pressedColor = value;
	}
	
	get pressedColor(){
		return this._pressedColor;
	}
	
	update(canvas){
		this._updateStats(canvas);
 
		if (this._clicked){
			this._handler();
		}
	}
	
	draw(canvas){
		canvas.fillStyle = this._fillColor;
		
		if (this._hovered){
			canvas.fillStyle = this._hoverColor;
		}
		
		if (this._pressed){
			canvas.fillStyle = this._pressedColor;
		}
		
		canvas.fillRect(this._position.x, this._position.y, this._size.x, this._size.y);
		
		this._font.setFont(canvas);
		canvas.fillText(this._text, this._position.x + this._size.x / 2, this._position.y + this._size.y / 2);
	}
}

class Label extends UIObject{
	constructor(text = "label", size = new Vec2(0, 0), position = new Vec2(0, 0)){
		super(position, size);
		this._text = text;
		this._font.horizontalAligment = "left";
		this._font.verticalAligment = "top";
	}
	
	get text(){
		return this._text;
	}
	
	set text(value){
		this._text = value;
	}
	
	update(canvas){
		this._updateStats(canvas);
	}
	
	draw(canvas){
		this._font.setFont(canvas);
		canvas.fillText(this._text, this._position.x, this._position.y);
	}
}

class Slider extends UIObject{
	constructor(trackSize = new Vec2(0, 0), sliderSize = new Vec2(0, 0), position = new Vec2(0, 0), min = 0, max = 100, value = 0){
		let maxW = Math.max(trackSize.x, sliderSize.x);
		let maxH = Math.max(trackSize.y, sliderSize.y);
		let posY = position.y + (maxH - trackSize.y) / 2;
		super(position, new Vec2(maxW + sliderSize.x, maxH));
		this._trackPosition = new Vec2(position.x + sliderSize.x / 2, posY);
		this._sliderPosition = new Vec2(position.x, position.y);
		this._trackSize = trackSize;
		this._sliderSize = sliderSize;
		this._text = "";
		this._min = min;
		this._max = max;
		this._value = value;
		this._handler = function(){};
		this._trackColor = "#9970A2";
		this._trackFillColor = "#000000";
		this._sliderFillColor = "#00CE8C";
		this._sliderHoveredColor = "#00FFA9";
	}
	
	set eventScroll(listener){
		this._handler = listener;
	}
	
	set value(val){
		this._value = val;
	}
	
	get value(){
		return this._value;
	}
	
	get text(){
		return this._text;
	}
	
	set text(value){
		this._text = value;
	}
	
	update(canvas){
		this._updateStats(canvas);
		
		if(this._pressed){
			let pos = canvas.mouse.x;
			
			pos = Math.max(pos, this._trackPosition.x);
			pos = Math.min(pos, this._trackPosition.x + this._trackSize.x);
			
			let range = this._max - this._min;
			let percent = (pos - this._trackPosition.x) / this._trackSize.x;

			this._value = Math.round(this._min + (percent * range));
			this._handler(this._value);
		}
	}
	
	draw(canvas){	
		let range = this._max - this._min;
		let percent = (this._value - this._min) / range;
		this._sliderPosition.x = this._trackPosition.x + (this._trackSize.x * percent) - this._sliderSize.x / 2;
		
		canvas.fillStyle = this._trackColor;
		canvas.fillRect(this._trackPosition.x, this._trackPosition.y, this._trackSize.x, this._trackSize.y);
		
		canvas.fillStyle = this._trackFillColor;
		canvas.fillRect(this._trackPosition.x, this._trackPosition.y, this._sliderPosition.x - this._trackPosition.x, this._trackSize.y);
		
		canvas.fillStyle = (this._hovered === true || this._pressed === true)? this._sliderHoveredColor : this._sliderFillColor;
		canvas.fillRect(this._sliderPosition.x, this._sliderPosition.y, this._sliderSize.x, this._sliderSize.y);
		
		this._font.setFont(canvas);
		canvas.fillText(this._value.toString() + this._text, this._position.x + this._size.x + 30, this._trackPosition.y);
	}
}

class CheckBox extends UIObject{
	constructor(text = "checkBox", size = new Vec2(0, 0), position = new Vec2(0, 0)){
		super(position, size);
		this._text = text;
		this._font.horizontalAligment = "left";
		this._handler = function(){};
		this._hoverColor = "#DDDDDD";
		this._fillColor = "#FFFFFF";
		this._borderColor = "#9970A2";
		this._checkedColor = "#00CE8C";
		this._checked = false;
		this._space = 2;
	}
	
	set eventChecked(listener){
		this._handler = listener;
	}
	
	get checked(){
		return this._checked;
	}
	
	set checked(value){
		this._checked = value;
	}
	
	get text(){
		return this._text;
	}
	
	set text(value){
		this._text = value;
	}
	
	update(canvas){
		this._updateStats(canvas);
		
		if(this._clicked){
			this._checked = !this._checked;
			this._handler(this._checked);
		}
	}
	
	draw(canvas){
		canvas.fillStyle = this._hovered ? this._hoverColor : this._fillColor;	
		canvas.fillRect(this._position.x, this._position.y, this._size.x, this._size.y);
		canvas.strokeStyle = this._borderColor;
		canvas.lineWidth = 1;
		canvas.strokeRect(this._position.x, this._position.y, this._size.x, this._size.y);
		
		if (this._checked){
			canvas.fillStyle = this._checkedColor;
			canvas.fillRect(this._position.x + this._space, this._position.y + this._space, this._size.x - this._space * 2, this._size.y - this._space * 2);
		}
		
		this._font.setFont(canvas);
		canvas.fillText(this._text, this._position.x + this._size.x * 1.5, this._position.y + this._size.y / 2);
	}
}

class ProgressBar extends UIObject{
	constructor(size = new Vec2(0, 0), position = new Vec2(0, 0), min = 0, max = 100){
		super(position, size);
		this._fillColor = "#FFFFFF";
		this._borderColor = "#9970A2";
		this._progressColor = "#00CE8C";
		this._borderWeight = 1;
		this._min = min;
		this._max = max;
		this._value = min;
	}
	
	get value(){
		return this._value;
	}
	
	set value(val){
		this._value = val;
	}
	
	get minValue(){
		return this._min;
	}
	
	get maxValue(){
		return this._max;
	}
	
	update(canvas){
		this._updateStats(canvas);
	}
	
	draw(canvas){
		canvas.fillStyle = this._fillColor;
		canvas.strokeStyle = this._borderColor;
		canvas.lineWidth = this._borderWeight;
		canvas.fillRect(this._position.x, this._position.y, this._size.x, this._size.y);
		canvas.strokeRect(this._position.x, this._position.y, this._size.x, this._size.y);
		canvas.fillStyle = this._progressColor;
		let delta = this._value / (this._max - this._min);
		canvas.fillRect(this._position.x + this._borderWeight, this._position.y + this._borderWeight, this._size.x * delta - this._borderWeight * 2, this._size.y - this._borderWeight * 2);
		this._font.setFont(canvas);
		canvas.fillText(Math.round(delta * 100).toString() + "%", this._position.x + this._size.x / 2, this._position.y + this._size.y / 2);
	}
}