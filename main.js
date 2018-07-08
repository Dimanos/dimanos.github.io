//Элемент канва
let canvas = document.getElementById("canvas");
//Контекст рисования
let ctx = canvas.getContext('2d');
//Высота и ширина канвы
let heightWindow = canvas.height;
let widthWindow = canvas.width;
//Ссылка на gameLoop
let mainLoop;

let programExecute = true;
let input = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let test =  [1, 0, 3, 2, 5, 4, 7, 6, 9, 8];
let output = [];
let memory = [null, null, null, null, null, 0];
let takeValue = null;

//let code = ["label2", "input", "copyto 2", "copyfrom 3", "label1", "inc 1", "dec 2", "if zero label1", "if negative label2", "jump label3", "add", "sub", "output", "label3"]
//let program = ["label1", "input", "copyto 1", "input", "output", "copyfrom 1", "output", "jump label1"];

//Интерпретация пользовательского алгоритма
function Parser(code){
	//Количество инструкций в программе
	let programLength = code.length;
	//Ассоциативный массив с позициями всех меток в коде, к которым может осуществляться переход 
	let labelMap = new Map();
	//Позиция с которой будет выполняться программа
	let programStart = 0;

	//Перебираем все инструкции в программе и ищем метки. Это нужно чтобы было удобно переходить по меткам в дальнейшем
	for(let i = 0; i < programLength; ++i){
		
		//Если данная инструкция начинается со строки label...
		if(code[i].indexOf("label") == 0){
			//То добавляем пару {метка: позиция} в массив
			labelMap.set(code[i], i);
		}
	}
	
	do{
		//Интерпретация программы. Перебор инструкций
		for(let i = programStart; i < programLength; ++i){
			
			if (code[i] == "input"){
				takeValue = input.pop();
					
				if(takeValue === undefined){
					programExecute = false;
				}
				else{
					console.log("Взял " + takeValue.toString());
				}
			}
			else if (code[i] == "output"){
				
				if (takeValue !== null && takeValue !== undefined){
					console.log("Вывел " + takeValue.toString());
					output.push(takeValue)
				}
				else{
					programExecute = false;
					console.log("Нечего отдавать.");
				}
				
				let testNumber = (test.length - 1) - (output.length - 1);
				
				if (test[testNumber] != output[output.length - 1]){
					programExecute = false;
					console.log("Неправильно!");
				}
			}
			else if (code[i].indexOf("inc") == 0){
				let cellNumber = parseInt(code[i].split(" ")[1]);
				
				if (memory[cellNumber] !== null){
					++memory[cellNumber];
					console.log("Увеличил значение в ячейке " + cellNumber.toString() + " на 1, стало " + memory[cellNumber].toString());
				}
				else{
					programExecute = false;
					console.log("Ячейка пуста. Увеличивать нечего.");
				}
			}
			else if (code[i].indexOf("dec") == 0){
				let cellNumber = parseInt(code[i].split(" ")[1]);
				
				if (memory[cellNumber] !== null){
					--memory[cellNumber];
					console.log("Уменьшил значение в ячейке " + cellNumber.toString() + " на 1, стало " + memory[cellNumber].toString());
				}
				else{
					programExecute = false;
					console.log("Ячейка пуста. Уменьшать нечего.");
				}
			}
			else if (code[i].indexOf("copyto") == 0){
				let cellNumber = parseInt(code[i].split(" ")[1]);
				
				if (takeValue !== null && takeValue !== undefined){
					memory[cellNumber] = takeValue;
					console.log("Положил в ячейку " + cellNumber.toString() + " значение " + memory[cellNumber].toString());
				}
				else{
					programExecute = false;
					console.log("Мне нечего положить сюда.");
				}
			}
			else if (code[i].indexOf("copyfrom") == 0){
				let cellNumber = parseInt(code[i].split(" ")[1]);
				
				if (memory[cellNumber] !== null){
					takeValue = memory[cellNumber];
					console.log("Взял из ячейки " + cellNumber.toString() + " значение " + memory[cellNumber].toString());
				}
				else{
					programExecute = false;
					console.log("Тут пусто.");
				}
				console.log("У меня " + takeValue.toString());
			}
			else if (code[i].indexOf("add") == 0){
				let cellNumber = parseInt(code[i].split(" ")[1]);
				
				if (memory[cellNumber] !== null){
					console.log("Сложил");
					takeValue += memory[cellNumber];
				}
				else{
					programExecute = false;
					console.log("Тут пусто.");
				}
				console.log("У меня " + takeValue.toString());
			}
			else if (code[i].indexOf("sub") == 0){
				let cellNumber = parseInt(code[i].split(" ")[1]);
								
				if (memory[cellNumber] !== null){
					takeValue -= memory[cellNumber];
					console.log("Вычел");
				}
				else{
					programExecute = false;
					console.log("Тут пусто.");
				}
				console.log("У меня " + takeValue.toString());
			}
			else if (code[i].indexOf("if zero") == 0){
				if (takeValue == 0){
					let label = code[i].split(" ")[2];
					programStart = labelMap.get(label) + 1;
					break;
				}
			}
			else if (code[i].indexOf("if negative") == 0){
				if (takeValue < 0){
					let label = code[i].split(" ")[2];
					programStart = labelMap.get(label) + 1;
					break;
				}
			}
			else if (code[i].indexOf("jump") == 0){
				let label = code[i].split(" ")[1];
				programStart = labelMap.get(label) + 1;
				break;
			}
			
			if(!programExecute && input.length == 0){
				console.log("Всё верно!");
				programStart = 0;
				break;
			}
		}
	} while(programStart != 0 && programExecute)
}

//Parser(program);
//console.log(output);

let x = 10;
let y = 10;

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

//Функция запускающая игру
function gameStart(callback){
	setMainLoop(callback);
	gameStep();
}

//Устанавливаем необходимый игровой цикл как текущий
function setMainLoop(loop){
	mainLoop = loop;
}

//Функция запускает игровой цикл
function gameStep(){
	mainLoop();
	nextAnimationFrame(gameStep);
}

//Инициализация игры
function initGame(){

}

//Функция отрисовки графики
function drawGame(){
	//Чистим экран
	ctx.clearRect(0, 0, widthWindow, heightWindow);

	ctx.fillStyle = "black";
	ctx.fillRect(x, y, 50, 50);
}

//Обновление игровой логики
function updateGame(){
	x += 1;
}

//Главный игровой цикл
function gameLoop(){
	//Производим обновление игровой логики
	updateGame();
	//Отрисовываем все изменения
	drawGame();
}

//После того как страница полностью загрузится запускаем нашу игру
window.onload = function() {
	//Инициализация игры
	initGame();
	//Запуск игры
	gameStart(gameLoop);
};