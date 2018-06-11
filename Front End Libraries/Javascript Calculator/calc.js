var expr = "";

function compute(expr) {
  var parsed = expr.replace("÷", "/").replace("×", "*");
  var res;
  try {
    res = eval(parsed);
    return parseFloat(res.toFixed(8)).toString(10);
  } catch (e) {
    return false;
  }
};

function update() {
  $("#answerdisplay").text(expr);
  var res = compute(expr);
  if (res === false) {
    $("#logdisplay").text("");
  } else {
    $("#logdisplay").text("= " + res);
  }
}

// ÷×
function pressButton() {
  var btn = this.innerHTML;
  if (btn === "AC") {
    expr = "";
  } else if (btn === "CE") {
    expr = expr.slice(0, -1);
  } else if (btn === "=") {
    var res = compute(expr);
    if (res === false) {
      expr = "ERROR!"
      $("#answerdisplay").html(expr);
        
    } else {
      expr = res;
    }
  } else if(expr.length >= 10) {
    expr = btn;
    res = btn;
  } else{
     expr += btn;
  }
   
  
  update();
}



$("button").on("click", pressButton);
