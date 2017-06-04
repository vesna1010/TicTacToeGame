var app = angular.module("app", []);

app.factory("myFactory", function() {

	return {
	
		newGame: function(obj){
			var i, j;
			for( i=0; i<3; i++){
				for(j=0; j<3; j++){
					key=""+i+j;
					obj[key]="";
				}
			}
			return obj;
		},
		
		addX : function(obj, key) {
			if (obj[key] == "") {
				obj[key] = "X";
			}
			return obj;
		},
		
		addO : function(obj){
			
			var i, j, added=false;
			
			//computer tries to win
			for( i=0; i<3; i++){
				for(j=0; j<3; j++){
					key=""+i+j;
					if(obj[key] == ""){
						obj[key] = "O";
						if(this.checkWinner(obj, 'O')){
							added=true;
							return obj;
						}else{
							obj[key] = "";
						}
					}
				}
			}
			
			//computer prevents victory opponents
			if(!added){
				for( i=0; i<3; i++){
					for(j=0; j<3; j++){
						key=""+i+j;
						if(obj[key] == ""){
							obj[key] = "X";
							if(this.checkWinner(obj, "X")){
								added=true;
								obj[key] = "O";
								return obj;
							}else{
								obj[key] = "";
							}
						}
					}
				}
			}
			
			// add O randomly
			if(!added){
				do{
					i=Math.floor(Math.random()*3);
					j=Math.floor(Math.random()*3);
					key=""+i+j;
					if(obj[key] == ""){
						obj[key] = "O";
						added=true;
						return obj;
					}
				}while(!added);
			}
			return obj;
		},

		
		checkWinner : function(obj, s) {
			var i;
			for( i=0; i<3; i++){
				if (obj["" + i + 0] == s && obj["" + i + 1] == s && obj["" + i + 2] == s) {
					return true;
				}
				if (obj["" + 0 + i] == s && obj["" + 1 + i] == s && obj["" + 2 + i] == s) {
					return true;
				}
			}
			if (obj["00"] == s && obj["11"] == s && obj["22"] == s) {
				return true;
			}
			if (obj["20"] == s && obj["11"] == s && obj["02"] == s) {
				return true;
			}
			return false;
		},
		
		isEndGame:function(obj){
            var i, j, endGame=true;
            
            for( i=0; i<3; i++){
				for(j=0; j<3; j++){
					if(obj[''+i+j]==""){
						endGame=false;
					}
				}
            }
           
            if(!endGame){
            	if(this.checkWinner(obj, "X") || this.checkWinner(obj, "O")){
            		endGame=true;
            	}
            }
            
            return endGame;
		}, 
		
		showMessage:function(obj){
			if(this.checkWinner(obj, "X")){
				return "You is winner!";
			}
			if(this.checkWinner(obj, "O")){
				return "Computer is winner!";
			}
				return "Game Over!";
		}
	}
});


app.controller("ctrl", function($scope, myFactory, $timeout) {
	var message="";
	var game={};
	showNewGame();
	
	function showNewGame(){
		game = myFactory.newGame({});
		setMessage("");
		showTable(game);
	}
	
	$scope.showNewGame=function() {
		showNewGame();
	}

	function showTable(obj, endGame){
		
		var table=angular.element(document.querySelector(".table"));
		table.html("");
		for(i=0; i<3; i++){
			var row=angular.element("<div class='row'>");
			table.append(row);
			for(j=0; j<3; j++){
				var cell=angular.element("<div id='"+(""+i+j)+"' class='cell'>"+obj[""+i+j]+"</div>")
				                .bind("click", addXO);
                if(obj[""+i+j]!="" || endGame)
                	cell.unbind();
				row.append(cell);
			}
		}
		if(endGame){
			setMessage(myFactory.showMessage(game));
		}
	}
	
	function addXO(){
		var endGame;
		key=this.id;
		game=myFactory.addX(game, key);
		endGame=myFactory.isEndGame(game);
		showTable(game, endGame);
		if(!endGame){
			$timeout(function(){
				game=myFactory.addO(game);
				endGame=myFactory.isEndGame(game);
				showTable(game, endGame);
			}, 500);
		}
	}
	
	function setMessage(message){
		var h1=angular.element(document.querySelector("h1"));
		h1.text(message);
	}
});