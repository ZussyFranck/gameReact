var Game = React.createClass({

   getInitialState: function() {
      return {
         table: [["player1","","","","","","","","","","","","","",""],
         ["","","","","","","","","","","","","","",""],
         ["","","","","","","","","","","","","","",""],
         ["","","","","","","","","","","","","","",""],
         ["","","","","","","","","","","","","","",""],
         ["","","","","","","","","","","","","","",""],
         ["","","","","","","","","","","","","","",""],
         ["","","","","","","","","","","","","","",""],
         ["","","","","","","","","","","","","","",""],
         ["","","","","","","","","","","","","","",""],
         ["","","","","","","","","","","","","","",""],
         ["","","","","","","","","","","","","","",""],
         ["","","","","","","","","","","","","","",""],
         ["","","","","","","","","","","","","","",""],
         ["","","","","","","","","","","","","","","player2"]],
         p1x:0,
         p1y:0,
         p2x:14,
         p2y:14,
         p1bonus:"",
         p2bonus:"",
         p1character:"",
         p2character:"",
         p1LastKeyPressed:"down",
         p2LastKeyPressed:"up",
         turn:"x",
         characterSelect:false
      };
   },

   componentDidMount: function() {
      var turn = this.state.turn;
      var self = this;
      document.body.onkeyup = function(e){
         self.movePlayer(e);
      }
   },

   /*    componentDidMount: function() {
   var newtab = this.state.table;
   for (var i=0;i<15;i++) {
   var ligne = [];
   newtab.push(ligne);
	}
	for (var j=0;j<15;j++) {
	newtab[i].push("");
	}
	this.setState({table : newtab});
	},*/

movePlayer: function (evt) {
   var turn = this.state.turn;
   var table = this.state.table;
   var checkWall = false;
   var basicAttack = false;
   var alakazam;
   var attack = false;

   evt = evt || window.event;
   var keyCode = evt.keyCode;
   console.log(keyCode);

   if (turn == "x" && (keyCode == 81 || keyCode == 90 || keyCode == 68 || keyCode == 83 || keyCode == 70 || keyCode == 32)){
      var x = this.state.p1x;
      var y = this.state.p1y;
      var lastx = this.state.p1x;
      var lasty = this.state.p1y;
	  this.tentaSkillCase();

      switch (evt.keyCode) {
         case 81:
         // console.log("left");
         if (y<=0) {
            checkWall = true;
            break;
         }
         else if (table[x][y-1] == "player2case" || table[x][y-1] == "player2" || table[x][y-1] == "player2caseTentaSkill" || table[x][y-1] == "player2caseTentaSkillNul"){
            checkWall = true;
            break;
         }
         else if (table[x][y-1] == "bonus1" || table[x][y-1] == "bonus2" || table[x][y-1] == "bonus3"){
            this.setState({p1bonus:table[x][y-1]});
         }
         y--;
         this.setState({p1LastKeyPressed:"left"});
         break;

         case 68:
         //console.log("right");
         if (y>=14) {
            checkWall = true;
            break;
         }
         else if (table[x][y+1] == "player2case" || table[x][y+1] == "player2" || table[x][y+1] == "player2caseTentaSkill" || table[x][y+1] == "player2caseTentaSkillNul"){
            checkWall = true;
            break;
         }
         else if (table[x][y+1] == "bonus1" || table[x][y+1] == "bonus2" || table[x][y+1] == "bonus3"){
            this.setState({p1bonus:table[x][y+1]});
         }
         y++;
         this.setState({p1LastKeyPressed:"right"});
         break;

         case 90:
         //console.log("up");
         if (x<=0) {
            checkWall = true;
            break;
         }
         else if (table[x-1][y] == "player2case" || table[x-1][y] == "player2" || table[x-1][y] == "player2caseTentaSkill" || table[x-1][y] == "player2caseTentaSkillNul"){
            checkWall = true;
            break;
         }
         else if (table[x-1][y] == "bonus1" || table[x-1][y] == "bonus2" || table[x-1][y] == "bonus3"){
            this.setState({p1bonus:table[x-1][y]});
         }
         x--;
         this.setState({p1LastKeyPressed:"up"});
         break;

         case 83:
         //console.log("down");
         if (x>=14) {
            checkWall = true;
            break;
         }
         else if (table[x+1][y] == "player2case" || table[x+1][y] == "player2" || table[x+1][y] == "player2caseTentaSkill" || table[x+1][y] == "player2caseTentaSkillNul") {
            checkWall = true;
            break;
         }
         else if (table[x+1][y] == "bonus1" || table[x+1][y] == "bonus2" || table[x+1][y] == "bonus3"){
            this.setState({p1bonus:table[x+1][y]});
         }
         x++;
         this.setState({p1LastKeyPressed:"down"});
         break;

         //basic attack
		 case 32:
         basicAttack = this.basicAttack();
		 if(basicAttack == false){
			 checkWall = true;
		 }
		 else{checkWall = false;}
		 break;

		 //special attack
         case 70:
		 var character = this.state.p1character;
         this.firstAttack(character);
		 attack = true;
		 if(character == "alakazam"){
		 	checkWall = true;
			attack = false;
			alakazam = true;
		 }
      }
      console.log(basicAttack);
      if (basicAttack == true) {
         this.setState({turn:"y"});
         $('#moveSound')[0].play();
         this.changeImageP1();
		   this.backgroundPlayerCases(1);
         console.log("basicattack");
      }

      else if (checkWall == false && attack == true) {
         this.setState({p1x:x,p1y:y});
         table[x][y] = "player1";
         this.setState({turn:"y"});
		 this.backgroundPlayerCases(1);
		 this.setState({table:table});
    }
      else if (checkWall == false && attack == false) {
         this.setState({p1x:x,p1y:y});
         table[x][y] = "player1";
         table[lastx][lasty] = "player1case";
         this.setState({turn:"y"});
         $('#moveSound')[0].play();
         this.changeImageP1();
		 this.backgroundPlayerCases(1);
      }
	  else if (checkWall == true && attack == false  && alakazam == true) {
         table[lastx][lasty] = "player2case";
         this.setState({turn:"y"});
         $('#moveSound')[0].play();
         this.changeImageP1();
	     this.backgroundPlayerCases(1);
      }
   }

   else if (turn == "y" && (keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40 || keyCode == 96)){
      var x = this.state.p2x;
      var y = this.state.p2y;
      var lastx = this.state.p2x;
      var lasty = this.state.p2y;
      this.tentaSkillCase();
      switch (evt.keyCode) {
         case 37:
         //console.log("left");
         if (y<=0) {
            checkWall = true;
            break;
         }
         else if (table[x][y-1] == "player1case" || table[x][y-1] == "player1" || table[x][y-1] == "player1caseTentaSkill" || table[x][y-1] == "player1caseTentaSkillNul"){
            checkWall = true;
            break;
         }
         else if (table[x][y-1] == "bonus1" || table[x][y-1] == "bonus2" || table[x][y-1] == "bonus3"){
            this.setState({p2bonus:table[x][y-1]});
         }
         y--;
         this.setState({p2LastKeyPressed:"left"});
         break;

         case 39:
         //console.log("right");
         if (y>=14) {
            checkWall = true;
            break;
         }
         else if (table[x][y+1] == "player1case" || table[x][y+1] == "player1" || table[x][y+1] == "player1caseTentaSkill" || table[x][y+1] == "player1caseTentaSkillNul"){
            checkWall = true;
            break;
         }
         else if (table[x][y+1] == "bonus1" || table[x][y+1] == "bonus2" || table[x][y+1] == "bonus3"){
            this.setState({p2bonus:table[x][y+1]});
         }
         y++;
         this.setState({p2LastKeyPressed:"right"});
         break;

         case 38:
         //console.log("up");
         if (x<=0) {
            checkWall = true;
            break;
         }
         else if (table[x-1][y] == "player1case" || table[x-1][y] == "player1" || table[x-1][y] == "player1caseTentaSkill" || table[x-1][y] == "player1caseTentaSkillNul"){
            checkWall = true;
            break;
         }
         else if (table[x-1][y] == "bonus1" || table[x-1][y] == "bonus2" || table[x-1][y] == "bonus3"){
            this.setState({p2bonus:table[x-1][y]});
         }
         x--;
         this.setState({p2LastKeyPressed:"up"});
         break;

         case 40:
         //console.log("down");
         if (x>=14) {
            checkWall = true;
            break;
         }
         else if (table[x+1][y] == "player1case" || table[x+1][y] == "player1" || table[x+1][y] == "player1caseTentaSkill" || table[x+1][y] == "player1caseTentaSkillNul"){
            checkWall = true;
            break;
         }
         else if (table[x+1][y] == "bonus1" || table[x+1][y] == "bonus2" || table[x+1][y] == "bonus3"){
            this.setState({p2bonus:table[x+1][y]});
         }
         x++;
         this.setState({p2LastKeyPressed:"down"});
         break;

         case 96:
         var character = this.state.p2character;
         this.firstAttack(character);
		   attack = true;
		 if(character == "alakazam"){
		 	checkWall = true;
			attack = false;
			alakazam = true;
		 }
      }
      if (checkWall == false && attack == true) {
         this.setState({p2x:x,p2y:y});
         table[x][y] = "player2";
         this.setState({turn:"x"});
		 this.setState({table:table});
		 this.backgroundPlayerCases(2);
      }
      else if (checkWall == false && attack == false) {
         this.setState({p2x:x,p2y:y});
         table[x][y] = "player2";
         table[lastx][lasty] = "player2case";
         this.setState({turn:"x"});
         $('#moveSound')[0].play();
         this.changeImageP2();
	     this.backgroundPlayerCases(2);
      }
	  else if (checkWall == true && attack == false  && alakazam == true) {
		 console.log("ouioui");
         table[lastx][lasty] = "player2case";
         this.setState({turn:"x"});
         $('#moveSound')[0].play();
         this.changeImageP2();
	     this.backgroundPlayerCases(2);
      }
   }
   //this.end();
},

// checkEnnemyCase: function() {
//    var turn = this.state.turn;
//    var table = this.state.table;
//
//    var p1x = this.state.p1x;
//    var p1y = this.state.p1y;
//    var p2x = this.state.p2x;
//    var p2y = this.state.p2y;
//
//    if (turn == "x" && table[p1x][p1y+1] == "player2case") {
//       console.log("xturn");
//    }
//    else if (turn == "y"&& table[p1x][p1y+1] == "player1case") {
//       console.log("yturn");
//    }
// },
//
basicAttack: function() {
	console.log("in_function");
	var table = this.state.table;
	if(this.state.turn == "x"){
			var lastKeyPressed = this.state.p1LastKeyPressed;
			var playerId = 1;
			var px = this.state.p1x;
			var py = this.state.p1y;
		}
		else if(this.state.turn == "y"){
			var lastKeyPressed = this.state.p2LastKeyPressed;
			var playerId = 2;
			var px = this.state.p2x;
			var py = this.state.p2y;
		}

   if (lastKeyPressed=="down" && (table[px+1][py]=="case" || table[px+1][py]=="") && (table[px+2][py]=="case" || table[px+2][py]=="")){
	   console.log("in_if");
	table[px][py] = "player"+playerId+"case";
	table[px+1][py] = "player"+playerId+"case";
	table[px+2][py] = "player"+playerId;

   this.setState({p1x:4,p1y:4});
	this.setState({table:table});
	var basicAttack = true;
	return basicAttack;
}
},


firstAttack: function(character) {
	if(this.state.turn == "x"){
		var lastKeyPressed = this.state.p1LastKeyPressed;
		var playerId = 1;
		var px = this.state.p1x;
      	var py = this.state.p1y;
	}
	else if(this.state.turn == "y"){
		var lastKeyPressed = this.state.p2LastKeyPressed;
		var playerId = 2;
		var px = this.state.p2x;
      	var py = this.state.p2y;
	}


	if(character == "mewtwo") {
		  //défini aléatoirement position x et y
		  for (var i=5; i>0; i--) {
			  var x = random(15);
			  var y = random(15);
			  function random(n) {
				 return (Math.floor((n)*Math.random()));
			  }
			  console.log(x);
			  console.log(y);


				if (this.state.table[x][y]!=="player1" && this.state.table[x][y]!=="player2" && this.state.table[x][y]!=="player1case" && this.state.table[x][y]!=="player2case"){
						this.state.table[x][y] = 'player'+playerId+'case';
					 }
			}

		}

		else if(character == "machamp") {
		  //défini aléatoirement position x et y
		  for (var i=5; i>0; i--) {
			  var x = random(15);
			  var y = random(15);
			  function random(n) {
				 return (Math.floor((n)*Math.random()));
			  }
			  console.log(x);
			  console.log(y);

			  if(this.state.turn == "x"){
				  if (this.state.table[x][y]=="player2case"){
						this.state.table[x][y] = 'case';
					 }

			  }
			  else if(this.state.turn == "y"){
				 if (this.state.table[x][y]=="player1case"){
						this.state.table[x][y] = 'case';
					 }
			  }
			}

		}


	else if(character == "alakazam") {
		  //défini aléatoirement position x et y
		  var newtable=this.state.table;
			  var x = random(15);
			  var y = random(15);
			  function random(n) {
				 return (Math.floor((n)*Math.random()));
			  }
			  console.log(x);
			  console.log(y);


				if (this.state.table[x][y]!=="player1" && this.state.table[x][y]!=="player2" && this.state.table[x][y]!=="player1case" && this.state.table[x][y]!=="player2case"){
						if(this.state.turn == "x"){
							newtable[x][y] = "player1";
							this.setState({p1x:x,p1y:y});
						}
						else if(this.state.turn == "y"){
							newtable[x][y] = "player2";
							this.setState({p2x:x,p2y:y});
						}
					 }
					 else {
						 var character
						 if(this.state.turn == "x"){
						 	character = this.state.p1character;
						 }
						 else if(this.state.turn == "y"){
						 	character = this.state.p2character;
						 }
         				 this.firstAttack(character);
					 }
					 this.setState({table:newtable});
				}

	else if(character == "tentacruel") {
		console.log(px);
		console.log(py);
		if (lastKeyPressed == "left") {
            this.state.table[px][py-1] = 'player'+playerId+'caseTentaSkill';
         }
         else if (lastKeyPressed == "right") {
            this.state.table[px][py+1] = 'player'+playerId+'caseTentaSkill';
         }
         else if (lastKeyPressed == "up") {
            this.state.table[px-1][py] = 'player'+playerId+'caseTentaSkill';
         }
         else if (lastKeyPressed == "down") {
            this.state.table[px+1][py] = 'player'+playerId+'caseTentaSkill';
         }
	}
},

end: function() {
   var table = this.state.table;
   var endCount = 0;
   var p1Count = 0;
   var p2Count = 0;
   for (var i=0;i<15;i++) {
      for (var j=0;j<15;j++) {
         if (table[i][j] == "player1" || table[i][j] == "player2" || table[i][j] == "player1case" || table[i][j] == "player2case"){
            endCount++;
         }
         if (table[i][j] == "player1" || table[i][j] == "player1case"){
            p1Count++;
         }
         if (table[i][j] == "player2" || table[i][j] == "player2case"){
            p2Count++;
         }
      }
   }
   // console.log(endCount);
   // console.log("player1:" + p1Count);
   // console.log("player2:" + p2Count);
   if (endCount == 224) {
      console.log("end");
      if (p2Count > p1Count) {
         alert("player 2 wins");
      }
      else if (p1Count > p2Count) {
         alert("player 1 wins");
      }
      else {
         alert("égalité");
      }
   }
},

tentaSkillCase : function(){
	var val = random(4);
	function random(n) {
		return (Math.floor((n)*Math.random()));
	}
	if(val == 1){

   var columnLength = this.state.table.length;
   var lineLength = this.state.table[0].length;
   var newTab = this.state.table;
	for(var i=0; i<columnLength; i++)
	{
	  for(var j=0; j<lineLength; j++)
	  {
	  	 if (this.state.table[i][j] == "player1caseTentaSkill") {
            var val = random(4);
			function random(n) {
				return (Math.floor((n)*Math.random()));
			}

			if(val == 0){
				if(newTab[i+1][j] != "player1case" && newTab[i+1][j] != "player2case" && newTab[i+1][j] != "player1" && newTab[i+1][j] != "player2"){
					newTab[i+1][j] = "player1caseTentaSkill";
					newTab[i][j] = "player1caseTentaSkillNul";
					this.setState({table:newTab});
				}
			}
			else if(val == 1){
				if(newTab[i-1][j] != "player1case" && newTab[i-1][j] != "player2case" && newTab[i-1][j] != "player1" && newTab[i-1][j] != "player2"){
					newTab[i-1][j] = "player1caseTentaSkill";
					newTab[i][j] = "player1caseTentaSkillNul";
					this.setState({table:newTab});
				}
			}
			else if(val == 2){
				if(newTab[i][j+1] != "player1case" && newTab[i][j+1] != "player2case" && newTab[i][j+1] != "player1" && newTab[i][j+1] != "player2"){
					newTab[i][j+1] = "player1caseTentaSkill";
					newTab[i][j] = "player1caseTentaSkillNul";
					this.setState({table:newTab});
				}
			}
			else if(val == 3){
				if(newTab[i][j-1] != "player1case" && newTab[i][j-1] != "player2case" && newTab[i][j-1] != "player1" && newTab[i][j-1] != "player2"){
					newTab[i][j-1] = "player1caseTentaSkill";
					newTab[i][j] = "player1caseTentaSkillNul";
					this.setState({table:newTab});
				}
			}
         }

		 if (this.state.table[i][j] == "player2caseTentaSkill") {
            var val = random(4);
			function random(n) {
				return (Math.floor((n)*Math.random()));
			}

			if(val == 0){
				if(newTab[i+1][j] != "player1case" && newTab[i+1][j] != "player2case" && newTab[i+1][j] != "player1" && newTab[i+1][j] != "player2"){
					newTab[i+1][j] = "player2caseTentaSkill";
					newTab[i][j] = "player2caseTentaSkillNul";
					this.setState({table:newTab});
				}
			}
			else if(val == 1){
				if(newTab[i-1][j] != "player1case" && newTab[i-1][j] != "player2case" && newTab[i-1][j] != "player1" && newTab[i-1][j] != "player2"){
					newTab[i-1][j] = "player2caseTentaSkill";
					newTab[i][j] = "player2caseTentaSkillNul";
					this.setState({table:newTab});
				}
			}
			else if(val == 2){
				if(newTab[i][j+1] != "player1case" && newTab[i][j+1] !=" player2case" && newTab[i][j+1] != "player1" && newTab[i][j+1] != "player2"){
					newTab[i][j+1] = "player2caseTentaSkill";
					newTab[i][j] = "player2caseTentaSkillNul";
					this.setState({table:newTab});
				}
			}
			else if(val == 3){
				if(newTab[i][j-1] != "player1case" && newTab[i][j-1] != "player2case" && newTab[i][j-1] != "player1" && newTab[i][j-1] != "player2"){
					newTab[i][j-1] = "player2caseTentaSkill";
					newTab[i][j] = "player2caseTentaSkillNul";
					this.setState({table:newTab});
				}
			}
         }
	  }
	}
	}
},

changeImageP1: function() {
   var lastKeyPressed = this.state.p1LastKeyPressed;
   var val = this.state.p1character;
   if (lastKeyPressed == "down") {
      $('.player1').css("background-image", "url(img/"+val+"-down.png)");
   }
   else if (lastKeyPressed == "up") {
      $('.player1').css("background-image", "url(img/"+val+"-up.png)");
   }
   else if (lastKeyPressed == "left") {
      $('.player1').css("background-image", "url(img/"+val+"-left.png)");
   }
   else if (lastKeyPressed == "right") {
      $('.player1').css("background-image", "url(img/"+val+"-right.png)");
   }
},

changeImageP2: function() {
   var lastKeyPressed = this.state.p2LastKeyPressed;
   var val = this.state.p2character;
   if (lastKeyPressed == "down") {
      $('.player2').css("background-image", "url(img/"+val+"-down.png)");
   }
   else if (lastKeyPressed == "up") {
      $('.player2').css("background-image", "url(img/"+val+"-up.png)");
   }
   else if (lastKeyPressed == "left") {
      $('.player2').css("background-image", "url(img/"+val+"-left.png)");
   }
   else if (lastKeyPressed == "right") {
      $('.player2').css("background-image", "url(img/"+val+"-right.png)");
   }
},

backgroundPlayerCases: function(val) {
	var character
	if(val == 1){
		character = this.state.p1character;
	}
	else if(val == 2){
		character = this.state.p2character;
	}
	   var playercase = $('.player'+val+'case');

	   if (character == "victreebel"){
	   		playercase.css("background", "#609838");
	   }
	   else if (character == "mewtwo"){
	   		playercase.css("background", "#B858D0");
	   }
	   else if (character == "alakazam"){
	   		playercase.css("background", "#D8A830");
	   }
	   else if (character == "machamp"){
	   		playercase.css("background", "#808090");
	   }
	   else if (character == "tentacruel"){
	   		playercase.css("background", "#78C0f0");
	   }
	   else if (character == "charizard"){
	   		playercase.css("background", "#C85828");
	   }
},

randomBonus: function() {
   if (Math.random() * 100 < 25) {
	  //défini aléatoirement position x et y
      var x = random(15);
      var y = random(15);
      function random(n) {
         return (Math.floor((n)*Math.random()));
      }

      if (Math.random() * 100 < 33.33333333) {
         if (this.state.table[x][y]!=="player1" && this.state.table[x][y]!=="player2" && this.state.table[x][y]!=="player1case" && this.state.table[x][y]!=="player2case"){
            this.state.table[x][y] = "bonus1";
         }
      }
      else if (Math.random() * 100 < 100) {
         if (this.state.table[x][y]!=="player1" && this.state.table[x][y]!=="player2" && this.state.table[x][y]!=="player1case" && this.state.table[x][y]!=="player2case"){
            this.state.table[x][y] = "bonus2";
         }
      }
      else {
         if (this.state.table[x][y]!=="player1" && this.state.table[x][y]!=="player2" && this.state.table[x][y]!=="player1case" && this.state.table[x][y]!=="player2case"){
            this.state.table[x][y] = "bonus3";
         }
      }
   }
},

makeFirstImageP1: function() {
   $("#sectionP1 img[src='img/mewtwo-selected.png']").attr("src","img/mewtwo.png");
   $("#sectionP1 img[src='img/charizard-selected.png']").attr("src","img/charizard.png");
   $("#sectionP1 img[src='img/victreebel-selected.png']").attr("src","img/victreebel.png");
   $("#sectionP1 img[src='img/machamp-selected.png']").attr("src","img/machamp.png");
   $("#sectionP1 img[src='img/alakazam-selected.png']").attr("src","img/alakazam.png");
   $("#sectionP1 img[src='img/tentacruel-selected.png']").attr("src","img/tentacruel.png");
},
makeFirstImageP2: function() {
   $("#sectionP2 img[src='img/mewtwo-selected.png']").attr("src","img/mewtwo.png");
   $("#sectionP2 img[src='img/charizard-selected.png']").attr("src","img/charizard.png");
   $("#sectionP2 img[src='img/victreebel-selected.png']").attr("src","img/victreebel.png");
   $("#sectionP2 img[src='img/machamp-selected.png']").attr("src","img/machamp.png");
   $("#sectionP2 img[src='img/alakazam-selected.png']").attr("src","img/alakazam.png");
   $("#sectionP2 img[src='img/tentacruel-selected.png']").attr("src","img/tentacruel.png");
},

player1ChooseMewtwo: function() {
   var newPlayer1Character = this.state.p1character;
   newPlayer1Character = "mewtwo";
   this.setState({p1character:newPlayer1Character});
   this.makeFirstImageP1();
   $("#sectionP1 img[src='img/mewtwo.png']").attr("src","img/mewtwo-selected.png");
   $('#mewtwoSound')[0].play();
},
player1ChooseTentacruel: function() {
   var newPlayer1Character = this.state.p1character;
   newPlayer1Character = "tentacruel";
   this.setState({p1character:newPlayer1Character});
   this.makeFirstImageP1();
   $("#sectionP1 img[src='img/tentacruel.png']").attr("src","img/tentacruel-selected.png");
   $('#tentacruelSound')[0].play();
},
player1ChooseAlakazam: function() {
   var newPlayer1Character = this.state.p1character;
   newPlayer1Character = "alakazam";
   this.setState({p1character:newPlayer1Character});
   this.makeFirstImageP1();
   $("#sectionP1 img[src='img/alakazam.png']").attr("src","img/alakazam-selected.png");
   $('#alakazamSound')[0].play();
},
player1ChooseMachamp: function() {
   var newPlayer1Character = this.state.p1character;
   newPlayer1Character = "machamp";
   this.setState({p1character:newPlayer1Character});
   this.makeFirstImageP1();
   $("#sectionP1 img[src='img/machamp.png']").attr("src","img/machamp-selected.png");
   $('#machampSound')[0].play();
},
player1ChooseVictreebel: function() {
   var newPlayer1Character = this.state.p1character;
   newPlayer1Character = "victreebel";
   this.setState({p1character:newPlayer1Character});
   this.makeFirstImageP1();
   $("#sectionP1 img[src='img/victreebel.png']").attr("src","img/victreebel-selected.png");
   $('#victreebelSound')[0].play();
},
player1ChooseCharizard: function() {
   var newPlayer1Character = this.state.p1character;
   newPlayer1Character = "charizard";
   this.setState({p1character:newPlayer1Character});
   this.makeFirstImageP1();
   $("#sectionP1 img[src='img/charizard.png']").attr("src","img/charizard-selected.png");
   $('#charizardSound')[0].play();
},

player2ChooseMewtwo: function() {
   var newPlayer2Character = this.state.p2character;
   newPlayer2Character = "mewtwo";
   this.setState({p2character:newPlayer2Character});
   this.makeFirstImageP2();
   $("#sectionP2 img[src='img/mewtwo.png']").attr("src","img/mewtwo-selected.png");
   $('#mewtwoSound')[0].play();
},
player2ChooseTentacruel: function() {
   var newPlayer2Character = this.state.p2character;
   newPlayer2Character = "tentacruel";
   this.setState({p2character:newPlayer2Character});
   this.makeFirstImageP2();
   $("#sectionP2 img[src='img/tentacruel.png']").attr("src","img/tentacruel-selected.png");
   $('#tentacruelSound')[0].play();
},
player2ChooseAlakazam: function() {
   var newPlayer2Character = this.state.p2character;
   newPlayer2Character = "alakazam";
   this.setState({p2character:newPlayer2Character});
   this.makeFirstImageP2();
   $("#sectionP2 img[src='img/alakazam.png']").attr("src","img/alakazam-selected.png");
   $('#alakazamSound')[0].play();
},
player2ChooseMachamp: function() {
   var newPlayer2Character = this.state.p2character;
   newPlayer2Character = "machamp";
   this.setState({p2character:newPlayer2Character});
   this.makeFirstImageP2();
   $("#sectionP2 img[src='img/machamp.png']").attr("src","img/machamp-selected.png");
   $('#machampSound')[0].play();
},
player2ChooseVictreebel: function() {
   var newPlayer2Character = this.state.p2character;
   newPlayer2Character = "victreebel";
   this.setState({p2character:newPlayer2Character});
   this.makeFirstImageP2();
   $("#sectionP2 img[src='img/victreebel.png']").attr("src","img/victreebel-selected.png");
   $('#victreebelSound')[0].play();
},
player2ChooseCharizard: function() {
   var newPlayer2Character = this.state.p2character;
   newPlayer2Character = "charizard";
   this.setState({p2character:newPlayer2Character});
   this.makeFirstImageP2();
   $("#sectionP2 img[src='img/charizard.png']").attr("src","img/charizard-selected.png");
   $('#charizardSound')[0].play();
},

playerChoiceEnd: function() {
   $("#playerChoice").addClass("hide");
   var imageP1 = this.state.p1character;
   var imageP2 = this.state.p2character;
   $('.player1').css("background-image", "url(img/"+imageP1+"-down.png)");
   $('.player2').css("background-image", "url(img/"+imageP2+"-up.png)");
   this.setState({characterSelect:true});
},

render: function() {
   var now = Date.now()
   var terrain=[];
   var columnLength = this.state.table.length;
   var lineLength = this.state.table[0].length;

   for (var i=0; i<columnLength; i++) {
      var ligne = []
      for (var j=0; j<lineLength; j++) {
         var block;
         var key = "case-"+ i+ "-"+j
         // var classNames = {case:true};
         // classNames[this.state.table[i][j]] = true
         // block = <div className={classNames} "case player1case"></div>
         if (this.state.table[i][j] == "player1case") {
            block = <div key={key} className="case player1case"></div>
         }
		 else if (this.state.table[i][j] == "player1caseTentaSkill") {
            block = <div key={key} className="case player1 tentaSkill"></div>
         }
		 else if (this.state.table[i][j] == "player1caseTentaSkillNul") {
            block = <div key={key} className="case player1 tentaSkillNul"></div>
         }
         else if (this.state.table[i][j] == "player2case" ) {
            block = <div key={key} className="case player2case"></div>
         }
		 else if (this.state.table[i][j] == "player2caseTentaSkill") {
            block = <div key={key} className="case player2 tentaSkill"></div>
         }
		 else if (this.state.table[i][j] == "player2caseTentaSkillNul") {
            block = <div key={key} className="case player2 tentaSkillNul"></div>
         }
         else if (this.state.table[i][j] == "player1") {
            block = <div key={key} className="case player1"></div>
         }
         else if (this.state.table[i][j] == "player2") {
            block = <div key={key} className="case player2"></div>
         }
		 else if (this.state.table[i][j] == "case") {
            block = <div key={key} className="case"></div>
         }
         else if (this.state.table[i][j] == "bonus1") {
            block = <div key={key} className="case"><div className="case bonus1"></div></div>
         }
         else if (this.state.table[i][j] == "bonus2") {
            block = <div key={key} className="case"><div className="case bonus2"></div></div>
         }
         else if (this.state.table[i][j] == "bonus3") {
            block = <div key={key} className="case"><div className="case bonus3"></div></div>
         }
         else {
            block = <div key={key} className="case"></div>
         }
         ligne.push(block);
      };
      terrain.push(<div key={"ligne"+i}>{ligne}</div>);
   };

   if (this.state.characterSelect == false) {
      var selectionPerso =(<div id="playerChoice">
      <h2>Select your character</h2>
      <p>Player 1</p>
         <section id="sectionP1">
            <div onClick={this.player1ChooseMewtwo}>
               <p>Mewtwo</p>
               <img src="img/mewtwo.png"/>
            </div>
            <div onClick={this.player1ChooseCharizard}>
               <p>Charizard</p>
               <img src="img/charizard.png"/>
            </div>
            <div onClick={this.player1ChooseTentacruel}>
               <p>Tentacruel</p>
               <img src="img/tentacruel.png"/>
            </div>
            <div onClick={this.player1ChooseMachamp}>
               <p>Machamp</p>
               <img src="img/machamp.png"/>
            </div>
            <div onClick={this.player1ChooseAlakazam}>
               <p>Alakazam</p>
               <img src="img/alakazam.png"/>
            </div>
            <div onClick={this.player1ChooseVictreebel}>
               <p>Victreebel</p>
               <img src="img/victreebel.png"/>
            </div>
         </section>

         <p>Player 2</p>
         <section id="sectionP2">
            <div onClick={this.player2ChooseMewtwo}>
               <p>Mewtwo</p>
               <img src="img/mewtwo.png"/>
            </div>
            <div onClick={this.player2ChooseCharizard}>
               <p>Charizard</p>
               <img src="img/charizard.png"/>
            </div>
            <div onClick={this.player2ChooseTentacruel}>
               <p>Tentacruel</p>
               <img src="img/tentacruel.png"/>
            </div>
            <div onClick={this.player2ChooseMachamp}>
               <p>Machamp</p>
               <img src="img/machamp.png"/>
            </div>
            <div onClick={this.player2ChooseAlakazam}>
               <p>Alakazam</p>
               <img src="img/alakazam.png"/>
            </div>
            <div onClick={this.player2ChooseVictreebel}>
               <p>Victreebel</p>
               <img src="img/victreebel.png"/>
            </div>
         </section>
         <input type="button" value="Fight" onClick={this.playerChoiceEnd}></input>
      </div>);
   }

   var playerTurn;
   if(this.state.turn == "x") {
      playerTurn = (
         <p className="playerTurn">player 1</p>
      )
   }
   else if(this.state.turn == "y") {
      playerTurn = (
         <p className="playerTurn">player 2</p>
      )
   }

   console.log( Date.now() -now)

   //
   // <div className="wrapper">
   // {playerTurn}
   // <div className="terrain">
   // {terrain}
   //    {selectionPerso}
   // </div>
   // </div>

   return (
      <div className="wrapper">
      {playerTurn}
      <div className="terrain">
         <div>{terrain}</div>

         {selectionPerso}
      </div>
      </div>
   );
}
})

ReactDOM.render(
   <Game/>,
   document.getElementById('container')
);
