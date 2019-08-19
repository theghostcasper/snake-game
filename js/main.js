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


let app = (function(snake){
	/* Config  */
	moves = {x: 20, y:20 };
	currentPos = {x: 10, y: 15};
	tails = [{x: 10, y:16,positioned:'top',orientation:'up'},{x:10,y:17,positioned:'top',orientation:'up'}]  

	function moveUp() {
		--currentPos.y;
		if(currentPos.y == 0)
			currentPos.y = 20;
		snake.style.gridRow = (currentPos.y);
		orientPosition(snake,'up');
		tails.forEach(tail => {
			tail.y--;
			if(tail.y ==0)
				tail.y = 20
			if(tail.x > currentPos.x)
				tail.x--;
			else if(tail.x < currentPos.x)
				tail.x++;
		})
		applyTails();
	}
	function moveDown(){
		++currentPos.y;
		if(currentPos.y > 20)
			currentPos.y = 1;
		snake.style.gridRow = (currentPos.y);
		orientPosition(snake,'down');

		tails.forEach(tail => {
			tail.y++;
			if(tail.y > 20)
				tail.y =1
			if(tail.x > currentPos.x)
				tail.x--;
			else if(tail.x < currentPos.x)
				tail.x++;
		})
		applyTails();
	}

	function orientPosition(element,position){
		element.classList.remove('snake-right');
		element.classList.remove('snake-left');
		element.classList.remove('snake-down');
		element.classList.remove('snake-up');
		element.classList.add(`snake-${position}`);
	}
	function moveRight(){
		++currentPos.x;
		if(currentPos.x > 20)
		currentPos.x = 1;
		snake.style.gridColumn = (currentPos.x);
		orientPosition(snake,'right');
		let once = false; //flag;
		tails.forEach((tail,index) => {
			if(once == false){
				if(tail.positioned == 'right')
				{
					tail.x++;
					if(tail.x > 20)
						tail.x =1
					return;
				}
				else {
					once=true;
					tail.x++;
					if(tail.x == currentPos.x)
						tail.x--;	
					if(tail.x > 20)
						tail.x =1
					if(tail.y > currentPos.y)
						tail.y--;
					else if(tail.y < currentPos.y)
						tail.y++;
					tail.positioned = 'right';
				}
			}
		})
		applyTails('right');
	}
	function moveLeft(){
		--currentPos.x;
		if(currentPos.x == 0)
		currentPos.x = 20;
		snake.style.gridColumn = (currentPos.x);
		orientPosition(snake,'left');
	}


	function applyTails(){
		tails.forEach((tail,index) => {
			document.querySelector(`.s${index}`).style.gridRow = tail.y;
			document.querySelector(`.s${index}`).style.gridColumn= tail.x;
		})	
	}
	return {
		moveUp,
		moveDown,
		moveRight,
		moveLeft
	}
})(document.querySelector('.snake'))



document.addEventListener('keydown',function(event){
	if(event.code == 'ArrowUp')
		app.moveUp()
	if(event.code == 'ArrowDown')
		app.moveDown()
	if(event.code == 'ArrowRight')
		app.moveRight()
	if(event.code == 'ArrowLeft')
		app.moveLeft()


})