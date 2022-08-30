const displayInput = document.querySelector("#input-screen");
const displayOutput = document.querySelector("#output-screen");
const btn = document.getElementsByClassName("btn");
const history = document.querySelector(".show-history-main");
const historyClick = document.querySelector(".single-history-entry");
const historyInput = document.querySelector(".history-input");
const historyOutput = document.querySelector(".history-output");
const varDeclaredError = document.querySelector(".var-dec-error-msg");
const showVariableDeclared = document.querySelector(".var-show");

//Constants
const cos = Math.cos;
const sin = Math.sin;
const tan = Math.tan;
const 𝝅 = Math.PI;
const sqrt = Math.sqrt;
const e = Math.E;
const log = Math.log;
let variableObject = {};

//For button clicks
for (item of btn) {
  item.addEventListener("click", (e) => {
    btnText = e.target.innerText;
    displayInput.focus();
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
      } else if (btnText === "^") {
        displayInput.value += "**";
      } else if (btnText === "(") {
        displayInput.value += "*(";
      } else {
        displayInput.value += btnText;
      }
    }
    console.log(e.target.value);
  });
}

//For typed input
displayInput.addEventListener("keyup", (e) => {
  if (
    e.key === "(" &&
    !displayInput.value.slice(-2).includes("n") &&
    !displayInput.value.slice(-2).includes("s") &&
    !displayInput.value.slice(-2).includes("g") &&
    !displayInput.value.slice(-2).includes("t")
  ) {
    console.log(displayInput.value.slice(-2));
    let newStr = displayInput.value.replace("(", "");
    displayInput.value = newStr + "*(";
  }
  if (e.key === "Enter") {
    equal();
  }
  if (e.key === "^") {
    let newStr = displayInput.value.replace("^", "");
    displayInput.value = newStr + "**";
  }
  if (e.key === "Escape") {
    displayInput.value = "";
    displayOutput.value = "";
  }
  if (e.key === "Delete") {
    backspace();
  }
});

// For History
const displayHistory = () => {
  return (history.innerHTML +=
    "<div class='single-history-entry'>" +
    "<div>" +
    `<input type='text' class='history-input' value= '${displayInput.value}' onclick='displayInput.value += this.value'/>` +
    "<p class='history-output' onclick = 'displayInput.value += this.innerText'>" +
    displayOutput.value +
    "</p>" +
    "</div>" +
    "<button onclick=' this.parentNode.remove();'> x " +
    "</button>" +
    "</div>");
};

//For deleting characters
const backspace = () => {
  displayInput.value = displayInput.value.substr(
    0,
    displayInput.value.length - 1
  );
};
// For Error message
const removeErrorMessage = () => {
  varDeclaredError.value = "";
  displayOutput.value = "";
};
// For Declaring a variable
const variableDeclaration = () => {
  // const valueOfVar = varDeclaredInput.value;
  const valueOfVar = displayInput.value;
  if (
    !valueOfVar.includes("=") ||
    valueOfVar[0] === "=" ||
    Number(valueOfVar[0])
  ) {
    varDeclaredError.value = "Invalid Assigment";
    setTimeout(removeErrorMessage, 2000);
    // setInterval(errorMessage("Invalild Assignment"), 3000);
    // varDeclaredInput.value = "";
  } else {
    const input = valueOfVar.trim().split("=");
    //destructing the array in key value pair
    const [key, value] = input;

    if (variableObject.hasOwnProperty(key)) {
      varDeclaredError.value = "variable already exist";
      setTimeout(removeErrorMessage, 2000);
      // varDeclaredInput.value = "";
    } else {
      //appending the new key value pair in the object
      variableObject = {
        ...variableObject,
        [key]: value,
      };
      showVariableDeclared.innerHTML +=
        "<div class='var-show-single'>" + valueOfVar + "</div>";
    }
  }
};

//For Evaluating
const equal = () => {
  try {
    if (displayInput.value.includes("=")) {
      variableDeclaration();
      displayOutput.value = eval(displayInput.value).toFixed(4);
      displayInput.value = "";
      displayOutput.value = "";
    } else if (!Number.isFinite(eval(displayInput.value))) {
      displayOutput.value = "Math Error";
      setTimeout(removeErrorMessage, 2000);
    } else {
      displayOutput.value = eval(displayInput.value).toFixed(4);
      displayHistory();
      displayInput.value = "";
    }
  } catch (err) {
    displayOutput.value = err.name;
    setTimeout(removeErrorMessage, 2000);
  }
};
