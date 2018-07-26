//Запуск DOM элемента в полноэкранном режиме
function launchFullScreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullscreen) {
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullScreen) {
		element.webkitRequestFullScreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
}

//Выход из полноэкранного режима
function cancelFullScreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullscreen) {
		document.mozCancelFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	}
}

//Определяем функцию requestAnimationFrame для данного браузера, иначе возвращаем простой таймер
let nextAnimationFrame = (function () {
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function (callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();
