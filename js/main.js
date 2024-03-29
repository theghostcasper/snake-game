(() => {
	/* Game Logic */
	/* Play button event listener */
	document.querySelector('.play').addEventListener('click',function(){
		this.style.display = 'none';
		document.getElementById('app').style.display = 'grid';
		document.querySelector('.main-header').style.display = 'none';
		/* Useless changing of opacity transition*/
		let anim = setInterval(function(){
			document.getElementById('app').style.opacity++;
			if(document.getElementById('app').style.opacity == 1)
				clearTimeout(anim)
		},10)

		startGame();
	})

	function startGame() {
		/* Select the snake element */
		let snakeElement = document.getElementById('snake')

		let snake = Snake(snakeElement);

		/* Button event listener */
		document.addEventListener('keydown',function(event){
			if(event.keyCode == 38) {
				snake.setMovementPosition('up')
			}
			else if(event.keyCode == 40) {
				snake.setMovementPosition('down')
			}
			else if(event.keyCode == 39) {
				snake.setMovementPosition('right')
			}
			else if(event.keyCode == 37) {
				snake.setMovementPosition('left')
			}
		})
		document.addEventListener('keyup',function(event){
			if(event.keyCode == 32)
				snake.snakeDash()
		})


		let scoreNow = 0; /* used as a flag */



		let game = Game();

		/* Initialize the game */
		game.passGame(function() {
			snake.move()

			/* update the game speed whenever the score reaches a specific value */
			score = parseInt(document.querySelector('.score-val').innerText);
			if(score>0 && score % 5 == 0 && score !==scoreNow && score != 50)
			{
				scoreNow = score;
				game.upSpeed(5);
			}
		})

		/* Start the game */
		game.startGame()
		/* Put snake food every 4 seconds */
		game.gameTimer(function() {
			snake.putFood();
		}, 4)
	}

})()