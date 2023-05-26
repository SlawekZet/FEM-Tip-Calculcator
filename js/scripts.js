// funkcja ustawiająca klasę "active" po kliknięciu przycisku oraz usuwająca tę klasę z innego przycisku
let activeButton = null;

function activateButton(buttonNumber) {
  if (activeButton) {
    activeButton.classList.remove("active");
  }

  if (buttonNumber === 6) {
    let input = document.getElementById("custom-tip-button");
    input.classList.add("active");
    activeButton = input;
  } else {
    let button = document.querySelector(`button:nth-child(${buttonNumber})`);
    button.classList.add("active");
    activeButton = button;
  }

  if (document.getElementById("custom-tip-button").value > 0) {
    document.getElementById("custom-tip-button").value = "";
  }
}

//Funkcja resetująca pola input i wyliczenia, a także usuwająca klasę .active z buttonów

function reset() {
  let inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }

  let buttons = document.querySelectorAll("button");
  buttons.forEach(function (button) {
    button.classList.remove("active");
  });

  document.querySelector(".tip-amount").textContent = "$0.00";
  document.querySelector(".total-outcome").textContent = "$0.00";
  document.getElementById("reset").style.backgroundColor = "hsl(183, 80%, 24%)";
}

//funkcja wywołująca komuniakt o błędzie podczas wpisania zero w number of people

function checkIfZero() {
  let peopleInput = document.getElementById("people-input");
  if (peopleInput.value == 0) {
    document.querySelector(".error-message").textContent = "Can't be zero";
    peopleInput.classList.add("error-input-border");
    peopleInput.classList.remove("input");
    // peopleInput.classList.add("error-input-border");
  } else {
    document.querySelector(".error-message").textContent = "";
    peopleInput.classList.add("input");
    peopleInput.classList.remove("error-input-border");
  }
}

//funkcja robiąca obliczenia

function countingTipAmount() {
  let billValue = document.getElementById("bill-input").value;
  let buttonValue = activeButton.value;
  let customButtonValue = document.getElementById("custom-tip-button").value;
  let peopleValue = document.getElementById("people-input").value;
  let tipAmount = 0;
  let totalAmount = 0;

  if (billValue == 0 || peopleValue == 0) {
    tipAmount = 0;
  } else if (customButtonValue > 0) {
    tipAmount = customButtonValue / peopleValue;
  } else if (buttonValue > 0) {
    tipAmount = (billValue * buttonValue) / peopleValue;
  }
  tipAmount = tipAmount.toFixed(2);
  document.querySelector(".tip-amount").textContent = `$${tipAmount}`;
  totalAmount = +billValue / peopleValue + +tipAmount;
  totalAmount = totalAmount.toFixed(2);

  if (isNaN(totalAmount) || !isFinite(totalAmount)) {
    document.querySelector(".total-outcome").textContent = `$0.00`;
  } else {
    document.querySelector(".total-outcome").textContent = `$${totalAmount}`;
  }

  // zmiana koloru przycisku reset
  document.getElementById("reset").style.backgroundColor = "hsl(172, 67%, 45%)";
}
