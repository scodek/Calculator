document.getElementById("keydiv").addEventListener("click", performOperation);

var globalArr = [];
var str = "";
var strOutputUp = "";
var op1;
var op2;
var calculatorOn = 0;

var opMap = {
  "+": "+",
  "-": "-",
  "\u00F7": "/",
  x: "*"
};

function calculate() {
  return eval(op1 + opMap[globalArr.pop()] + op2);
}

function performOperation() {
  var inputVal = event.target.innerHTML;
  if (
    inputVal === "AC" &&
    document.getElementById("outputscreendown").value === ""
  ) {
    calculatorOn = 1;
  }

  if (calculatorOn) {
    if (strOutputUp.match(/=/)) {
      console.log("matched");
      strOutputUp = strOutputUp.replace(/.+?=(.+)$/, "$1");
      console.log("after replace " + strOutputUp);
    }

    if (inputVal === "=") {
      op2 = str;
      str = calculate();

      /*if(strOutputUp.match(/=/))
        {
            console.log("matched");
           strOutputUp = strOutputUp.replace(/.+?=(.+)$/,"$1");
           console.log("after replace " + strOutputUp);
        }
        else
        {*/
      strOutputUp += inputVal + str;
      //}

      //strOutputUp = str;

      document.getElementById("outputscreendown").value = str;
      document.getElementById("outputscreenup").value = strOutputUp;

      op1 = "";
      op2 = "";
    } else if (inputVal == "CE") {
      document.getElementById("outputscreendown").value = "";
      document.getElementById("outputscreenup").value = "";
      str = "";
      strOutputUp = "";
    } else if (inputVal === "AC") {
      if (document.getElementById("outputscreendown").value !== "") {
        document.getElementById("outputscreendown").value = "";
        document.getElementById("outputscreenup").value = "";
        str = "";
        strOutputUp = "";
        calculatorOn = 0;
      } else {
        calculatorOn = 1;
        document.getElementById("outputscreendown").value = "0";
      }
    } else if (
      inputVal === "x" ||
      inputVal === "\u00F7" ||
      inputVal === "+" ||
      inputVal === "-"
    ) {
      if (inputVal == "\u00F7") inputVal = "\u00F7";

      op1 = str;
      str = "";
      strOutputUp += inputVal;
      document.getElementById("outputscreendown").value = inputVal;
      document.getElementById("outputscreenup").value = strOutputUp;
      globalArr.push(inputVal);
    } else {
      str += inputVal;
      strOutputUp += inputVal;
      document.getElementById("outputscreendown").value = str;
      document.getElementById("outputscreenup").value = strOutputUp;
    }
  }
}
