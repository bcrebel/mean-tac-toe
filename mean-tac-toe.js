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
		 "That's just the rules of femenism",
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

  	//var playerMode = confirm("Click 'OK' to play the computer, 'Cancel' to play with a friend");

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
  		 	} else {
 		 		loadImages('cady');
 		 		board[move] = 1;
 		 		ref.innerHTML = comments[turn - 1];
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


	function loadImages(prop) {
			var imageObj = new Image();
			imageObj.src = sources[prop];
			imageObj.onload = function() {
	        context.drawImage(imageObj, x, y, sizeInt / 3 - context.lineWidth * 2, sizeInt / 3 - context.lineWidth * 2);

	      }

  		}
	};



	function boardStatus() {
		for (combo in combos) {
			for (var i = main = opp = 2; i >= 0; i--) {
 					var check = combos[combo][i];
 				if (board[check] === 1) {
					main--;
					console.log(main + ' this is main');
				} else if (board[check] === -1) {
					opp--;
					console.log(opp + ' this is opp');
				}

				  if (opp === -1) {
					return "opp";
				} else if (main === -1) {
					return "main";
				} 

			}
		}

		if (turn === 9){
			return "draw";
		}
	}




}