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
         if (lastKeyPressed=="down" && (table[px+1][py]=="case" || table[px+1][py]=="") && (table[px+2][py]=="case" || table[px+2][py]=="")){
            table[px][py] = "player"+playerId+"case";
            table[px+1][py] = "player"+playerId+"case";
            table[px+2][py] = "player"+playerId;
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
         else if(lastKeyPressed=="up" && (table[px-1][py]=="case" || table[px-1][py]=="") && (table[px-2][py]=="case" || table[px-2][py]=="")){
            table[px][py] = "player"+playerId+"case";
            table[px-1][py] = "player"+playerId+"case";
            table[px-2][py] = "player"+playerId;
            this.setState({p1x:px-2});
            this.setState({table:table});
            var basicAttack = true;
            $('#tackleSound')[0].play();
            return basicAttack;
         }
         else if(lastKeyPressed=="left" && (table[px][py-1]=="case" || table[px][py-1]=="") && (table[px][py-2]=="case" || table[px][py-2]=="")){
            table[px][py] = "player"+playerId+"case";
            table[px][py-1] = "player"+playerId+"case";
            table[px][py-2] = "player"+playerId;
            this.setState({p1y:py-2});
            this.setState({table:table});
            var basicAttack = true;
            $('#tackleSound')[0].play();
            return basicAttack;
         }
         else if(lastKeyPressed=="right" && (table[px][py+1]=="case" || table[px][py+1]=="") && (table[px][py+2]=="case" || table[px][py+2]=="")){
            table[px][py] = "player"+playerId+"case";
            table[px][py+1] = "player"+playerId+"case";
            table[px][py+2] = "player"+playerId;
            this.setState({p1y:py+2});
            this.setState({table:table});
            var basicAttack = true;
            $('#tackleSound')[0].play();
            return basicAttack;
         }
      }
      else if(this.state.turn == "y"){
         if (lastKeyPressed=="down" && (table[px+1][py]=="case" || table[px+1][py]=="") && (table[px+2][py]=="case" || table[px+2][py]=="")){
            table[px][py] = "player"+playerId+"case";
            table[px+1][py] = "player"+playerId+"case";
            table[px+2][py] = "player"+playerId;
            // var obj = {}
            // obj["table"]=table;
            // obj[p+playerId+x]=px+2;
            // this.setState(obj);
            this.setState({p2x:px+2});
            this.setState({table:table});
            var basicAttack = true;
            return basicAttack;
         }
         else if(lastKeyPressed=="up" && (table[px-1][py]=="case" || table[px-1][py]=="") && (table[px-2][py]=="case" || table[px-2][py]=="")){
            table[px][py] = "player"+playerId+"case";
            table[px-1][py] = "player"+playerId+"case";
            table[px-2][py] = "player"+playerId;
            this.setState({p2x:px-2});
            this.setState({table:table});
            var basicAttack = true;
            return basicAttack;
         }
         else if(lastKeyPressed=="left" && (table[px][py-1]=="case" || table[px][py-1]=="") && (table[px][py-2]=="case" || table[px][py-2]=="")){
            table[px][py] = "player"+playerId+"case";
            table[px][py-1] = "player"+playerId+"case";
            table[px][py-2] = "player"+playerId;
            this.setState({p2y:py-2});
            this.setState({table:table});
            var basicAttack = true;
            return basicAttack;
         }
         else if(lastKeyPressed=="right" && (table[px][py+1]=="case" || table[px][py+1]=="") && (table[px][py+2]=="case" || table[px][py+2]=="")){
            table[px][py] = "player"+playerId+"case";
            table[px][py+1] = "player"+playerId+"case";
            table[px][py+2] = "player"+playerId;
            this.setState({p2y:py+2});
            this.setState({table:table});
            var basicAttack = true;
            return basicAttack;
         }
      }
   }

   else{
      alert("not ready, you pass your turn");
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
         alert("not ready, you pass your turn");
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
         alert("not ready, you pass your turn");
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
         console.log(x);
         console.log(y);

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
         alert("not ready, you pass your turn");
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
         alert("not ready, you pass your turn");
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
            if(this.getTable(px-5,py+1)!=="player1" && this.getTable(px-5,py-1)!=="player2") this.setTable(px-5,py-1,'player'+playerId+'case');
            if(this.getTable(px-4,py+1)!=="player1" && this.getTable(px-4,py-1)!=="player2") this.setTable(px-4,py-1,'player'+playerId+'case');
            if(this.getTable(px-3,py+1)!=="player1" && this.getTable(px-3,py-1)!=="player2") this.setTable(px-3,py-1,'player'+playerId+'case');
         }
      }
      else{
         alert("not ready, you pass your turn");
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
         alert("not ready, you pass your turn");
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
