const displayInput = document.querySelector("#input-screen");
const displayOutput = document.querySelector("#output-screen");
const btn = document.getElementsByClassName("btn");
const history = document.querySelector(".show-history-main");
const historyBtn = document.querySelector("#history");
let historyList = [];

//Constants
const cos = Math.cos;
const sin = Math.sin;
const tan = Math.tan;
const π = Math.PI;
const sqrt = Math.sqrt;
const e = Math.E;

//For button clicks
for (item of btn) {
  item.addEventListener("click", (e) => {
    btnText = e.target.innerText;
    if (btnText === "CE" || btnText === "AC" || btnText === "=") {
      displayInput.value = displayInput.value;
    } else {
      if (
        btnText === "sin" ||
        btnText === "cos" ||
        btnText === "tan" ||
        btnText === "sqrt" ||
        btnText === "log"
      ) {
        displayInput.value += btnText + "(";
      } else if (btnText === "√") {
        displayInput.value += "sqrt(";
      } else {
        displayInput.value += btnText;
      }
    }
  });
}

//For typed input
displayInput.addEventListener("keyup", (e) => {
  if (e.key === "s") {
    displayInput.value += "in(";
  }
  if (e.key === "c") {
    displayInput.value += "os(";
  }
  if (e.key === "t") {
    displayInput.value += "an(";
  }
  if (e.key === "Enter") {
    equal();
  }
});

// For History
historyBtn.addEventListener("click", () => {
  history.innerHTML = "";
  historyList.map(function (wizard) {
    return (history.innerHTML +=
      "<div class='single-history-entry'>" +
      "<div>" +
      `<input type='text' value= 'Your Input: ${wizard}' />` +
      "<p>" +
      " Your Output " +
      eval(wizard) +
      "</p>" +
      "</div>" +
      "<button onclick='this.parentNode.remove()'> x " +
      "</button>" +
      "</div>");
  });
  history.classList.toggle("active");
});

//For deleting characters
const backspace = () => {
  displayInput.value = displayInput.value.substr(
    0,
    displayInput.value.length - 1
  );
};

//For Evaluating
const equal = () => {
  try {
    if (eval(displayInput.value) === Infinity) {
      displayOutput.value = "Math Error";
    } else {
      displayOutput.value = eval(displayInput.value).toFixed(4);
      historyList.push(displayInput.value);
      displayInput.value = "";
    }
  } catch (err) {
    displayOutput.value = err.name;
  }
};
