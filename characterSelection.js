player1ChooseMewtwo: function() {
   var p2character = this.state.p2character;
   if (p2character == "mewtwo") {
      console.log("mewtwo already taken");
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
      console.log("tentacruel already taken");
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
      console.log("alakazam already taken");
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
      console.log("machamp already taken");
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
      console.log("victreebel already taken");
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
      console.log("charizard already taken");
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
      console.log("mewtwo already taken");
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
      console.log("tentacruel already taken");
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
      console.log("alakazam already taken");
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
      console.log("machamp already taken");
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
      console.log("victreebel already taken");
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
      console.log("charizard already taken");
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
      console.log("undefined");
   }
},
