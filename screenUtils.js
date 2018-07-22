//Запуск DOM элемента в полноэкранном режиме
function launchFullScreen(element){
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
	element.isFullScreen = true;
}

//Выход из полноэкранного режима
function cancelFullScreen(element){
	if (document.cancelFullscreen) {
		document.cancelFullscreen();
	} else if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitCancelFullscreen) {
		document.webkitCancelFullscreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	}
	element.isFullScreen = false;
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