//general game module
let Game = () => {
	let gameSpeed = 120; /* ms */ 

	/* Game Play handler timer handlers */
	let gamePlay,timer;

	/* stores the function to execute when game starts */
	let playCache

	/* increases the game speed */
	function upSpeed(speed) {
		gameSpeed -= speed;
		clearInterval(gamePlay)
		startGame(playCache);
	}

	/* used to set the gameplay function to be stored in the playCache */
	function passGame(gameplay) {
		playCache = gameplay
	}

	/*  function to start playing the game */
	function startGame() {
		gamePlay = setInterval(function(){
			playCache();
		},gameSpeed)
	}

	/* Function that adds extra features, it is a timer that executes every x seconds. */
	function gameTimer(handler,seconds) {
		timer = setInterval(function() {
			handler();
		},seconds * 1000)
	}

	/* Function to stop the game by dispatching the handlers */
	function stopGame() {
		clearInterval(gamePlay);
		clearInterval(timer);
	}

	return {
		startGame,
		stopGame,
		gameTimer,
		upSpeed,	
		passGame
	}
}


/* Snake Module */
let Snake = (snakeElement) => {
	
 	/* stores the current movement*/
	let movement = 'up';

	/* stores the previous movement */
	let previousMovement;

	/* Contains the location of the food available in x, and y positions. */
	let foodObj = {};

	/* keeping a count of the score */
	let score = 0;

	/* Contains all the info about the snake and its tails */
	let snakeObject = { 
		name: 'snake',
		x: 10, 
		y: 15, 
		headPosition: 'up',
		tails: [
			{name: 's0', x: 10, y: 16}
		]
	}  

	/* apply a movement to the snake head on screen  */
	function applyMovement() {
		snakeElement.style.gridRow = (snakeObject.y);
		snakeElement.style.gridColumn = (snakeObject.x);
	}

	/* add a class to the snake head to orient his head direction */
	function orientHead() {
		snakeElement.classList.remove('up')
		snakeElement.classList.remove('down')
		snakeElement.classList.remove('left')
		snakeElement.classList.remove('right')
		snakeElement.classList.add(snakeObject.headPosition);
	}

	/* used to change the movement direction of the snake either up,down, left or right */
	function setMovementPosition(pos) {
		movement = pos;
	}


	/* function to Move the head of the snakeObject */
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

	/* Remove the last tail part  and return it */
	function popTail() {
		const tail = snakeObject.tails.pop();
		let tailElement = document.querySelector('.' + tail.name);
		tailElement.parentNode.removeChild(tailElement);
		return tail;
	}

	/* function to add a new tail part */
	function pushTail() {
		const parentTail = snakeObject.tails[snakeObject.tails.length-1]
		const tail = {name: 's'+new Date().getTime(), x: parentTail.x, y: parentTail.y}
		snakeObject.tails.push(tail)
		snakeElement.insertAdjacentHTML("afterend", `<div class="snake-tail ${tail.name}" style="grid-column:${tail.x}; grid-row:${tail.y}"></div>`);
	}
	

	/* Function to add a tail directly after the head */
	function unshiftTail(tail) {
		switch (movement) {
			case 'up':
				tail.x = snakeObject.x;
				tail.y = snakeObject.y+1
				snakeObject.tails.unshift(tail)
			break;
			case 'down':
				tail.x = snakeObject.x;
				tail.y = snakeObject.y-1
				snakeObject.tails.unshift(tail)
			break;
			case 'left':
				tail.y = snakeObject.y;
				tail.x = snakeObject.x+1
				snakeObject.tails.unshift(tail)
			break;
			case 'right':
				tail.y = snakeObject.y;
				tail.x = snakeObject.x -1;
				snakeObject.tails.unshift(tail)
			break;
		}
		snakeElement.insertAdjacentHTML("afterend", `<div class="snake-tail ${tail.name}" style="grid-column:${tail.x}; grid-row:${tail.y}"></div>`);
	}
 	

 	/* Simple Algorithm for the snake tail to follow his head.
		Simply we pop the last tail and add it after his head.
 	 */
 	function moveTail() {
		let tail = popTail();
		unshiftTail(tail);			
	}
	

	/* Main snake move function*/
	function move() {

		/* Guard so the snake won't move over itself, by saving the previous movement */ 
		if((movement == 'right' && previousMovement == 'left') || (movement == 'left' && previousMovement == 'right') || (movement == 'up' && previousMovement == 'down') || (movement == 'down' && previousMovement == 'up') )
			movement = previousMovement;
		else {
			previousMovement = movement;
		}
		/* Adjust the snake head position in snake object */
		snakeObject.headPosition = movement;
		/* adjust the head position on screen */
		orientHead()
		/* adjust the snake head object positions x and y*/
		moveHead()
		/* Apply the movement on screen  */
		applyMovement();
		/* move the tail after the head*/
		moveTail();

		/* Check for any intersection after the movement */
		checkIntersection();
	}
	

	/* Checks any type of intersection, either snake head with food or snake head with body*/
	function checkIntersection() {
		let food = document.querySelector('.food')
		let scoreElement = document.querySelector('.score-val') 
		if(food) {
			/* if intersection head with food, then add score and delete food. also add a tail. */
			if(snakeObject.x == foodObj.x && snakeObject.y == foodObj.y){
				food.parentNode.removeChild(food);
				score++;
				/* update the score on screen  */
				scoreElement.innerText = score;
				pushTail()
			}
		}

		/* Loop over tails to check the intersection between the snake body and his head. */
		snakeObject.tails.forEach(tail => {
			if(snakeObject.x == tail.x && snakeObject.y == tail.y){
				alert('Game Over');
				location.reload()		
			}
		})

	}	

	/* function to make the snake dash 5 blocks on the screen*/
	function snakeDash() {
		for(i=0;i<5;i++) {
			move();
		}
	}


	/* Function to put the snake food on a random position on the Screen */
	function putFood(food) {
		/* checks if there's a previous food on the screen and removes it */
		let oldfood = document.querySelector('.food')
		if(oldfood)
			oldfood.parentNode.removeChild(oldfood);

		/* generating random x and y positions for the food on the grid. */
		let	xmin = 1, xmax=20, ymin=1, ymax= 20;
		let xrand = Math.floor(Math.random() * (xmax - xmin)) + xmin
		let yrand = Math.floor(Math.random() * (ymax - ymin)) +ymin

		/* updating the position of the food object and adding the food on the screen */
		foodObj = { x: xrand,y:yrand }
		snakeElement.insertAdjacentHTML("afterend", `<p class="food" style="grid-column:${foodObj.x}; grid-row:${foodObj.y}"></p>`);
	}



	return {
		move,
		setMovementPosition,
		putFood,
		snakeDash,
		score
	}
}
