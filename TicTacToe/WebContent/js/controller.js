var app = angular.module("app", []);

app.controller("TicTacToeController", ["TicTacToeFactory", "$timeout", "$scope",
	           function(TicTacToeFactory, $timeout, $scope) {
	
	$scope.game = TicTacToeFactory.setNewGame(new Object());
	$scope.message = "";
	
	$scope.play = function(key) {
		if(isCanUserPlay(key)) {
			playUser(key);
			if(!isEndGame()) {
				playComputer();
			}
		}
	}
	
	function playUser(key) {
		$scope.game = TicTacToeFactory.setX($scope.game, key);
		$scope.message = TicTacToeFactory.getMessage($scope.game);
	}
	
	function isCanUserPlay(key) {
		return ($scope.game[key] === "" && $scope.message === "");
	}
	
	function isEndGame() {
		return TicTacToeFactory.isEndGame($scope.game);
	}
	
	function playComputer() {
		$timeout(function() {
			$scope.game = TicTacToeFactory.setO($scope.game);
			$scope.message = TicTacToeFactory.getMessage($scope.game);
		}, 500);
	}
	
}]);

