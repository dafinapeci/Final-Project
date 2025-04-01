const currencyOne = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const currencyTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");


amountOne.addEventListener("input", () => {
  if (amountOne.value < 0) {
    amountOne.value = 0;
  }
  calculate();
});

amountTwo.addEventListener("input", () => {
  if (amountTwo.value < 0) {
    amountTwo.value = 0;
  }
  calculate();
});

const API_KEY = "2913887691e18d1bcaefb877";

function calculate() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;

  fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      if (currency_one === currency_two) {
        rate.innerText = `1 ${currency_one} = 1 ${currency_two}`;
        amountTwo.value = amountOne.value;
      } else {
        const currentRate = data.conversion_rates[currency_two]; 
        rate.innerText = `1 ${currency_one} = ${currentRate} ${currency_two}`;
        amountTwo.value = (amountOne.value * currentRate).toFixed(2);
      }
    })
    .catch((error) => console.error("Error fetching exchange rate:", error));
}


currencyOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);
amountTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const storedValue = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = storedValue;
  calculate();
});

calculate();
