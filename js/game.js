//game module
let Game = () => {
	let gameSpeed = 100; /* ms */ 
	/* Game Play handler */
	let gamePlay,timer;
	let playCache

	function upSpeed(speed) {
		gameSpeed -= speed;
		clearInterval(gamePlay)
		startGame(playCache);
	}

	function startGame(play) {
		playCache = play
		gamePlay = setInterval(function(){
			play();
		},gameSpeed)
	}
	function gameTimer(handler) {
		timer = setInterval(function() {
			handler();
		},4000)
	}
	function stopGame() {
		clearInterval(gamePlay);
	}

	return {
		startGame,
		stopGame,
		gameTimer,
		upSpeed
	}
}


/* Snake Module */
let Snake = (snakeElement) => {
	let movement = 'up';
	let foodObj = {}
	let score = 0;
	let snakeObject = { 
		name: 'snake',
		x: 10, 
		y: 15, 
		headPosition: 'up',
		tails: [
			{name: 's0', x: 10, y: 16},
			{name: 's1', x: 10, y: 17},
			{name: 's2', x: 10, y: 18},
			{name: 's3', x: 10, y: 19}
		]
	}  

	function applyMovement() {
		snakeElement.style.gridRow = (snakeObject.y);
		snakeElement.style.gridColumn = (snakeObject.x);
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

	function popTail() {
		const tail = snakeObject.tails.pop();
		let tailElement = document.querySelector('.' + tail.name);
		tailElement.parentNode.removeChild(tailElement);
		return tail;
	}
	function pushTail() {
		const parentTail = snakeObject.tails[snakeObject.tails.length-1]
		const tail = {name: 's'+new Date().getTime(), x: parentTail.x, y: parentTail.y}
		snakeObject.tails.push(tail)
		snakeElement.insertAdjacentHTML("afterend", `<div class="snake-tail ${tail.name}" style="grid-column:${tail.x}; grid-row:${tail.y}"></div>`);
	}
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
 	function moveTail() {
		let tail = popTail();
		unshiftTail(tail);			
	}
	function move() {
		snakeObject.headPosition = movement;
		orientHead()
		moveHead()
		moveTail();
		applyMovement();
		checkIntersection();
	}
	function checkIntersection() {
		let food = document.querySelector('.food')
		let scoreElement = document.querySelector('.score-val') 
		if(food) {
			if(snakeObject.x == foodObj.x && snakeObject.y == foodObj.y){
				food.parentNode.removeChild(food);
				score++;
				pushTail()
			}
		}
		scoreElement.innerText = score;


		snakeObject.tails.forEach(tail => {
			if(snakeObject.x == tail.x && snakeObject.y == tail.y){
				//alert('Game Over');
				//location.reload()		
			}

		})

	}	

	function snakeDash() {
		for(i=0;i<5;i++)
			move();
	}

	function putFood(food) {
		let oldfood = document.querySelector('.food')
		if(oldfood)
			oldfood.parentNode.removeChild(oldfood);
		let	xmin = 1, xmax=20, ymin=1, ymax= 20;
		let xrand = Math.floor(Math.random() * (xmax - xmin)) + xmin
		let yrand = Math.floor(Math.random() * (ymax - ymin)) +ymin
		foodObj = { x: xrand,y:yrand }
		snakeElement.insertAdjacentHTML("afterend", `<p class="food" style="grid-column:${xrand}; grid-row:${yrand}"></p>`);
	}
	return {
		move,
		setMovementPosition,
		putFood,
		snakeDash,
		score
	}

	
}
