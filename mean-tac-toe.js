/** mean tac toe
Mean Girls-themed minimax tic tac toe game by Carron White
*/
 

function Round(el) {



	 var frame = document.createElement('div'),
	 	size = (0.4 * window.innerWidth) + 'px',
	 	sizeInt = parseInt(size);
	 	marginCalc = (window.innerWidth ) + '%',
	 	canvas = document.createElement('canvas'),
	 	context = canvas.getContext('2d'),
	 	board = [0, 0, 0, 0, 0, 0, 0, 0],
	 	ref = document.getElementsByTagName('h2')[0],
		comments = ["SO you think you’re really pretty?",
		 "Shut up!",
		 "Stop trying to make fetch happen!",
		  "Vintage, so adorable", 
		 "You could try Sears",
		 "That's just the rules of feminism",
		 "BOO you whore!",
		 "You CAN'T sit with us!"],
	 	sources = {
	 		cady: 'img/cady.png',
	 		regina: 'img/regina.png',
 	 	},
	 	turn = 0,
	 	combos = [[0, 1, 2],
	 	 [3, 4, 5], 
	 	 [6, 7, 8], 
	 	 [0, 3, 6], 
	 	 [1, 4, 7],
	 	 [2, 5, 8],
	 	 [0, 4, 8], 
	 	 [6, 4, 2]];
	 	

	 

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

  	var computerMode = confirm("Click 'OK' to play the computer, 'Cancel' to play with a friend");


 	for (i in context) {
		context[i[0] + (i[4] || '')] = context[i];	
 	}




	with(context) {
 		var x = sizeInt * (1 / 3);
 	 	bn();
	 	mT((x * 2), 0), lT((x * 2), sizeInt);
  		mT(0, (x * 2)), lT(sizeInt, (x * 2));
  		mT(0, x), lT(sizeInt, x);
  	 	mT(x, 0), lT(x, sizeInt);
	 	stroke();
 	}


 	if (computerMode == false) {
	 	canvas.onclick = function(e) {
	 		var rect = canvas.getBoundingClientRect();
			move = ~~((e.pageY - rect.top ) / (canvas.width / 3)) * 3 +
			 ~~((e.pageX - rect.left) / (canvas.width / 3));
			 var x = move % 3 * (sizeInt / 3 + context.lineWidth ), y = ~~(move / 3) * (sizeInt / 3 + context.lineWidth);
	 		 
	 		 if (!board[move]) {
	 		 	turn++;


	 		 	if (turn % 2 == 0) {
	 		 		loadImages('regina');
	 		 		board[move] = -1;
	 		 		ref.innerHTML = comments[turn - 1];
	 		 		//return board;
	 		 	} else {
	 		 		loadImages('cady');
	 		 		board[move] = 1;
	 		 		ref.innerHTML = comments[turn - 1];

	 		 		//return board;
	 		 	}
			 	if (boardStatus() === "main") {
	 		 		ref.innerHTML = "Damn Africa, you won!";
			 		setTimeout(location.reload(), 9000);
			 	} else if (boardStatus() === "opp") {
			 		ref.innerHTML = "LOSER";
			 		setTimeout(location.reload(), 9000);
			 	} else if (boardStatus() === "draw") {
			 		ref.innerHTML = "DRAW";
			 		setTimeout(location.reload(), 9000);
			 	} 

	  	}

  	}

  	if (computerMode = true) {

  		canvas.onclick = function(e) {
 		var rect = canvas.getBoundingClientRect();
		move = ~~((e.pageY - rect.top ) / (canvas.width / 3)) * 3 +
		 ~~((e.pageX - rect.left) / (canvas.width / 3));
		 var x = move % 3 * (sizeInt / 3 + context.lineWidth ), y = ~~(move / 3) * (sizeInt / 3 + context.lineWidth);

		if (!board[move]) {
			turn++;
			if (turn % 2 != 0) {
				loadImages('cady');
				board[move] = 1;
				computerMove(0, -1, -sizeInt / 3, sizeInt / 3);
			}

	 		 	if (turn % 2 == 0) {
	 		 		loadImages('regina');
	 		 		board[move] = -1;
	 		 		ref.innerHTML = comments[turn - 1];
	 		 	}   
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





	function boardStatus(depth) {
		for (combo in combos) {
			for (var i = main = opp = 3; i >  0; i--) {
 					var check = combos[combo][i];
 				if (board[check] === 1) {
					main--;
 				} else if (board[check] === -1) {
					opp--;
 				}

				 if (!opp) {
					return depth - sizeInt / 3;
				} else if (!main) {
					return size - depth;
				} 

			}
		}

		if (turn === 9){
			return "draw";
		}
	}




	function computerMove(depth, player, alpha, beta){
		var i = 9, min = -sizeInt / 3, max, value, next;
		if (value = boardStatus(depth)) // either player won
			return value * player;
 			while(i--){
 				if (!board[i]){
 					board[i] = player;
					 
					value = -computerMove(depth + 1, -player, -beta, -alpha);
					board[i] = undef;


					if (max === undef || value > max) max = value;
					if (value > alpha) alpha = value;
					if (alpha >= beta) return alpha; // prune branch
					if (max > min){ min = max; next = i; } // best odds for next move
					console.log('the VALUE is now ' + value);

				}
			}		
 		console.log(next + ' this is next'); 
		return depth ? max || 0 : next; // 0 is tie game
	}



}