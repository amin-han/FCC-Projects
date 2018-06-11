const b = ["#green", "#red", "#blue", "#yellow"];
t = 0; //button presses won't work until game is started
str = 0; //strict
started = 0; //game on
uSay = sSays = []; //your moves/simon moves


//toggling strict mode
$("#strict").click(function() {
  if (str === 1) {
    str = 0;
    $("#strict").html("Mode: Casual");
  } else {
    str = 1;
    $("#strict").html("Mode: Strict");
  }
});

//sfx
const vol = 30
const green = new buzz.sound("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", {volume: vol});
const red = new buzz.sound("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", {volume: vol});
const blue = new buzz.sound("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", {volume: vol});
const yellow = new buzz.sound("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3", {volume: vol});
const failSound = new buzz.sound("http://www.freesound.org/data/previews/331/331912_3248244-lq.mp3", {volume: 10});

//clear lights and sound
clrLight = function() {
  $(b.join(", ")).removeClass("active");
  buzz.all().stop();
};

var simonTurn = function() {
  t = 0;
  uSay = []; // clear user presses
  var s = 450; //set game speed
  var x = 1.8; //speed multiplier
  
// add random to sequence
  if (nR || sSays.length === 0) { 
    sSays.push(Math.floor((Math.random() * 4)));
  }

  if (sSays.length > 9) {
    x = 1.15;
    $(".count").html(sSays.length);
  } else if (sSays.length < 10)
    $(".count").html("0" + sSays.length);
  if (sSays.length > 4) {
    x = 1.25;
  }

  setTimeout(function() {
    t = 1; // let the user play
  }, sSays.length * (x * s) - 100);
  for (var i in sSays) {
    sPlay(i);
  }
  function sPlay(i) {
    setTimeout(function() {
      if (started === 1) {
        $(b[sSays[i]]).addClass("active");
        eval((b[sSays[i]].substring(1))).play();
        setTimeout(clrLight, s);
      }
    }, i * (x * s)); // time between notes
   };
  };

$("#start").click(function() {
  
  $("#start").html("RESTART");
  started = 1;
  clrLight();
  uSay = sSays = [];
  nR = 1; // start a new round
  setTimeout(simonTurn, 1000);
});

 // when user presses button
$(b.join(", ")).mousedown(function() {
  
  if (t && started === 1) {
    uSay.push(b.indexOf("#" + this.id));
    $(this).addClass("active");
    var place = uSay.length;
   
    if (uSay[place - 1]^sSays[place - 1]) {
      $(".count").html("Wrong!");
      failSound.play();
      t = nR = 0; // end user turn
      setTimeout(clrLight, 1000);
      
      if (str === 1) uSay = sSays = []; // empty in strict mode
      setTimeout(simonTurn, 2800); // longer delay on failure
    } else if (place === 20) {
      $(b.join(", ")).addClass("active");
      $(".count").html("You win!!");
      sSays = [];
      t = 0; // end user turn
      setTimeout(simonTurn, 4000);
    } else {
      eval(this.id).play();
      if (place === sSays.length) {
        t = 0; // end user turn
        setTimeout(clrLight, 1000);
        nR = 1; // proceed to next level
        setTimeout(simonTurn, 1500);
      }
    }
  }
}).mouseup(function() {
  if (t) setTimeout(clrLight, 200);
});
