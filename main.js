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
         p1BasicCoolDown:3,
         p1SpecialCoolDown:5,
         p2BasicCoolDown:3,
         p2SpecialCoolDown:5,
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
   console.log("keycode" +keyCode);

   if (turn == "x" && (keyCode == 81 || keyCode == 90 || keyCode == 68 || keyCode == 83 || keyCode == 69 || keyCode == 82)){

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
         else if (table[x][y-1] == "bonus"){
            this.coolDownBonuses("x");
         }
         y--;
         this.windowsPlayer("player2");
         this.randomBonus();
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
         else if (table[x][y+1] == "bonus"){
            this.coolDownBonuses("x");
         }
         y++;
         this.windowsPlayer("player2");
         this.randomBonus();
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
         else if (table[x-1][y] == "bonus"){
            this.coolDownBonuses("x");
         }
         x--;
         this.windowsPlayer("player2");
         this.randomBonus();
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
         else if (table[x+1][y] == "bonus"){
            this.coolDownBonuses("x");
         }
         x++;
         this.windowsPlayer("player2");
         this.randomBonus();
         this.setState({p1LastKeyPressed:"down"});
         break;

         //basic attack
         case 69:
         basicAttack = this.basicAttack();
         if(basicAttack == false){
            checkWall = true;
         }
         else{checkWall = false;}
         this.windowsPlayer("player2");
         this.randomBonus();
         break;

         //special attack
         case 82:
         var character = this.state.p1character;
         var firstAttack = this.firstAttack(character);
         console.log(firstAttack);
         attack = true;
         this.windowsPlayer("player2");
         this.randomBonus();
         if(character == "alakazam"){
            checkWall = true;
            attack = false;
            alakazam = true;
         }
      }
      if (firstAttack == true) {
         this.setState({turn:"x"});
         this.windowsPlayer("player1");
      }
      else if (basicAttack == true) {
         this.setState({turn:"y"});
         $('#moveSound')[0].play();
         this.changeImageP1();
         this.backgroundPlayerCases(1);
         console.log("basicattack");
      }
      else if (basicAttack == "wait") {
         this.setState({turn:"x"});
         this.windowsPlayer("player1");
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
         table[lastx][lasty] = "player1case";
         this.setState({turn:"y"});
         $('#moveSound')[0].play();
         this.changeImageP1();
         this.backgroundPlayerCases(1);
      }
      if (table[x+1][y+1] == "player2case" && table[x-1][y+1] == "player2case" && table[x+1][y-1] == "player2case" && table[x-1][y-1] == "player2case" && table[x][y+1] == "player2case" && table[x][y-1] == "player2case" && table[x+1][y] == "player2case" && table[x-1][y] == "player2case") {
         alert("player 1 loose");
      }
      if (firstAttack != true && basicAttack != "wait") {
         var SpecialCoolDown = this.state.p1SpecialCoolDown;
         var BasicCoolDown = this.state.p1BasicCoolDown;
         this.randomBonus();
         if(SpecialCoolDown > 0){
            this.setState({p1SpecialCoolDown:SpecialCoolDown-1});
         }
         if(BasicCoolDown > 0){
            this.setState({p1BasicCoolDown:BasicCoolDown-1});
         }
      }
   }

   else if (turn == "y" && (keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40 || keyCode == 97 || keyCode == 98)){

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
         else if (table[x][y-1] == "bonus"){
            this.coolDownBonuses("y");
         }
         this.windowsPlayer("player1");
         this.randomBonus();
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
         else if (table[x][y+1] == "bonus"){
            this.coolDownBonuses("y");
         }
         this.windowsPlayer("player1");
         this.randomBonus();
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
         else if (table[x-1][y] == "bonus"){
            this.coolDownBonuses("y");
         }
         this.windowsPlayer("player1");
         this.randomBonus();
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
         else if (table[x+1][y] == "bonus"){
            this.coolDownBonuses("y");
         }
         this.windowsPlayer("player1");
         this.randomBonus();
         x++;
         this.setState({p2LastKeyPressed:"down"});
         break;

         //basic attack
         case 97:
         basicAttack = this.basicAttack();
         // console.log("basic attack" +basicAttack);
         if(basicAttack == false){
            checkWall = true;
         }
         else{checkWall = false;}
         this.windowsPlayer("player1");
         this.randomBonus();
         break;

         case 98:
         var character = this.state.p2character;
         var firstAttack = this.firstAttack(character);
         console.log(firstAttack);
         attack = true;
         if(character == "alakazam"){
            checkWall = true;
            attack = false;
            alakazam = true;
         }
         this.windowsPlayer("player1");
         this.randomBonus();
      }
      if (firstAttack == true) {
         this.setState({turn:"y"});
         this.windowsPlayer("player2");
      }
      else if (basicAttack == true) {
         this.setState({turn:"x"});
         $('#moveSound')[0].play();
         this.changeImageP2();
         this.backgroundPlayerCases(2);
         console.log("basicattack");
      }
      else if (basicAttack == "wait") {
         this.setState({turn:"y"});
         this.windowsPlayer("player2");
      }
      else if (checkWall == false && attack == true) {
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
         table[lastx][lasty] = "player2case";
         this.setState({turn:"x"});
         $('#moveSound')[0].play();
         this.changeImageP2();
         this.backgroundPlayerCases(2);
      }
      if (firstAttack != true && basicAttack != "wait") {
         var SpecialCoolDown = this.state.p2SpecialCoolDown;
         var BasicCoolDown = this.state.p2BasicCoolDown;
         if(SpecialCoolDown > 0){
            this.setState({p2SpecialCoolDown:SpecialCoolDown-1});
         }
         if(BasicCoolDown > 0){
            this.setState({p2BasicCoolDown:BasicCoolDown-1});
         }
      }
   }
   this.end();
   this.end2();
},


