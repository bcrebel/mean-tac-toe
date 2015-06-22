/**********************mean tac toe***********************
Mean Girls-themed minimax tic tac toe game by Carron White
**********************************************************/
 

function Round(el) {

	var frame = document.createElement('div'),
	 	size = (0.4 * window.innerWidth) + 'px',
	 	sizeInt = parseInt(size);
	 	marginCalc = (window.innerWidth ) + '%',
	 	canvas = document.createElement('canvas'),
	 	context = canvas.getContext('2d'),
	 	board = [0, 0, 0, 0, 0, 0, 0, 0],
	 	ref = document.getElementsByTagName('h2')[0],
		comments = [
			"SO you think you’re really pretty?",
			"Shut up!",
			"Stop trying to make fetch happen!",
			"Vintage, so adorable", 
			"You could try Sears",
			"That's just the rules of femenism",
			"BOO you whore!",
	 		"You smell like a baby prostitute",
			"You CAN'T sit with us!"
		 ],
		// Store the player images
	 	sources = {
	 		cady: 'img/cady.png',
	 		regina: 'img/regina.png'
 	 	},
	 	turn = 0,
	 	// Winning move combinations
	 	combos = [
		 	[0, 1, 2],
		 	[3, 4, 5], 
		 	[6, 7, 8], 
		 	[0, 3, 6], 
		 	[1, 4, 7],
		 	[2, 5, 8],
		 	[0, 4, 8], 
		 	[6, 4, 2]
	 	],
	 	restartRound = function() {
	 		return setTimeout(function() {
	 			location.reload();
	 		}, 1500);
	 	};;
	 	
	// Centered container for responsive board
	frame.id = 'frame';
	document.body.appendChild(frame);
	document.body.style.background = '#FCD1E5';
  	frame.style.width = size;
	frame.style.height = size;
 	frame.style.margin = '5% 0 0 30%';
	canvas.width = sizeInt;
	canvas.height = sizeInt;
	context.lineWidth = 5;
 	frame.appendChild(canvas);
  	strokeStyle = 'black';


 

 	// Dynamically draw board
 	with(context) {
  		
  		var x = sizeInt * (1 / 3);
 	 	beginPath();
	 	moveTo((x * 2), 0), lineTo((x * 2), sizeInt);
  		moveTo(0, (x * 2)), lineTo(sizeInt, (x * 2));
  		moveTo(0, x), lineTo(sizeInt, x);
  	 	moveTo(x, 0), lineTo(x, sizeInt);
	 	stroke();
	}
 


 	canvas.onclick = function(e) {
 		
 		var rect = canvas.getBoundingClientRect(),
		move = ~~((e.pageY - rect.top ) / (canvas.width / 3)) * 3 +
		 ~~((e.pageX - rect.left) / (canvas.width / 3)),
		x = move % 3 * (sizeInt / 3 + context.lineWidth ), 
		y = ~~(move / 3) * (sizeInt / 3 + context.lineWidth);
 		
 		// Execute move if board space is empty 
 		if (!board[move]) {
 		 	
 		 	turn++;

 		 	// Draw player image depending on turn
 		 	if (turn % 2 === 0) { 
 		 		
 		 		loadImages('regina', x, y);
 		 		board[move] = -1;
 		 		ref.innerHTML = comments[turn - 1];
  		 	} else {
 		 		
 		 		loadImages('cady', x, y);
 		 		board[move] = 1;
 		 		ref.innerHTML = comments[turn - 1];
  		 	}

  		 	// Check the current status of the game
		 	if (boardStatus() === "main") {
 		 		
 		 		ref.innerHTML = "Damn Africa, you won!";
		 		restartRound();
		 	} else if (boardStatus() === "opp") {
		 		
		 		ref.innerHTML = "LOSER";
		 		restartRound();
		 	} else if (boardStatus() === "draw") {
		 		
		 		ref.innerHTML = "DRAW";
		 		restartRound();
		 	} 

  	}


	function loadImages(prop) {
			
			var imageObj = new Image();
			imageObj.src = sources[prop];
			imageObj.onload = function() {
	        context.drawImage(imageObj, x, y, sizeInt / 3 - context.lineWidth * 2, sizeInt / 3 - context.lineWidth * 2);

	      }

  		}
	};



	function boardStatus() {
		for (combo in combos) { // Check each array in combos
			
			for (var i = main = opp = 0; i <= 3; i++) {
 					var check = combos[combo][i]; // Store each index in combo array
 				
 				if (board[check] === 1) { // Check winning index against moves on board
					main++;
 				} else if (board[check] === -1) { // Check winning index against moves on board
					opp++;
 				}
				
				if (opp === 3) {
					return "opp";
				} else if (main === 3) {
					return "main";
				} 

			}
		}

		if (turn === 9){
			return "draw";
		}
	}
}