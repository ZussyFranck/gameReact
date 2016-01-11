playerUseBonus: function() {
   console.log("bonususe");
   var turn = this.state.turn;
   if (turn == "x") {
      var bonus = this.state.p1bonus;
      var lastKeyPressed = this.state.p1LastKeyPressed;
      var x = this.state.p1x;
      var y = this.state.p1y;
      var xSave = this.state.p2x;
      var ySave = this.state.p2y;

      if (bonus == "bonus1") {
         console.log("player1 use "+bonus);
         if (lastKeyPressed == "left") {
            this.state.table[x][y-5] = "player1case";
            this.state.table[x][y-4] = "player1case";
            this.state.table[x][y-3] = "player1case";
            this.state.table[x-1][y-5] = "player1case";
            this.state.table[x-1][y-4] = "player1case";
            this.state.table[x-1][y-3] = "player1case";
            this.state.table[x+1][y-5] = "player1case";
            this.state.table[x+1][y-4] = "player1case";
            this.state.table[x+1][y-3] = "player1case";
         }
         else if (lastKeyPressed == "right") {
            this.state.table[x][y+5] = "player1case";
            this.state.table[x][y+4] = "player1case";
            this.state.table[x][y+3] = "player1case";
            this.state.table[x-1][y+5] = "player1case";
            this.state.table[x-1][y+4] = "player1case";
            this.state.table[x-1][y+3] = "player1case";
            this.state.table[x+1][y+5] = "player1case";
            this.state.table[x+1][y+4] = "player1case";
            this.state.table[x+1][y+3] = "player1case";
         }
         else if (lastKeyPressed == "up") {
            this.state.table[x-5][y] = "player1case";
            this.state.table[x-4][y] = "player1case";
            this.state.table[x-3][y] = "player1case";
            this.state.table[x-5][y-1] = "player1case";
            this.state.table[x-4][y-1] = "player1case";
            this.state.table[x-3][y-1] = "player1case";
            this.state.table[x-5][y+1] = "player1case";
            this.state.table[x-4][y+1] = "player1case";
            this.state.table[x-3][y+1] = "player1case";
         }
         else if (lastKeyPressed == "down") {
            this.state.table[x+5][y] = "player1case";
            this.state.table[x+4][y] = "player1case";
            this.state.table[x+3][y] = "player1case";
            this.state.table[x+5][y-1] = "player1case";
            this.state.table[x+4][y-1] = "player1case";
            this.state.table[x+3][y-1] = "player1case";
            this.state.table[x+5][y+1] = "player1case";
            this.state.table[x+4][y+1] = "player1case";
            this.state.table[x+3][y+1] = "player1case";
         }
         this.state.table[xSave][ySave] = "player2";
      }


      else if (bonus == "bonus2") {
         console.log("player1 use "+bonus);
         if (lastKeyPressed == "left") {
            this.state.table[x][y-8] = "player1case";
            this.state.table[x][y-7] = "player1case";
            this.state.table[x][y-6] = "player1case";
            this.state.table[x][y-5] = "player1case";
            this.state.table[x][y-4] = "player1case";
            this.state.table[x][y-3] = "player1case";
         }
         else if (lastKeyPressed == "right") {
            this.state.table[x][y+8] = "player1case";
            this.state.table[x][y+7] = "player1case";
            this.state.table[x][y+6] = "player1case";
            this.state.table[x][y+5] = "player1case";
            this.state.table[x][y+4] = "player1case";
            this.state.table[x][y+3] = "player1case";
         }
         else if (lastKeyPressed == "up") {
            this.state.table[x-8][y] = "player1case";
            this.state.table[x-7][y] = "player1case";
            this.state.table[x-6][y] = "player1case";
            this.state.table[x-5][y] = "player1case";
            this.state.table[x-4][y] = "player1case";
            this.state.table[x-3][y] = "player1case";
         }
         else if (lastKeyPressed == "down") {
            this.state.table[x+8][y] = "player1case";
            this.state.table[x+7][y] = "player1case";
            this.state.table[x+6][y] = "player1case";
            this.state.table[x+5][y] = "player1case";
            this.state.table[x+4][y] = "player1case";
            this.state.table[x+3][y] = "player1case";
         }
         this.state.table[xSave][ySave] = "player2";
      }


      else if (bonus == "bonus3") {
         console.log("player1 use "+bonus);
      }
   }
   else if (turn == "y") {
      var bonus = this.state.p2bonus;
      var lastKeyPressed = this.state.p2LastKeyPressed;
      var x = this.state.p2x;
      var y = this.state.p2y;
      var xSave = this.state.p1x;
      var ySave = this.state.p1y;

      if (bonus == "bonus1") {
         console.log("player2 use "+bonus);
         if (lastKeyPressed == "left") {
            this.state.table[x][y-5] = "player2case";
            this.state.table[x][y-4] = "player2case";
            this.state.table[x][y-3] = "player2case";
            this.state.table[x-1][y-5] = "player2case";
            this.state.table[x-1][y-4] = "player2case";
            this.state.table[x-1][y-3] = "player2case";
            this.state.table[x+1][y-5] = "player2case";
            this.state.table[x+1][y-4] = "player2case";
            this.state.table[x+1][y-3] = "player2case";
         }
         else if (lastKeyPressed == "right") {
            this.state.table[x][y+5] = "player2case";
            this.state.table[x][y+4] = "player2case";
            this.state.table[x][y+3] = "player2case";
            this.state.table[x-1][y+5] = "player2case";
            this.state.table[x-1][y+4] = "player2case";
            this.state.table[x-1][y+3] = "player2case";
            this.state.table[x+1][y+5] = "player2case";
            this.state.table[x+1][y+4] = "player2case";
            this.state.table[x+1][y+3] = "player2case";
         }
         else if (lastKeyPressed == "up") {
            this.state.table[x-5][y] = "player2case";
            this.state.table[x-4][y] = "player2case";
            this.state.table[x-3][y] = "player2case";
            this.state.table[x-5][y-1] = "player2case";
            this.state.table[x-4][y-1] = "player2case";
            this.state.table[x-3][y-1] = "player2case";
            this.state.table[x-5][y+1] = "player2case";
            this.state.table[x-4][y+1] = "player2case";
            this.state.table[x-3][y+1] = "player2case";
         }
         else if (lastKeyPressed == "down") {
            this.state.table[x+5][y] = "player2case";
            this.state.table[x+4][y] = "player2case";
            this.state.table[x+3][y] = "player2case";
            this.state.table[x+5][y-1] = "player2case";
            this.state.table[x+4][y-1] = "player2case";
            this.state.table[x+3][y-1] = "player2case";
            this.state.table[x+5][y+1] = "player2case";
            this.state.table[x+4][y+1] = "player2case";
            this.state.table[x+3][y+1] = "player2case";
         }
         this.state.table[xSave][ySave] = "player1";
      }


      else if (bonus == "bonus2") {
         console.log("player2 use "+bonus);
         if (lastKeyPressed == "left") {
            this.state.table[x][y-8] = "player2case";
            this.state.table[x][y-7] = "player2case";
            this.state.table[x][y-6] = "player2case";
            this.state.table[x][y-5] = "player2case";
            this.state.table[x][y-4] = "player2case";
            this.state.table[x][y-3] = "player2case";
         }
         else if (lastKeyPressed == "right") {
            this.state.table[x][y+8] = "player2case";
            this.state.table[x][y+7] = "player2case";
            this.state.table[x][y+6] = "player2case";
            this.state.table[x][y+5] = "player2case";
            this.state.table[x][y+4] = "player2case";
            this.state.table[x][y+3] = "player2case";
         }
         else if (lastKeyPressed == "up") {
            this.state.table[x-8][y] = "player2case";
            this.state.table[x-7][y] = "player2case";
            this.state.table[x-6][y] = "player2case";
            this.state.table[x-5][y] = "player2case";
            this.state.table[x-4][y] = "player2case";
            this.state.table[x-3][y] = "player2case";
         }
         else if (lastKeyPressed == "down") {
            this.state.table[x+8][y] = "player2case";
            this.state.table[x+7][y] = "player2case";
            this.state.table[x+6][y] = "player2case";
            this.state.table[x+5][y] = "player2case";
            this.state.table[x+4][y] = "player2case";
            this.state.table[x+3][y] = "player2case";
         }
         this.state.table[xSave][ySave] = "player1";
      }


      else if (bonus == "bonus3") {
         console.log("player2 use "+bonus);
      }
   }

   // if (lastKeyPressed == "left") {
   //    this.state.table[p1x][p1y-5] = "wasted";
   // }
   // else if (lastKeyPressed == "right") {
   //    this.state.table[p1x][p1y+5] = "wasted";
   // }
   // else if (lastKeyPressed == "up") {
   //    this.state.table[p1x-5][p1y] = "wasted";
   // }
},