end2: function() {
   setTimeout(function () {
   },1000)
   var musicAudio = $('#musicSound')[0];
   var musicIco = $('#musicImg');
   var howToPlayButton = $('#howToButton');
   var howToPlayContent = $('#howToContent');
   var table = this.state.table;
   var turn = this.state.turn;
   var x;
   var y;
   var character;
   if (turn == "x") {
      x = this.state.p1x;
      y = this.state.p1y;
      character = this.state.p2character;
      if (table[x][y+1] == "player2case" && table[x][y-1] == "player2case" && table[x+1][y] == "player2case" && table[x-1][y] == "player2case") {
         $(".playerWindow").hide();
         $('.player2win').removeClass('hide');
         $(".player2win img").attr("src","img/"+character+".png");
         $("#"+character+"Sound")[0].play();
         console.log("player2win");
         musicAudio.pause();
         musicIco.hide();
         howToPlayButton.hide();
         howToPlayContent.hide();
      }
   }
   else if (turn == "y") {
      x = this.state.p2x;
      y = this.state.p2y;
      character = this.state.p1character;
      if (table[x][y+1] == "player1case" && table[x][y-1] == "player1case" && table[x+1][y] == "player1case" && table[x-1][y] == "player1case") {
         $(".playerWindow").hide();
         $('.player1win').removeClass('hide');
         $(".player1win img").attr("src","img/"+character+".png");
         $("#"+character+"Sound")[0].play();
         console.log("player1win");
         musicAudio.pause();
         musicIco.hide();
         howToPlayButton.hide();
         howToPlayContent.hide();
      }
   }
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
//    if (turn == "x" && table[p1x][p1y+1] == "player1case") {
//       console.log("xturn");
//    }
//    else if (turn == "y"&& table[p1x][p1y+1] == "player1case") {
//       console.log("yturn");
//    }
// },
//
basicAttack: function() {
   var table = this.state.table;
   if(this.state.turn == "x"){
      var lastKeyPressed = this.state.p1LastKeyPressed;
      var playerId = 1;
      var px = this.state.p1x;
      var py = this.state.p1y;
      var coolDown = this.state.p1BasicCoolDown;
   }
   else if(this.state.turn == "y"){
      var lastKeyPressed = this.state.p2LastKeyPressed;
      var playerId = 2;
      var px = this.state.p2x;
      var py = this.state.p2y;
      var coolDown = this.state.p2BasicCoolDown;
   }

   if (coolDown == 0) {
      if(this.state.turn == "x"){
         console.log("lolX");
         this.setState({p1BasicCoolDown:3});
      }
      else if(this.state.turn == "y"){
         console.log("lolY");
         this.setState({p2BasicCoolDown:3});
      }
      if(this.state.turn == "x"){
         if (lastKeyPressed=="down" && (table[px+1][py]!=="player2" || table[px+1][py]!=="player2case")  && (table[px+2][py]!=="player2case" || table[px+2][py]!=="player2")){
            table[px][py] = "player"+playerId+"case";
            table[px+1][py] = "player"+playerId+"case";
            table[px+2][py] = "player"+playerId;
            if (table[px+1][py] == "bonus" || table[px+2][py] == "bonus"){
               this.coolDownBonuses("x");
            }
            // var obj = {}
            // obj["table"]=table;
            // obj[p+playerId+x]=px+2;
            // this.setState(obj);
            this.setState({p1x:px+2});
            this.setState({table:table});
            var basicAttack = true;
            $('#tackleSound')[0].play();
            return basicAttack;
         }
         else if(lastKeyPressed=="up" && (table[px-1][py]!=="player2" || table[px-1][py]!=="player2case")  && (table[px-2][py]!=="player2case" || table[px-2][py]!=="player2")){
            table[px][py] = "player"+playerId+"case";
            table[px-1][py] = "player"+playerId+"case";
            table[px-2][py] = "player"+playerId;
            if (table[px-1][py] == "bonus" || table[px-2][py] == "bonus"){
               this.coolDownBonuses("x");
            }
            this.setState({p1x:px-2});
            this.setState({table:table});
            var basicAttack = true;
            $('#tackleSound')[0].play();
            return basicAttack;
         }
         else if(lastKeyPressed=="left" && (table[px][py-1]!=="player2" || table[px][py-1]!=="player2case")  && (table[px][py-2]!=="player2case" || table[px][py-2]!=="player2")){
            table[px][py] = "player"+playerId+"case";
            table[px][py-1] = "player"+playerId+"case";
            table[px][py-2] = "player"+playerId;
            if (table[px][py-1] == "bonus" || table[px][py-2] == "bonus"){
               this.coolDownBonuses("x");
            }
            this.setState({p1y:py-2});
            this.setState({table:table});
            var basicAttack = true;
            $('#tackleSound')[0].play();
            return basicAttack;
         }
         else if(lastKeyPressed=="right" && (table[px][py+1]!=="player2" || table[px][py+1]!=="player2case")  && (table[px][py+2]!=="player2case" || table[px][py+2]!=="player2")){
            table[px][py] = "player"+playerId+"case";
            table[px][py+1] = "player"+playerId+"case";
            table[px][py+2] = "player"+playerId;
            if (table[px][py+1] == "bonus" || table[px][py+2] == "bonus"){
               this.coolDownBonuses("x");
            }
            this.setState({p1y:py+2});
            this.setState({table:table});
            var basicAttack = true;
            $('#tackleSound')[0].play();
            return basicAttack;
         }
      }
      else if(this.state.turn == "y"){
         if (lastKeyPressed=="down" && (table[px+1][py]!=="player1" || table[px+1][py]!=="player1case")  && (table[px+2][py]!=="player1case" || table[px+2][py]!=="player1")){
            table[px][py] = "player"+playerId+"case";
            table[px+1][py] = "player"+playerId+"case";
            table[px+2][py] = "player"+playerId;
            if (table[px+1][py] == "bonus" || table[px+2][py] == "bonus"){
               this.coolDownBonuses("y");
            }
            // var obj = {}
            // obj["table"]=table;
            // obj[p+playerId+x]=px+2;
            // this.setState(obj);
            this.setState({p2x:px+2});
            this.setState({table:table});
            var basicAttack = true;
            return basicAttack;
         }
         else if(lastKeyPressed=="up" && (table[px-1][py]!=="player1" || table[px-1][py]!=="player1case")  && (table[px-2][py]!=="player1case" || table[px-2][py]!=="player1")){
            table[px][py] = "player"+playerId+"case";
            table[px-1][py] = "player"+playerId+"case";
            table[px-2][py] = "player"+playerId;
            if (table[px-1][py] == "bonus" || table[px-2][py] == "bonus"){
               this.coolDownBonuses("y");
            }
            this.setState({p2x:px-2});
            this.setState({table:table});
            var basicAttack = true;
            return basicAttack;
         }
         else if(lastKeyPressed=="left" && (table[px][py-1]!=="player1" || table[px][py-1]!=="player1case")  && (table[px][py-2]!=="player1case" || table[px][py-2]!=="player1")){
            table[px][py] = "player"+playerId+"case";
            table[px][py-1] = "player"+playerId+"case";
            table[px][py-2] = "player"+playerId;
            if (table[px][py-1] == "bonus" || table[px][py-2] == "bonus"){
               this.coolDownBonuses("y");
            }
            this.setState({p2y:py-2});
            this.setState({table:table});
            var basicAttack = true;
            return basicAttack;
         }
         else if(lastKeyPressed=="right" && (table[px][py+1]!=="player1" || table[px][py+1]!=="player1case")  && (table[px][py+2]!=="player1case" || table[px][py+2]!=="player1")){
            table[px][py] = "player"+playerId+"case";
            table[px][py+1] = "player"+playerId+"case";
            table[px][py+2] = "player"+playerId;
            if (table[px][py+1] == "bonus" || table[px][py+2] == "bonus"){
               this.coolDownBonuses("y");
            }
            this.setState({p2y:py+2});
            this.setState({table:table});
            var basicAttack = true;
            return basicAttack;
         }
      }
   }

   else{
      alert("this attack is not ready");
      table[px][py] = "player"+playerId;
      console.log("table"+table[px][py]);
      this.setState({table:table});
      var basicAttack = "wait";
      return basicAttack;
   }
},


firstAttack: function(character) {
   if(this.state.turn == "x"){
      var lastKeyPressed = this.state.p1LastKeyPressed;
      var playerId = 1;
      var px = this.state.p1x;
      var py = this.state.p1y;
      var coolDown = this.state.p1SpecialCoolDown;
   }
   else if(this.state.turn == "y"){
      var lastKeyPressed = this.state.p2LastKeyPressed;
      var playerId = 2;
      var px = this.state.p2x;
      var py = this.state.p2y;
      var coolDown = this.state.p2SpecialCoolDown;
   }

   if(character == "mewtwo") {
      if (coolDown == 0) {
         if(this.state.turn == "x"){
            this.setState({p1SpecialCoolDown:10});
         }
         else if(this.state.turn == "y"){
            this.setState({p2SpecialCoolDown:10});
         }
         $('#mewtwoSound')[0].play();
         //défini aléatoirement position x et y
         for (var i=18; i>0; i--) {
            var x = random(15);
            var y = random(15);
            function random(n) {
               return (Math.floor((n)*Math.random()));
            }

            if (this.state.table[x][y]!=="player1" && this.state.table[x][y]!=="player2" && this.state.table[x][y]!=="player1case" && this.state.table[x][y]!=="player2case"){
               this.setTable(x,y,'player'+playerId+'case');
            }
         }
      }
      else{
         alert("this attack is not ready");
         var miss = true;
         return miss;
      }
   }

   else if(character == "machamp") {
      //défini aléatoirement position x et y
      if (coolDown == 0) {
         if(this.state.turn == "x"){
            this.setState({p1SpecialCoolDown:6});
         }
         else if(this.state.turn == "y"){
            this.setState({p2SpecialCoolDown:6});
         }
         $('#machampSound')[0].play();

         var newtable=this.state.table;
         if (lastKeyPressed == "left") {
            if(this.getTable(px,py-1)!=="player1" && this.getTable(px,py-1)!=="player2") this.setTable(px,py-1,'player'+playerId+'case');
            if(this.getTable(px,py-2)!=="player1" && this.getTable(px,py-2)!=="player2") this.setTable(px,py-2,'player'+playerId+'case');
            if(this.getTable(px,py-3)!=="player1" && this.getTable(px,py-3)!=="player2") this.setTable(px,py-3,'player'+playerId+'case');
            if(this.getTable(px-1,py-1)!=="player1" && this.getTable(px-1,py-1)!=="player2") this.setTable(px-1,py-1,'player'+playerId+'case');
            if(this.getTable(px-2,py-1)!=="player1" && this.getTable(px-2,py-1)!=="player2") this.setTable(px-2,py-1,'player'+playerId+'case');
            if(this.getTable(px+1,py-1)!=="player1" && this.getTable(px+1,py-1)!=="player2") this.setTable(px+1,py-1,'player'+playerId+'case');
            if(this.getTable(px+2,py-1)!=="player1" && this.getTable(px+2,py-1)!=="player2") this.setTable(px+2,py-1,'player'+playerId+'case');
            if(this.getTable(px+1,py-2)!=="player1" && this.getTable(px+1,py-2)!=="player2") this.setTable(px+1,py-2,'player'+playerId+'case');
            if(this.getTable(px-1,py-2)!=="player1" && this.getTable(px-1,py-2)!=="player2") this.setTable(px-1,py-2,'player'+playerId+'case');
         }
         else if (lastKeyPressed == "right") {
            if(this.getTable(px,py+1)!=="player1" && this.getTable(px,py+1)!=="player2") this.setTable(px,py+1,'player'+playerId+'case');
            if(this.getTable(px,py+2)!=="player1" && this.getTable(px,py+2)!=="player2") this.setTable(px,py+2,'player'+playerId+'case');
            if(this.getTable(px,py+3)!=="player1" && this.getTable(px,py+3)!=="player2") this.setTable(px,py+3,'player'+playerId+'case');
            if(this.getTable(px-1,py+1)!=="player1" && this.getTable(px-1,py+1)!=="player2") this.setTable(px-1,py+1,'player'+playerId+'case');
            if(this.getTable(px-2,py+1)!=="player1" && this.getTable(px-2,py+1)!=="player2") this.setTable(px-2,py+1,'player'+playerId+'case');
            if(this.getTable(px+1,py+1)!=="player1" && this.getTable(px+1,py+1)!=="player2") this.setTable(px+1,py+1,'player'+playerId+'case');
            if(this.getTable(px+2,py+1)!=="player1" && this.getTable(px+2,py+1)!=="player2") this.setTable(px+2,py+1,'player'+playerId+'case');
            if(this.getTable(px+1,py+2)!=="player1" && this.getTable(px+1,py+2)!=="player2") this.setTable(px+1,py+2,'player'+playerId+'case');
            if(this.getTable(px-1,py+2)!=="player1" && this.getTable(px-1,py+2)!=="player2") this.setTable(px-1,py+2,'player'+playerId+'case');
         }
         else if (lastKeyPressed == "down") {
            if(this.getTable(px+1,py)!=="player1" && this.getTable(px+1,py)!=="player2") this.setTable(px+1,py,'player'+playerId+'case');
            if(this.getTable(px+2,py)!=="player1" && this.getTable(px+2,py)!=="player2") this.setTable(px+2,py,'player'+playerId+'case');
            if(this.getTable(px+3,py)!=="player1" && this.getTable(px+3,py)!=="player2") this.setTable(px+3,py,'player'+playerId+'case');
            if(this.getTable(px+1,py-1)!=="player1" && this.getTable(px+1,py-1)!=="player2") this.setTable(px+1,py-1,'player'+playerId+'case');
            if(this.getTable(px+1,py-2)!=="player1" && this.getTable(px+1,py-2)!=="player2") this.setTable(px+1,py-2,'player'+playerId+'case');
            if(this.getTable(px+1,py+1)!=="player1" && this.getTable(px+1,py+1)!=="player2") this.setTable(px+1,py+1,'player'+playerId+'case');
            if(this.getTable(px+1,py+2)!=="player1" && this.getTable(px+1,py+2)!=="player2") this.setTable(px+1,py+2,'player'+playerId+'case');
            if(this.getTable(px+2,py+1)!=="player1" && this.getTable(px+2,py+1)!=="player2") this.setTable(px+2,py+1,'player'+playerId+'case');
            if(this.getTable(px+2,py-1)!=="player1" && this.getTable(px+2,py-1)!=="player2") this.setTable(px+2,py-1,'player'+playerId+'case');
         }
         else if (lastKeyPressed == "up") {
            if(this.getTable(px-1,py)!=="player1" && this.getTable(px-1,py)!=="player2") this.setTable(px-1,py,'player'+playerId+'case');
            if(this.getTable(px-2,py)!=="player1" && this.getTable(px-2,py)!=="player2") this.setTable(px-2,py,'player'+playerId+'case');
            if(this.getTable(px-3,py)!=="player1" && this.getTable(px-3,py)!=="player2") this.setTable(px-3,py,'player'+playerId+'case');
            if(this.getTable(px-1,py-1)!=="player1" && this.getTable(px-1,py-1)!=="player2") this.setTable(px-1,py-1,'player'+playerId+'case');
            if(this.getTable(px-1,py-2)!=="player1" && this.getTable(px-1,py-2)!=="player2") this.setTable(px-1,py-2,'player'+playerId+'case');
            if(this.getTable(px-1,py+1)!=="player1" && this.getTable(px-1,py+1)!=="player2") this.setTable(px-1,py+1,'player'+playerId+'case');
            if(this.getTable(px-1,py+2)!=="player1" && this.getTable(px-1,py+2)!=="player2") this.setTable(px-1,py+2,'player'+playerId+'case');
            if(this.getTable(px-2,py+1)!=="player1" && this.getTable(px-2,py+1)!=="player2") this.setTable(px-2,py+1,'player'+playerId+'case');
            if(this.getTable(px-2,py-1)!=="player1" && this.getTable(px-2,py-1)!=="player2") this.setTable(px-2,py-1,'player'+playerId+'case');
         }
      }
      else{
         alert("this attack is not ready");
         var miss = true;
         return miss;
      }
   }

   else if(character == "alakazam") {
      if (coolDown == 0) {
         if(this.state.turn == "x"){
            this.setState({p1SpecialCoolDown:5});
         }
         else if(this.state.turn == "y"){
            this.setState({p2SpecialCoolDown:5});
         }
         $('#alakazamSound')[0].play();
         //défini aléatoirement position x et y
         var newtable=this.state.table;
         var x = random(15);
         var y = random(15);
         function random(n) {
            return (Math.floor((n)*Math.random()));
         }
         if (this.getTable(x,y)!=="player1" && this.getTable(x,y)!=="player2" && this.getTable(x,y)!=="player1case" && this.getTable(x,y)!=="player2case"){

            this.setTable(x,y,'player'+playerId);
            this.setTable(x+1,y+1,'player'+playerId+'case');
            this.setTable(x-1,y+1,'player'+playerId+'case');
            this.setTable(x+1,y-1,'player'+playerId+'case');
            this.setTable(x-1,y-1,'player'+playerId+'case');
            this.setTable(x,y+1,'player'+playerId+'case');
            this.setTable(x,y-1,'player'+playerId+'case');
            this.setTable(x+1,y,'player'+playerId+'case');
            this.setTable(x-1,y,'player'+playerId+'case');

            if(this.state.turn == "x"){
               this.setState({p1x:x,p1y:y});
            }
            else if(this.state.turn == "y"){
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
      else{
         alert("this attack is not ready");
         var miss = true;
         return miss;
      }
   }

   else if(character == "tentacruel") {
      if (coolDown == 0) {
         if(this.state.turn == "x"){
            this.setState({p1SpecialCoolDown:5});
         }
         else if(this.state.turn == "y"){
            this.setState({p2SpecialCoolDown:5});
         }
         $('#tentacruelSound')[0].play();

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
      else{
         alert("this attack is not ready");
         var miss = true;
         return miss;
      }
   }

   else if(character == "charizard") {
      if (coolDown == 0) {
         if(this.state.turn == "x"){
            this.setState({p1SpecialCoolDown:6});
         }
         else if(this.state.turn == "y"){
            this.setState({p2SpecialCoolDown:6});
         }
         $('#charizardSound')[0].play();

         var newtable=this.state.table;
         if (lastKeyPressed == "left") {
            if(this.getTable(px,py-5)!=="player1" && this.getTable(px,py-5)!=="player2") this.setTable(px,py-5,'player'+playerId+'case');
            if(this.getTable(px,py-4)!=="player1" && this.getTable(px,py-4)!=="player2") this.setTable(px,py-4,'player'+playerId+'case');
            if(this.getTable(px,py-3)!=="player1" && this.getTable(px,py-3)!=="player2") this.setTable(px,py-3,'player'+playerId+'case');
            if(this.getTable(px-1,py-5)!=="player1" && this.getTable(px-1,py-5)!=="player2") this.setTable(px-1,py-5,'player'+playerId+'case');
            if(this.getTable(px-1,py-4)!=="player1" && this.getTable(px-1,py-4)!=="player2") this.setTable(px-1,py-4,'player'+playerId+'case');
            if(this.getTable(px-1,py-3)!=="player1" && this.getTable(px-1,py-3)!=="player2") this.setTable(px-1,py-3,'player'+playerId+'case');
            if(this.getTable(px+1,py-5)!=="player1" && this.getTable(px+1,py-5)!=="player2") this.setTable(px+1,py-5,'player'+playerId+'case');
            if(this.getTable(px+1,py-4)!=="player1" && this.getTable(px+1,py-4)!=="player2") this.setTable(px+1,py-4,'player'+playerId+'case');
            if(this.getTable(px+1,py-3)!=="player1" && this.getTable(px+1,py-3)!=="player2") this.setTable(px+1,py-3,'player'+playerId+'case');
         }
         else if (lastKeyPressed == "right") {
            if(this.getTable(px,py+5)!=="player1" && this.getTable(px,py+5)!=="player2") this.setTable(px,py+5,'player'+playerId+'case');
            if(this.getTable(px,py+4)!=="player1" && this.getTable(px,py+4)!=="player2") this.setTable(px,py+4,'player'+playerId+'case');
            if(this.getTable(px,py+3)!=="player1" && this.getTable(px,py+3)!=="player2") this.setTable(px,py+3,'player'+playerId+'case');
            if(this.getTable(px-1,py+5)!=="player1" && this.getTable(px-1,py+5)!=="player2") this.setTable(px-1,py+5,'player'+playerId+'case');
            if(this.getTable(px-1,py+4)!=="player1" && this.getTable(px-1,py+4)!=="player2") this.setTable(px-1,py+4,'player'+playerId+'case');
            if(this.getTable(px-1,py+3)!=="player1" && this.getTable(px-1,py+3)!=="player2") this.setTable(px-1,py+3,'player'+playerId+'case');
            if(this.getTable(px+1,py+5)!=="player1" && this.getTable(px+1,py+5)!=="player2") this.setTable(px+1,py+5,'player'+playerId+'case');
            if(this.getTable(px+1,py+4)!=="player1" && this.getTable(px+1,py+4)!=="player2") this.setTable(px+1,py+4,'player'+playerId+'case');
            if(this.getTable(px+1,py+3)!=="player1" && this.getTable(px+1,py+3)!=="player2") this.setTable(px+1,py+3,'player'+playerId+'case');
         }
         else if (lastKeyPressed == "down") {
            if(this.getTable(px+5,py)!=="player1" && this.getTable(px+5,py)!=="player2") this.setTable(px+5,py,'player'+playerId+'case');
            if(this.getTable(px+4,py)!=="player1" && this.getTable(px+4,py)!=="player2") this.setTable(px+4,py,'player'+playerId+'case');
            if(this.getTable(px+3,py)!=="player1" && this.getTable(px+3,py)!=="player2") this.setTable(px+3,py,'player'+playerId+'case');
            if(this.getTable(px+5,py-1)!=="player1" && this.getTable(px+5,py-1)!=="player2") this.setTable(px+5,py-1,'player'+playerId+'case');
            if(this.getTable(px+4,py-1)!=="player1" && this.getTable(px+4,py-1)!=="player2") this.setTable(px+4,py-1,'player'+playerId+'case');
            if(this.getTable(px+3,py-1)!=="player1" && this.getTable(px+3,py-1)!=="player2") this.setTable(px+3,py-1,'player'+playerId+'case');
            if(this.getTable(px+5,py+1)!=="player1" && this.getTable(px+5,py+1)!=="player2") this.setTable(px+5,py+1,'player'+playerId+'case');
            if(this.getTable(px+4,py+1)!=="player1" && this.getTable(px+4,py+1)!=="player2") this.setTable(px+4,py+1,'player'+playerId+'case');
            if(this.getTable(px+3,py+1)!=="player1" && this.getTable(px+3,py+1)!=="player2") this.setTable(px+3,py+1,'player'+playerId+'case');
         }
         else if (lastKeyPressed == "up") {
            if(this.getTable(px-5,py)!=="player1" && this.getTable(px-5,py)!=="player2") this.setTable(px-5,py,'player'+playerId+'case');
            if(this.getTable(px-4,py)!=="player1" && this.getTable(px-4,py)!=="player2") this.setTable(px-4,py,'player'+playerId+'case');
            if(this.getTable(px-3,py)!=="player1" && this.getTable(px-3,py)!=="player2") this.setTable(px-3,py,'player'+playerId+'case');
            if(this.getTable(px-5,py-1)!=="player1" && this.getTable(px-5,py-1)!=="player2") this.setTable(px-5,py-1,'player'+playerId+'case');
            if(this.getTable(px-4,py-1)!=="player1" && this.getTable(px-4,py-1)!=="player2") this.setTable(px-4,py-1,'player'+playerId+'case');
            if(this.getTable(px-3,py-1)!=="player1" && this.getTable(px-3,py-1)!=="player2") this.setTable(px-3,py-1,'player'+playerId+'case');
            if(this.getTable(px-5,py+1)!=="player1" && this.getTable(px-5,py+1)!=="player2") this.setTable(px-5,py+1,'player'+playerId+'case');
            if(this.getTable(px-4,py+1)!=="player1" && this.getTable(px-4,py+1)!=="player2") this.setTable(px-4,py+1,'player'+playerId+'case');
            if(this.getTable(px-3,py+1)!=="player1" && this.getTable(px-3,py+1)!=="player2") this.setTable(px-3,py+1,'player'+playerId+'case');
         }
      }
      else{
         alert("this attack is not ready");
         var miss = true;
         return miss;
      }
   }

   else if(character == "victreebel") {
      if (coolDown == 0) {
         if(this.state.turn == "x"){
            this.setState({p1SpecialCoolDown:6});
         }
         else if(this.state.turn == "y"){
            this.setState({p2SpecialCoolDown:6});
         }
         $('#victreebelSound')[0].play();

         var newtable=this.state.table;
         if(this.getTable(px,py-1)!=="player1" && this.getTable(px,py-1)!=="player2") this.setTable(px,py-1,'player'+playerId+'case');
         if(this.getTable(px,py-2)!=="player1" && this.getTable(px,py-2)!=="player2") this.setTable(px,py-2,'player'+playerId+'case');
         if(this.getTable(px,py-3)!=="player1" && this.getTable(px,py-3)!=="player2") this.setTable(px,py-3,'player'+playerId+'case');
         if(this.getTable(px,py+1)!=="player1" && this.getTable(px,py+1)!=="player2") this.setTable(px,py+1,'player'+playerId+'case');
         if(this.getTable(px,py+2)!=="player1" && this.getTable(px,py+2)!=="player2") this.setTable(px,py+2,'player'+playerId+'case');
         if(this.getTable(px,py+3)!=="player1" && this.getTable(px,py+3)!=="player2") this.setTable(px,py+3,'player'+playerId+'case');
         if(this.getTable(px+1,py)!=="player1" && this.getTable(px+1,py)!=="player2") this.setTable(px+1,py,'player'+playerId+'case');
         if(this.getTable(px+2,py)!=="player1" && this.getTable(px+2,py)!=="player2") this.setTable(px+2,py,'player'+playerId+'case');
         if(this.getTable(px+3,py)!=="player1" && this.getTable(px+3,py)!=="player2") this.setTable(px+3,py,'player'+playerId+'case');
         if(this.getTable(px-1,py)!=="player1" && this.getTable(px-1,py)!=="player2") this.setTable(px-1,py,'player'+playerId+'case');
         if(this.getTable(px-2,py)!=="player1" && this.getTable(px-2,py)!=="player2") this.setTable(px-2,py,'player'+playerId+'case');
         if(this.getTable(px-3,py)!=="player1" && this.getTable(px-3,py)!=="player2") this.setTable(px-3,py,'player'+playerId+'case');
      }
      else{
         alert("this attack is not ready");
         var miss = true;
         return miss;
      }
   }
},

//permet de fixer l'erreur des cases qui n'existent pas
setTable:function(x,y,val){
   var table = this.state.table;
   if (typeof table[x]!=="undefined" && typeof table[x][y]!=="undefined") {
      table[x][y] = val;
      this.setState({table:table});
   }
},

getTable:function(x,y){
   var table = this.state.table;
   if (typeof table[x]!=="undefined" && typeof table[x][y]!=="undefined") {
      console.log("in");
      return table[x][y];
   }
   else{
      return false;
   }
},

coolDownBonuses:function(player){
   $('#bonusesSound')[0].play();
   if (player == "x") {
      var SpecialCoolDown = this.state.p1SpecialCoolDown;
      var BasicCoolDown = this.state.p1BasicCoolDown;
      if(SpecialCoolDown > 5){
         this.setState({p1SpecialCoolDown:SpecialCoolDown-5});
      }
      else {
         this.setState({p1SpecialCoolDown:0});
      }

      if(BasicCoolDown > 5){
         this.setState({p1BasicCoolDown:BasicCoolDown-5});
      }
      else {
         this.setState({p1BasicCoolDown:0});
      }
   }

   else if (player == "y") {
      var SpecialCoolDown = this.state.p2SpecialCoolDown;
      var BasicCoolDown = this.state.p2BasicCoolDown;
      if(SpecialCoolDown > 5){
         this.setState({p2SpecialCoolDown:SpecialCoolDown-5});
      }
      else {
         this.setState({p2SpecialCoolDown:0});
      }

      if(BasicCoolDown > 5){
         this.setState({p2BasicCoolDown:BasicCoolDown-5});
      }
      else {
         this.setState({p2BasicCoolDown:0});
      }
   }
},

end: function() {
   var musicIco = $('#musicImg');
   var musicAudio = $('#musicSound')[0];
   var howToPlayButton = $('#howToButton');
   var howToPlayContent = $('#howToContent');
   var table = this.state.table;
   var endCount = 0;
   var p1Count = 0;
   var p2Count = 0;

   for (var i=0;i<15;i++) {
      for (var j=0;j<15;j++) {
         if (table[i][j] == "player1" || table[i][j] == "player2" || table[i][j] == "player1case" || table[i][j] == "player2case" || table[i][j] == "player2caseTentaSkill" || table[i][j] == "player2caseTentaSkillNul" || table[i][j] == "player1caseTentaSkill" || table[i][j] == "player1caseTentaSkillNul"){
            endCount++;
         }
         if (table[i][j] == "player1" || table[i][j] == "player1case" || table[i][j] == "player1caseTentaSkill" || table[i][j] == "player1caseTentaSkillNul"){
            p1Count++;
         }
         if (table[i][j] == "player2" || table[i][j] == "player2case" || table[i][j] == "player2caseTentaSkill" || table[i][j] == "player2caseTentaSkillNul"){
            p2Count++;
         }
      }
   }

   if (endCount == 225) {
      console.log("end");
      if (p2Count > p1Count) {
         var character = this.state.p2character;
         $(".playerWindow").hide();
         $('.player2win').removeClass('hide');
         $(".player2win img").attr("src","img/"+character+".png");
         $("#"+character+"Sound")[0].play();
         console.log("player2win");
         musicAudio.pause();
         musicIco.hide();
         howToPlayButton.hide();
         howToPlayContent.hide();
      }
      else if (p1Count > p2Count) {
         var character = this.state.p1character;
         $(".playerWindow").hide();
         $('.player1win').removeClass('hide');
         $(".player1win img").attr("src","img/"+character+".png");
         $("#"+character+"Sound")[0].play();
         console.log("player1win");
         musicAudio.pause();
         musicIco.hide();
         howToPlayButton.hide();
         howToPlayContent.hide();
      }
      else {
         alert("equality - press f5 to restart");
         musicAudio.pause();
         musicIco.hide();
         howToPlayButton.hide();
         howToPlayContent.hide();
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

      if (Math.random() * 100 < 20) {
         if (this.state.table[x][y]!=="player1" && this.state.table[x][y]!=="player2" && this.state.table[x][y]!=="player1case" && this.state.table[x][y]!=="player2case"){
            var newtab = this.state.table;
            newtab[x][y] = "bonus";
            $('#bonusesPopSound')[0].play();
            this.setState({table:newtab});
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
   var p2character = this.state.p2character;
   if (p2character == "mewtwo") {
      alert("mewtwo is already taken, please select another character");
   }
   else {
      var newPlayer1Character = this.state.p1character;
      newPlayer1Character = "mewtwo";
      this.setState({p1character:newPlayer1Character});
      this.makeFirstImageP1();
      $("#sectionP1 img[src='img/mewtwo.png']").attr("src","img/mewtwo-selected.png");
      $('#mewtwoSound')[0].play();
   }
},
player1ChooseTentacruel: function() {
   var p2character = this.state.p2character;
   if (p2character == "tentacruel") {
      alert("tentacruel is already taken, please select another character");
   }
   else {
      var newPlayer1Character = this.state.p1character;
      newPlayer1Character = "tentacruel";
      this.setState({p1character:newPlayer1Character});
      this.makeFirstImageP1();
      $("#sectionP1 img[src='img/tentacruel.png']").attr("src","img/tentacruel-selected.png");
      $('#tentacruelSound')[0].play();
   }
},
player1ChooseAlakazam: function() {
   var p2character = this.state.p2character;
   if (p2character == "alakazam") {
      alert("alakazam is already taken, please select another character");
   }
   else {
      var newPlayer1Character = this.state.p1character;
      newPlayer1Character = "alakazam";
      this.setState({p1character:newPlayer1Character});
      this.makeFirstImageP1();
      $("#sectionP1 img[src='img/alakazam.png']").attr("src","img/alakazam-selected.png");
      $('#alakazamSound')[0].play();
   }
},
player1ChooseMachamp: function() {
   var p2character = this.state.p2character;
   if (p2character == "machamp") {
      alert("machamp is already taken, please select another character");
   }
   else {
      var newPlayer1Character = this.state.p1character;
      newPlayer1Character = "machamp";
      this.setState({p1character:newPlayer1Character});
      this.makeFirstImageP1();
      $("#sectionP1 img[src='img/machamp.png']").attr("src","img/machamp-selected.png");
      $('#machampSound')[0].play();
   }
},
player1ChooseVictreebel: function() {
   var p2character = this.state.p2character;
   if (p2character == "victreebel") {
      alert("victreebel is already taken, please select another character");
   }
   else {
      var newPlayer1Character = this.state.p1character;
      newPlayer1Character = "victreebel";
      this.setState({p1character:newPlayer1Character});
      this.makeFirstImageP1();
      $("#sectionP1 img[src='img/victreebel.png']").attr("src","img/victreebel-selected.png");
      $('#victreebelSound')[0].play();
   }
},
player1ChooseCharizard: function() {
   var p2character = this.state.p2character;
   if (p2character == "charizard") {
      alert("charizard is already taken, please select another character");
   }
   else {
      var newPlayer1Character = this.state.p1character;
      newPlayer1Character = "charizard";
      this.setState({p1character:newPlayer1Character});
      this.makeFirstImageP1();
      $("#sectionP1 img[src='img/charizard.png']").attr("src","img/charizard-selected.png");
      $('#charizardSound')[0].play();
   }
},

player2ChooseMewtwo: function() {
   var p1character = this.state.p1character;
   if (p1character == "mewtwo") {
      alert("mewtwo is already taken, please select another character");
   }
   else {
      var newPlayer2Character = this.state.p2character;
      newPlayer2Character = "mewtwo";
      this.setState({p2character:newPlayer2Character});
      this.makeFirstImageP2();
      $("#sectionP2 img[src='img/mewtwo.png']").attr("src","img/mewtwo-selected.png");
      $('#mewtwoSound')[0].play();
   }
},
player2ChooseTentacruel: function() {
   var p1character = this.state.p1character;
   if (p1character == "tentacruel") {
      alert("tentacruel is already taken, please select another character");
   }
   else {
      var newPlayer2Character = this.state.p2character;
      newPlayer2Character = "tentacruel";
      this.setState({p2character:newPlayer2Character});
      this.makeFirstImageP2();
      $("#sectionP2 img[src='img/tentacruel.png']").attr("src","img/tentacruel-selected.png");
      $('#tentacruelSound')[0].play();
   }
},
player2ChooseAlakazam: function() {
   var p1character = this.state.p1character;
   if (p1character == "alakazam") {
      alert("alakazam is already taken, please select another character");
   }
   else {
      var newPlayer2Character = this.state.p2character;
      newPlayer2Character = "alakazam";
      this.setState({p2character:newPlayer2Character});
      this.makeFirstImageP2();
      $("#sectionP2 img[src='img/alakazam.png']").attr("src","img/alakazam-selected.png");
      $('#alakazamSound')[0].play();
   }
},
player2ChooseMachamp: function() {
   var p1character = this.state.p1character;
   if (p1character == "machamp") {
      alert("machamp is already taken, please select another character");
   }
   else {
      var newPlayer2Character = this.state.p2character;
      newPlayer2Character = "machamp";
      this.setState({p2character:newPlayer2Character});
      this.makeFirstImageP2();
      $("#sectionP2 img[src='img/machamp.png']").attr("src","img/machamp-selected.png");
      $('#machampSound')[0].play();
   }
},
player2ChooseVictreebel: function() {
   var p1character = this.state.p1character;
   if (p1character == "victreebel") {
      alert("victreebel is already taken, please select another character");
   }
   else {
      var newPlayer2Character = this.state.p2character;
      newPlayer2Character = "victreebel";
      this.setState({p2character:newPlayer2Character});
      this.makeFirstImageP2();
      $("#sectionP2 img[src='img/victreebel.png']").attr("src","img/victreebel-selected.png");
      $('#victreebelSound')[0].play();
   }
},
player2ChooseCharizard: function() {
   var p1character = this.state.p1character;
   if (p1character == "charizard") {
      alert("charizard is already taken, please select another character");
   }
   else {
      var newPlayer2Character = this.state.p2character;
      newPlayer2Character = "charizard";
      this.setState({p2character:newPlayer2Character});
      this.makeFirstImageP2();
      $("#sectionP2 img[src='img/charizard.png']").attr("src","img/charizard-selected.png");
      $('#charizardSound')[0].play();
   }
},

playerChoiceEnd: function() {
   var p1character = this.state.p1character;
   var p2character = this.state.p2character;
   if (p1character != "" && p1character != "undefined" && p2character != "" && p2character != "undefined") {
      $("#playerChoice").addClass("hide");
      var imageP1 = this.state.p1character;
      var imageP2 = this.state.p2character;
      $('.player1').css("background-image", "url(img/"+imageP1+"-down.png)");
      $('.player2').css("background-image", "url(img/"+imageP2+"-up.png)");
      this.setState({characterSelect:true});
      this.windowsPlayer();
   }
   else {
      alert("please select characters");
   }
},

windowsPlayer: function(val) {
   $('.playerWindow').addClass("hide");
   console.log("val"+val);
   if(val == undefined || val == "player1"){
      var specialCounter = this.state.p1SpecialCoolDown;
      var basicCounter = this.state.p1BasicCoolDown;
      var character = this.state.p1character;
      var windows;
      if(character == "charizard"){
         windows = $('.charizardWindow');
      }
      else if(character == "mewtwo"){
         windows = $('.mewtwoWindow');
      }
      else if(character == "victreebel"){
         windows = $('.victreebelWindow');
      }
      else if(character == "alakazam"){
         windows = $('.alakazamWindow');
      }
      else if(character == "machamp"){
         windows = $('.machampWindow');
      }
      else if(character == "tentacruel"){
         windows = $('.tentacruelWindow');
      }
      if (specialCounter <= 0) {
         windows.children(".specialAttackWindow").children(".counter").css("background", "#27ae60");
      }
      if (specialCounter > 0) {
         windows.children(".specialAttackWindow").children(".counter").css("background", "#c0392b");
      }
      if (basicCounter <= 0) {
         windows.children(".basicAttackWindow").children(".counter").css("background", "#27ae60");
      }
      if (basicCounter > 0) {
         windows.children(".basicAttackWindow").children(".counter").css("background", "#c0392b");
      }
      windows.children(".specialAttackWindow").children(".counter").html("<span>"+specialCounter+"</span>turns left");
      windows.children(".basicAttackWindow").children(".counter").html("<span>"+basicCounter+"</span>turns left");
      windows.removeClass('hide');
   }

   else if(val == "player2"){
      var specialCounter = this.state.p2SpecialCoolDown;
      var basicCounter = this.state.p2BasicCoolDown;
      var character = this.state.p2character;
      var windows;
      if(character == "charizard"){
         windows = $('.charizardWindow');
      }
      else if(character == "mewtwo"){
         windows = $('.mewtwoWindow');
      }
      else if(character == "victreebel"){
         windows = $('.victreebelWindow');
      }
      else if(character == "alakazam"){
         windows = $('.alakazamWindow');
      }
      else if(character == "machamp"){
         windows = $('.machampWindow');
      }
      else if(character == "tentacruel"){
         windows = $('.tentacruelWindow');
      }
      if (specialCounter <= 0) {
         windows.children(".specialAttackWindow").children(".counter").css("background", "#27ae60");
      }
      if (specialCounter > 0) {
         windows.children(".specialAttackWindow").children(".counter").css("background", "#c0392b");
      }
      if (basicCounter <= 0) {
         windows.children(".basicAttackWindow").children(".counter").css("background", "#27ae60");
      }
      if (basicCounter > 0) {
         windows.children(".basicAttackWindow").children(".counter").css("background", "#c0392b");
      }
      windows.children(".specialAttackWindow").children(".counter").html("<span>"+specialCounter+"</span>turns left");
      windows.children(".basicAttackWindow").children(".counter").html("<span>"+basicCounter+"</span>turns left");
      windows.removeClass('hide');
   }
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
         else if (this.state.table[i][j] == "bonus") {
            block = <div key={key} className="case"><div className="case bonus1"></div></div>
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

   var perso1Win = (
      <div className="hide player1win">
      <h2>Player 1 wins</h2>
      <p>Press F5 to restart</p>
      <img src=""/>
      </div>
   )

   var perso2Win = (
      <div className="hide player2win">
      <h2>Player 2 wins</h2>
      <p>Press F5 to restart</p>
      <img src=""/>
      </div>
   )

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
      <div className="terrain">
      <div>{terrain}</div>
      {perso1Win}
      {perso2Win}
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
