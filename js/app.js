const selectElem = document.querySelectorAll('.main__currency');
const btnElem = document.querySelector('.main__btn');
const numbertElem = document.getElementById('number');
const answerElem = document.getElementById('answer');


fetch('https://api.frankfurter.app/currencies')
	.then((data) => data.json())
	.then((data) => {
		displayData(data);
	});


function displayData(data) {
	const entries = Object.entries(data);
	for (let i = 0; i < entries.length; i++) {
		selectElem[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`
		selectElem[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`
	}
}

btnElem.addEventListener("click", () => {
	let currencyLeft = selectElem[0].value;
	let currencyRight = selectElem[1].value;

	let value = numbertElem.value;

	if (currencyLeft != currencyRight) {
		convert(currencyLeft, currencyRight, value)
	} else {
		alert("Выберите различные валюты");
	}
});

function convert(currencyLeft, currencyRight, value) {
	const host = "api.frankfurter.app";
	fetch(`https://${host}/latest?amount=${value}&from=${currencyLeft}&to=${currencyRight}`)
		.then((val) => val.json())
		.then((val) => {
			answerElem.value = Object.values(val.rates)[0];
		})
}