import "@fontawesome/fontawesome.min.css";
import "@fontawesome/brands.min.css";
import "@styles/styles.scss";

const form = document.querySelector(".js-form");
const name = document.querySelector(".js-name");
const nameError = document.querySelector(".js-name-error");
const number = document.querySelector(".js-number");
const numberError = document.querySelector(".js-number-error");
const month = document.querySelector(".js-month");
const year = document.querySelector(".js-year");
const dateError = document.querySelector(".js-date-error");
const cvc = document.querySelector(".js-cvc");
const cvcError = document.querySelector(".js-cvc-error");

function showError(element) {
	element.classList.add("input-error");
}

function removeError(element, errorMessage) {
	element.classList.remove("input-error");
	errorMessage.innerText = "";
}

function isExactLength(element, errorMessage) {
	const name = element.name;
	const valueLength = element.value.length;
	const message = errorMessage.innerText;

	if (name === "card-number" && valueLength !== 16) {
		message = "Card Number must be 16 digits";
		return false;
	} else if (name === "month" && valueLength !== 2) {
		message = "Month must be 2 digits";
		return false;
	} else if (name === "year" && valueLength !== 2) {
		message = "Year must be 2 digits";
		return false;
	} else if (name === "cvc" && valueLength !== 3) {
		message = "CVC must be 3 digits";
		return false;
	} else {
		return true;
	}
}

function isNumber(element, errorMessage) {
	const numericValue = Number(element.value);
	const message = errorMessage.innerText;

	if (isNaN(numericValue)) {
		message = "Wrong format, numbers only";
		return false;
	} else if (element.name === "month" && (numericValue > 12 || numericValue < 1)) {
		message = "Must be a valid Month value";
		return false;
	} else {
		return isExactLength(element, errorMessage);
	}
}

function isNotEmpty(element, errorMessage) {
	if (!element.value) {
		errorMessage.innerText = "Can't be blank";
		return false;
	} else {
		return isNumber(element, errorMessage);
	}
}

function validateName() {
	if (!name.value) {
		nameError.innerText = "Can't be blank";
		showError(name);
		return false;
	}

	return true;
}

function validateNumber() {
	if (isNotEmpty(number, numberError)) {
		return true;
	} else {
		showError(number);
		return false;
	}
}

function validateDate() {
	if (!isNotEmpty(month, dateError)) {
		showError(month);
		return false;
	} else if (!isNotEmpty(year, dateError)) {
		showError(year);
		return false;
	} else {
		return true;
	}
}

function validateCVC() {
	if (isNotEmpty(cvc, cvcError)) {
		return true;
	} else {
		showError(cvc);
		return false;
	}
}

window.addEventListener("DOMContentLoaded", () => {
	name.addEventListener("click", () => {
		removeError(name, nameError);
	});

	number.addEventListener("click", () => {
		removeError(number, numberError);
	});

	month.addEventListener("click", () => {
		removeError(month, dateError);
	});

	year.addEventListener("click", () => {
		removeError(year, dateError);
	});

	cvc.addEventListener("click", () => {
		removeError(cvc, cvcError);
	});

	form.addEventListener("submit", event => {
		event.preventDefault();

		const validations = [validateName(), validateNumber(), validateDate(), validateCVC()];

		if (validations.every(value => value === true)) {
			console.log("All Valid");
		}
	});
})