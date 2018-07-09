//Запуск DOM элемента в полноэкранном режиме
function launchFullScreen(element){
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	}
}

//Выход из полноэкранного режима
function cancelFullScreen(){
	if (document.cancelFullscreen) {
		document.cancelFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitCancelFullscreen) {
		document.webkitCancelFullscreen();
	}
}

//Проверка на полноэкранный режим
function isFullScreen(){
	return document.fullscreenEnabled || 
	document.webkitFullscreenEnabled  || 
	document.mozFullScreenEnabled     ||
	document.msFullscreenEnabled;
}

//Определяем функцию requestAnimationFrame для данного браузера, иначе возвращаем простой таймер
let nextAnimationFrame = (function(){
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(callback){
				window.setTimeout(callback, 1000 / 60);
			};
  })();