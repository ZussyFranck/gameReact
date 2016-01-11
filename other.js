$(document).ready(function(){
   var button = $('#howToButton');
   var content = $('#howToContent');

   button.click(function() {
      content.toggleClass("hide");
   });

   var musicIco = $('#musicImg');
   var musicAudio = $('#musicSound')[0];
   musicIco.click(function() {
      $(this).toggleClass("off");
      if ($(this).hasClass("off")) {
         musicAudio.pause();
      }
      else {
         musicAudio.play();
      }
   });


});
