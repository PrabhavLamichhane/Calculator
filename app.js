class UISection {
  constructor() {
    this.outputStrings = {
      input: document.querySelector(".inp-val"),
      output: document.querySelector(".output-val")
    };
    this.inpString = "";
  }

  set buttonValue(pressedBtn) {
    this.pressedBtn = pressedBtn;
  }

  displayToUI(result = "") {
    if (
      isNaN(parseInt(this.pressedBtn.innerHTML)) &&
      this.inpString.endsWith(this.pressedBtn.innerHTML)
    )
      return;
    this.inpString = this.inpString.concat(this.pressedBtn.innerHTML);
    console.log(this.inpString + "haha");
    console.log(result, "nono");
    this.outputStrings.input.innerHTML = result + this.inpString;
  }

  sendExp() {
    const operation = new OperationSection(this.inpString);
    console.log(this.inpString, "send");
    operation.performOperation();
  }

  displayResult(result, exp) {
    this.outputStrings.input.innerHTML = "Ans= " + result;
    console.log(this.inpString, "lol");
    this.outputStrings.output.innerHTML = exp;
  }

  clearAllUI() {
    this.outputStrings.input.innerHTML = "0";
    this.outputStrings.output.innerHTML = "";
    this.inpString = "";
  }

  deleteLastString() {
    this.inpString = this.outputStrings.input.innerHTML.slice(0, -1);
    this.outputStrings.input.innerHTML = this.inpString;
  }
}

class EventSection {
  constructor() {
    this.allBtns = document.querySelectorAll(".btn");
    this.operationBtn = "";
    this.dispUI = new UISection();
    this.resultBtn = document.querySelector(".btn-1");
    this.clear = document.querySelector(".btn-clear-all");
    this.del = document.querySelector(".btn-del");
    this.dispUI.clearAllUI();
  }

  addBtnsEvent(result) {
    this.allBtns.forEach(value => {
      value.addEventListener("click", () => {
        this.dispUI.buttonValue = value;
        console.log("Button pressed", value.innerHTML);
        if (value.className === "btn btn-operator")
          this.operationBtn = value.innerHTML;
        this.dispUI.displayToUI(result);
      });
    });
  }

  addResultEvent() {
    this.resultBtn.addEventListener("click", () => {
      console.log("Result Clicked");
      this.dispUI.sendExp();
    });
  }

  addClearEvent() {
    this.clear.addEventListener("click", () => {
      console.log("Cleared");
      this.dispUI.clearAllUI();
    });
  }

  addDelEvent() {
    this.del.addEventListener("click", () => {
      console.log("Clicked");
      this.dispUI.deleteLastString();
    });
  }
}

class OperationSection {
  constructor(input) {
    this.input = input;
    this.result = 0;
    this.UI = new UISection();
    this.events = new EventSection();
  }

  performOperation() {
    // let input = this.input.substring(0, this.input.length - 1);
    // let inp = input.replace("=", "")
    this.result = eval(this.input);
    this.UI.displayResult(this.result, this.input);
    this.continueOperation();
  }

  continueOperation() {
    console.log(this.result);
    this.events.addBtnsEvent(this.result);
    // this.performOperation();
  }
}
const allEvents = new EventSection();
const init = () => {
  allEvents.addDelEvent();
  allEvents.addBtnsEvent();
  allEvents.addResultEvent();
  allEvents.addClearEvent();
};
init();
