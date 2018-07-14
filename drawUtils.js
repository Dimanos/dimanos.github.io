//Рисование прямоугольника с закругленными углами
CanvasRenderingContext2D.prototype.roundRect = function(x = 0, y = 0, width = 0, height = 0, cornerRadius = {r1: 0, r2: 0, r3: 0, r4: 0}){
    this.beginPath();
    this.moveTo(x, y + cornerRadius.r1);
    this.quadraticCurveTo(x, y, x + cornerRadius.r1, y);
    this.lineTo(x + width - cornerRadius.r2, y);
    this.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.r2);
    this.lineTo(x + width, y + height - cornerRadius.r3);
    this.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.r3, y + height);
    this.lineTo(x + cornerRadius.r4, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.r4);
    this.lineTo(x, y + cornerRadius.r1);
	return this;
};

//Рисование  круга
CanvasRenderingContext2D.prototype.circle = function(x = 0, y = 0, radius = 0){
    this.beginPath();
    this.arc(x, y, radius, 0, 2 * Math.PI);
    return this;
};

//Рисование заполненного прямоугольника с закругленными углами
CanvasRenderingContext2D.prototype.fillRoundRect = function(x, y, width, height, cornerRadius){
	this.roundRect(x, y, width, height, cornerRadius).fill();
};

//Рисование контурного прямоугольника с закругленными углами
CanvasRenderingContext2D.prototype.strokeRoundRect = function(x, y, width, height, cornerRadius){
    this.roundRect(x, y, width, height, cornerRadius).stroke();
};

//Рисование заполненного круга
CanvasRenderingContext2D.prototype.fillCircle = function(x, y, radius){
    this.circle(x, y, radius).fill();
};

//Рисование контурного круга
CanvasRenderingContext2D.prototype.strokeCircle = function(x, y, radius){
    this.circle(x, y, radius).stroke();
};