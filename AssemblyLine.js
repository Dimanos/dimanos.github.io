//Ориентация ленты
let OrientationEnum = {
	HORIZONTAL: 0,
	VERTICAL: 1
}
	
//Направления движения ленты
let DirectionEnum = {
	FromLeftToRight: 0,
	FromRightToLeft: 1,
	FromTopToDown: 2,
	FromDownToTop: 3
}

//Класс конвейерной ленты
class AssemblyLine{

	constructor(
		{totalLength = 100, to segmentLength = 10, speed = 5, position = {x: 100, y: 100}, orientation = OrientationEnum.VERTICAL, travelDirect = DirectionEnum.FromDownToTop} = 
		{totalLength: 100, segmentLength: 10, speed: 5, position:{x: 100, y: 100}, orientation: OrientationEnum.VERTICAL, travelDirect: DirectionEnum.FromDownToTop}){
			
			this.Settings = {
				totalLength: totalLength, 
				segmentLength: segmentLength, 
				speed: speed, 
				orientation: orientation, 
				travelDirect: travelDirect
			}
			
			this.DrawOptions = {
				position: position,
				segmentWidth: (orientation == 0 || orientation == 1) ? 
			}
		}
		
	draw(){
		
	}
}