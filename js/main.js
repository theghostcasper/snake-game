//game module
let Game = () => {
	let gameSpeed = 100;
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
		start,
		changeSpeed,
		stopGame
	}
}

//display module
let Display = () => {

	function render(appElement,data) {

	}


	return {
		render
	}
}

//controller module.
let Controller = () => {

	function move(position) {
		switch(position) {

		}
	}
 
	return {
		move
	}

	
}





/* Game Logic */

