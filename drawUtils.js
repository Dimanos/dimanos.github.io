//Рисование прямоугольника с закругленными углами
CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius = {r1: 0, r2: 0, r3: 0, r4: 0}){
    this.beginPath();
    this.moveTo(x, y + radius.r1);
    this.quadraticCurveTo(x, y, x + radius.r1, y);
    this.lineTo(x + width - radius.r2, y);
    this.quadraticCurveTo(x + width, y, x + width, y + radius.r2);
    this.lineTo(x + width, y + height - radius.r3);
    this.quadraticCurveTo(x + width, y + height, x + width - radius.r3, y + height);
    this.lineTo(x + radius.r4, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - radius.r4);
    this.lineTo(x, y + radius.r1);
	return this;
};