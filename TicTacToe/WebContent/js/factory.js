app.factory("TicTacToeFactory", function() {
	
	function setNewGame(game) {
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				game["" + i + j] = "";
			}
		}
		return game;
	}
	
	function setX(game, key) {
			game[key] = "X";
		return game;
	}
	
	function setO(game) {
		if(isCanComputerWin(game)) {
			game = setOForComputerWin(game);
		} else if(isComputerCanPreventUserWin(game)) {
			game = setOForPreventUserWin(game);
		} else {
			game = setORandomly(game);
		}
		return game;
	}
	
	function isCanComputerWin(game) {
		return (getKeysForWin(game, "O").length > 0);
	}
	
	function setOForComputerWin(game) {
		game[getKeyForComputerWin(game)] = "O";
		return game;
	}
	
	function getKeyForComputerWin(game) {
		return getKeyRandomly(getKeysForWin(game, "O"));
	}
	
	function isComputerCanPreventUserWin(game) {
		return (getKeysForWin(game, "X").length > 0);
	}
	
	function setOForPreventUserWin(game) {
		game[getKeyForPreventUserWin(game)] = "O";
		return game;
	}
	
	function getKeyForPreventUserWin(game) {
		return getKeyRandomly(getKeysForWin(game, "X"));
	}
	
	function setORandomly(game) {
		game[getEmptyKeyRandomly(game)] = "O";
		return game;
	}
	
	function getEmptyKeyRandomly(game) {
		return getKeyRandomly(getEmptyKeys(game));
	}
	
	function getKeysForWin(game, char) {
		var emptyKeys = getEmptyKeys(game);
		var keys = [];
		
		for(var i = 0; i < emptyKeys.length; i++) {
			game[emptyKeys[i]] = char;
			if(isWinner(game, char)) {
				keys.push(emptyKeys[i]);
			}
			game[emptyKeys[i]] = "";
		}
		return keys;
	}
	
	function getEmptyKeys(game) {
		var keys = [];
		
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if(game["" + i + j] === "") {
					keys.push("" + i + j);
				}
			}
		}	
		return keys;
	}
	
	function getKeyRandomly(keys) {
		return keys[Math.floor(Math.random()*(keys.length))];
	}
	
	function isWinner(game, c) {
		for (var i = 0; i < 3; i++) {
			if (game["" + i + 0] === c && game["" + i + 1] === c && game["" + i + 2] === c) {
				return true;
			}
			if (game["" + 0 + i] === c && game["" + 1 + i] === c && game["" + 2 + i] === c) {
				return true;
			}
		}
		if (game["00"] === c && game["11"] === c && game["22"] === c) {
			return true;
		}
		if (game["20"] === c && game["11"] === c && game["02"] === c) {
			return true;
		}
		return false;
	}

	function isEndGame(game) {
		return (getEmptyKeys(game).length == 0 || isWinner(game, "X") || isWinner(game, "O"));
	}
	
	function getMessage(game) {
		return (isWinner(game, "X") ? "You is winner!" : isWinner(game, "O") 
				? "Computer is winner!" : isEndGame(game) ? "Game Over!" : "");
	}

	return {
		setNewGame : setNewGame,
		setX : setX,
		setO : setO,
		isEndGame : isEndGame,
		getMessage: getMessage
	}
		
});