//game module
let Game = () => {
	let gameSpeed = 100; /* ms */ 
	/* Game Play handler */
	let gamePlay;


	function changeSpeed(speed) {
		gameSpeed = speed;
	}

	function startGame(play) {
		gamePlay = setInterval(function(){
			play();
		},gameSpeed)
	}

	function stopGame() {
		clearInterval(gamePlay);
	}

	return {
		startGame,
		changeSpeed,
		stopGame
	}
}


/* Snake Module */
let Snake = (snakeElement) => {
	let movement = 'up';
	let snakeObject = { 
		name: 'snake',
		x: 10, 
		y: 15, 
		headPosition: 'up',
		tails: [
			{ name: 's0', x: 10, y: 16, parent:'snake' ,direction:'up' },
			{name: 's1', x: 10, y: 17, parent: 's0', direction: 'up'},
			{name: 's2', x: 10, y: 18, parent: 's1', direction: 'up'},
			{name: 's3', x: 10, y: 19, parent: 's2', direction: 'up'}
		]
	}  

	function applyMovement() {
		snakeElement.style.gridRow = (snakeObject.y);
		snakeElement.style.gridColumn = (snakeObject.x);
		snakeObject.tails.forEach(tail => {
			document.querySelector('.' + tail.name).style.gridRow = tail.y;
			document.querySelector('.' + tail.name).style.gridColumn = tail.x;
		})
	}

	function orientHead() {
		snakeElement.classList.remove('up')
		snakeElement.classList.remove('down')
		snakeElement.classList.remove('left')
		snakeElement.classList.remove('right')
		snakeElement.classList.add(snakeObject.headPosition);
	}
	function setMovementPosition(pos) {
		movement = pos;
	}

	function moveHead(objToMove) {
		if(!objToMove)
			objToMove = snakeObject;
		switch(movement) {
			case 'up':
				objToMove.y--; //move snake up grid
				if(objToMove.y == 0)
					objToMove.y = 20;
			break;
			case 'down':
				objToMove.y++; //move snake up grid
				if(objToMove.y > 20)
					objToMove.y = 1;
			break;
			case 'left':
				objToMove.x--; //move snake up grid
				if(objToMove.x == 0)
					objToMove.x = 20;
			break;
			case 'right':
				objToMove.x++; //move snake up grid
				if(objToMove.x > 20)
					objToMove.x = 1;
			break;
		}
	}
	function moveTail(tail,parentTail) {
		switch(movement) {
			case 'up':
			if(tail.x == parentTail.x)
				tail.y = parentTail.y +1;
				if(tail.y > 20)
					tail.y = 1;
				else if(tail.y==0)
					tail.y = 20;
			if(tail.x > parentTail.x)
					tail.x--;
			else if(tail.x < parentTail.x)
					tail.x++;

			break;
			case 'down':
			if(tail.x == parentTail.x)
				tail.y = parentTail.y -1;
			if(tail.y == 0)
				tail.y = 20;
			else if(tail.y > 20)
				tail.y = 1
			if(tail.x > parentTail.x)
					tail.x--;
			else if(tail.x < parentTail.x)
					tail.x++;

			break;
			case 'left':
				if(tail.y == parentTail.y)
					tail.x = parentTail.x + 1;
				if(tail.x >20)
					tail.x = 1;
				else if(tail.x == 0)
					tail.x = 20
				if(tail.y > parentTail.y + 15)
					tail.y = parentTail.y  - 1;
				else if(tail.y < parentTail.y - 15)
					tail.y = parentTail.y + 1;
				else if(tail.y > parentTail.y)
					tail.y--;
				else if(tail.y < parentTail.y)
					tail.y++;
			break;
			case 'right':
				if(tail.y == parentTail.y)
					tail.x = parentTail.x -1;
				if(tail.x == 0)
					tail.x = 20;
				else if(tail.x > 20)
					tail.x =0;
				if(tail.y > parentTail.y)
					tail.y--;
				else if(tail.y < parentTail.y)
					tail.y++;
			break;
		}
	}
	function move() {
		snakeObject.headPosition = movement;
		orientHead()
		moveHead()
		snakeObject.tails.forEach((tail,index) => {
			if(tail.parent == 'snake' ) {
					moveTail(snakeObject.tails[index],snakeObject);
			} else {
					moveTail(snakeObject.tails[index], snakeObject.tails[index - 1])
			}
		})
		applyMovement();
	}

	function addTail() {

	}
 
	return {
		move,
		addTail,
		setMovementPosition
	}

	
}
