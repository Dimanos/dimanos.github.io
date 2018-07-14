class Object{
	constructor(size = new Vec2(), position = new Vec2()){
		this._size = size;
		this._position = position;
	}
	
    contains(point){
		return Object.contains(this, point);
	}
	
	intersect(obj){
		return Object.intersect(this, obj);
	}
	
	static contains(obj, point){
		return point.x >= obj._position.x && point.x <= obj._position.x + obj._size.x && 
			   point.y >= obj._position.y && point.y <= obj._position.y + obj._size.y;
	}
	
	static intersect(obj1, obj2){
		return obj1._position.x + obj1._size.x < obj2._position.x || 
		       obj2._position.x + obj2._size.x < obj1._position.x || 
			   obj1._position.y + obj1._size.y < obj2._position.y || 
			   obj2._position.y + obj2._size.y < obj1._position.y;
	}
}