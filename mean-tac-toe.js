/********** mean tac toe *********************************
Mean Girls-themed minimax tic tac toe game by Carron White
*********************************************************/
 

function Round(el) {



	var frame,
	  next,
	 	computerMode,
	 	size = (0.4 * window.innerWidth) + 'px',
	 	sizeInt = parseInt(size),
	 	squareSize = (sizeInt / 3),
	 	marginCalc = (window.innerWidth) + '%',
	 	canvas = document.createElement('canvas'),
	 	context = canvas.getContext('2d'),
	 	board = [0, 0, 0, 0, 0, 0, 0, 0],
 	 	ref = document.getElementsByTagName('h2')[0],
		comments = ["SO you think you’re really pretty?",
		 "Shut up!",
		 "You smell like a baby prostitute.",
		 "Stop trying to make fetch happen!",
		  "Vintage, so adorable", 
		 "You could try Sears",
		 "That's just the rules of feminism",
		 "BOO you whore!",
		 "You CAN'T sit with us!"],
	 	sources = {
	 		cady: 'img/cady.png',
	 		regina: 'img/regina.png'
 	 	},
	 	turn = 0,

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
		};
 
		frame = document.createElement('div');
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

  		computerMode = confirm("Click 'OK' to play the computer, 'Cancel' to play with a friend");

 
	with(context) {
 		var x = sizeInt * (1 / 3);
 	 	beginPath();
	 	moveTo((x * 2), 0), lineTo((x * 2), sizeInt);
  		moveTo(0, (x * 2)), lineTo(sizeInt, (x * 2));
  		moveTo(0, x), lineTo(sizeInt, x);
  	 	moveTo(x, 0), lineTo(x, sizeInt);
	 	stroke();
 	}


 	if (!computerMode) {
	 	canvas.onclick = function(e) {
	 		var rect = canvas.getBoundingClientRect();
			move = Math.floor((e.pageY - rect.top ) / (canvas.width / 3)) * 3 +
		 	Math.floor((e.pageX - rect.left) / (canvas.width / 3)),
			x = move % 3 * (squareSize + context.lineWidth ),
			y = Math.floor(move / 3) * (squareSize + context.lineWidth);
	 		 
	 		if (!board[move]) {

	 			turn++;
	 		 	if (turn % 2 === 0) {
	 		 		loadImages('regina', x, y);
	 		 		board[move] = -1;
	 		 		ref.innerHTML = comments[turn - 1];
 	 		 	} else {
	 		 		loadImages('cady', x, y);
	 		 		board[move] = 1;
	 		 		ref.innerHTML = comments[turn - 1];

 	 		 	}

			 	if (boardStatus() === "main") {
	 		 		ref.innerHTML = "Damn Africa, you won!";
			 		restartRound();
			 	} else if (boardStatus() === "opp") {
			 		ref.innerHTML = "LOSER";
			 		restartRound();
			 	} else if (boardStatus() === "draw") { 
			 		//boardStatus() === "draw"; 
			 		ref.innerHTML = "DRAW";
			 		restartRound();
			 	}
			}
		}
			
	} else {

		canvas.onclick = function(e) {
			
			var next,
			rect = canvas.getBoundingClientRect(),
 			move = Math.floor((e.pageY - rect.top ) / (canvas.width / 3)) * 3 +
			Math.floor((e.pageX - rect.left) / (canvas.width / 3)),
			x = move % 3 * (squareSize + context.lineWidth ),
			y = Math.floor(move / 3) * (squareSize + context.lineWidth);
			
			if (!board[move]) {
  					
 					loadImages('cady', x, y);
					
					board[move] = 1;
					
					turn++;

 					if (boardStatus(0) > 0) {
						ref.innerHTML = "Damn Africa, you won!";
 						restartRound(); 
 					} else {
						ref.innerHTML = comments[turn - 1];
					}
		 
 					next = computerMove(0, -1, -squareSize, squareSize);

					board[next] = -1;



					x = (next % 3) * (sizeInt / 3 + context.lineWidth);
					y = Math.floor(next / 3) * (sizeInt / 3 + context.lineWidth);
					
					setTimeout(function() {

					loadImages('regina', x, y);
 
  					
 					if (boardStatus(0) < 0) {
 						ref.innerHTML = "LOSER";
 						restartRound(); 
 					} else {
 						ref.innerHTML = comments[turn - 1];
 					}

 					if (next === undefined) {
 						ref.innerHTML = "DRAW";
						restartRound(); 
					}
				}, 1000);
				turn++;
 
			}
		};
		
	}

	function loadImages(prop, x, y) {
		var imageObj = new Image();
		imageObj.src = sources[prop];
			
		imageObj.onload = function() {
		    context.drawImage(imageObj, x, y, sizeInt / 3 - context.lineWidth * 2, sizeInt / 3 - context.lineWidth * 2);
	    }
  	}
	

	function boardStatus(depth) {
		for (combo in combos) {
			for (var i = main = opp = 0; i <=  3; i++) {
 				var check = combos[combo][i];
 				if (board[check] === 1) {
					main++;
 				} else if (board[check] === -1) {
					opp++;
 				}
			}
			
			if (opp === 3) {
				return computerMode ? (depth - squareSize) : "opp";
 			} else if (main === 3) {
 				return computerMode ? (squareSize - depth) : "main";
 			} 
		}

		if (!computerMode && turn === 9){
			return "draw";
		}

	};

	// Minimax algorithm with Alpha-Beta Pruning
	//next = computerMove(0, -1, (-sizeInt / 3), (sizeInt / 3));
	function computerMove(depth, player, alpha, beta){
		var i = 9, // number of board pieces
		min = -squareSize, max, value, next;
		
		if (value = boardStatus(depth)) { // calculate value from victor
			return value * player;
		}
  		while(i--){
 			if (!board[i]){
 				board[i] = player;
					 
				value = -computerMove(depth + 1, -player, -beta, -alpha); // value of terminal node
				board[i] = 0;


				if (max === undefined || value > max) {max = value;} //if on max node
				if (value > alpha) {alpha = value;} // if on min node
				if (alpha >= beta) {return alpha;} // prune this branch
				if (max > min){ min = max; next = i; } // best odds for next move
 			}
		}
 		return depth ? max || 0 : next; // 0 is tie game
	}

};