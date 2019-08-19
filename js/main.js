/* Game Logic */

/* Play button event listener */
document.querySelector('.play').addEventListener('click',function(){
	this.style.display = 'none';
	document.getElementById('app').style.display = 'grid';
	document.querySelector('.main-header').style.display = 'none';
	let startGame = setInterval(function(){
		document.getElementById('app').style.opacity++;
		if(document.getElementById('app').style.opacity == 1)
			clearTimeout(startGame)
	},10)
})


let snakeElement = document.getElementById('snake')

let snake = Snake(snakeElement);

/* Button event listener */
document.addEventListener('keydown',function(event){
	if(event.code == 'ArrowUp') {
		snake.setMovementPosition('up')
	snake.move();
	}
	if(event.code == 'ArrowDown') {
		snake.setMovementPosition('down')
	snake.move();
	}
	if(event.code == 'ArrowRight') {
		snake.setMovementPosition('right')
	snake.move();
	}
	if(event.code == 'ArrowLeft') {
		snake.setMovementPosition('left')
		snake.move();
	}
})

let game = Game();
game.startGame(function(){
		//snake.move();
	
})

// let app = (function(snake){
// 	/* Config  */
// 	moves = {x: 20, y:20 };
// 	currentPos = {x: 10, y: 15};
// 	tails = [{x: 10, y:16,positioned:'top',orientation:'up'},{x:10,y:17,positioned:'top',orientation:'up'}]  

// 	function moveUp() {
// 		--currentPos.y;
// 		if(currentPos.y == 0)
// 			currentPos.y = 20;
// 		snake.style.gridRow = (currentPos.y);
// 		orientPosition(snake,'up');
// 		tails.forEach(tail => {
// 			tail.y--;
// 			if(tail.y ==0)
// 				tail.y = 20
// 			if(tail.x > currentPos.x)
// 				tail.x--;
// 			else if(tail.x < currentPos.x)
// 				tail.x++;
// 		})
// 		applyTails();
// 	}