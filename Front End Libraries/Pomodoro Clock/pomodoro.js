$(document).ready(function(){
  
  var minutes = 25;
  var seconds = 0;
  var status = "asleep";
  var paused = false;
  var counting;
  
  $(".countdown").html(minutes + ":00");
  
  //increase time
  
  $("#up-arrow").click(function(){
    minutes++;
    if(minutes > 99){
      $("h5").html("That's too long!");
      minutes = 99;
    } else
        $(".countdown").html(minutes + ":00");
  });
  
  //decrease time
  $("#down-arrow").click(function(){
      minutes--;
    if(minutes < 1){
      $("h5").html("Way too low!");
      minutes = 1;
    } else 
       $(".countdown").html(minutes + ":00");
  });
   
  //countdown logic
  function countdown(){
      if(seconds === 0){seconds = 60; minutes--}
      seconds--;
    //finished the countdown
      if(minutes === 0 && seconds === 0){
        clearInterval(counting);
        $("#start").attr('src', 'images/pikadone.gif');
        $("header").html("You did it!!");
        $("h5").html("Click reset to begin again!");
        status = "finished";
      }
      if(seconds < 10){$('.countdown').html(minutes + ":0" + seconds);}
      else{
      $('.countdown').html(minutes + ":" + seconds);
      }
    } 
  
  //starting/stopping the countdown
  function timer(){
    if(paused === false){
     counting = setInterval(countdown, 1000);
     paused = true;
   }
   else if(paused === true){
     clearInterval(counting);
     paused = false;
   }
  }
  
  //what happens when you click Pikachu
  $("#start").click(function(){
    if(status === "asleep"){
    $("#start").attr('src', 'images/pikawake.gif');
     $("header").html("He's awake!!");
     $("h5").html("Click again to begin!");
      status = "awake";
      
    } else if(status === "awake"){
      $("#start").attr('src', 'images/pikatwitch.gif');
      $("header").html("Time for work!");
      $("h5").html("Click at any time to pause.");
      $("#up-arrow").hide();
      $("#down-arrow").hide();
      $(".countdown").css("animation", "none");
      status = "timing";
      timer();

    } else if(status === "timing") {
      $("#start").attr('src', 'images/pikahuh.gif');
      $("header").html("Procrastinating?");
      $("h5").html("Let's go, click to resume!");
      status = "awake";
      timer();
      
    } 
    
  });
  //reset button
 $(".reset").click(function(){
   minutes = 25;
   seconds = 0;
   paused = false;
   clearInterval(counting);
   $("#start").attr('src', 'images/pikasleep.gif');
   $("header").html("Pomodoro Clock");
   $("h5").html("Wake Pikachu up!");
   $(".countdown").html(minutes + ":00");
   $("#up-arrow").show();
   $("#down-arrow").show();
   status = "asleep";
 })
  
  
});
