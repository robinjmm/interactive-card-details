import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/brands.css";
import "../scss/styles.scss";

const cardOwner = document.querySelector(".js-card-owner");
const cardNumber = document.querySelector(".js-card-number");
const cardExpiry = document.querySelector(".js-card-expiry");
const cardCVC = document.querySelector(".js-card-cvc");
const form = document.querySelector(".js-form");
const success = document.querySelector(".js-success");
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
	const message = errorMessage;
	element.classList.remove("input-error");
	message.innerText = "";
}

function isExactLength(element, errorMessage) {
	const { name: inputName } = element;
	const message = errorMessage;
	const valueLength = element.value.trim().length;

	if (inputName === "card-number" && valueLength !== 19) {
		message.innerText = "Card Number must be 16 digits";
		return false;
	}

	if (inputName === "month" && valueLength !== 2) {
		message.innerText = "Month must be 2 digits";
		return false;
	}

	if (inputName === "year" && valueLength !== 2) {
		message.innerText = "Year must be 2 digits";
		return false;
	}

	if (inputName === "cvc" && valueLength !== 3) {
		message.innerText = "CVC must be 3 digits";
		return false;
	}

	return true;
}

function isValid(element, errorMessage) {
	const message = errorMessage;
	const numericValue = Number(element.value.replace(/\s+/g, ""));

	if (Number.isNaN(numericValue)) {
		message.innerText = "Wrong format, numbers only";
		return false;
	}

	if (element.name === "month" && (numericValue > 12 || numericValue < 1)) {
		message.innerText = "Must be a valid Month value";
		return false;
	}

	return isExactLength(element, errorMessage);
}

function isNotEmpty(element, errorMessage) {
	const message = errorMessage;
	if (!element.value) {
		message.innerText = "Can't be blank";
		return false;
	}

	return isValid(element, errorMessage);
}

function validateName() {
	const trimmedValue = name.value.trim();

	if (!trimmedValue) {
		nameError.innerText = "Can't be blank";
		showError(name);
		return false;
	}

	return true;
}

function validateNumber() {
	if (!isNotEmpty(number, numberError)) {
		showError(number);
		return false;
	}

	return true;
}

function validateDate() {
	if (!isNotEmpty(month, dateError)) {
		showError(month);
		return false;
	}

	if (!isNotEmpty(year, dateError)) {
		showError(year);
		return false;
	}

	return true;
}

function validateCVC() {
	if (!isNotEmpty(cvc, cvcError)) {
		showError(cvc);
		return false;
	}

	return true;
}

window.addEventListener("DOMContentLoaded", () => {
	name.addEventListener("input", () => {
		removeError(name, nameError);
	});

	number.addEventListener("input", (event) => {
		removeError(number, numberError);
		const numberInput = event.target;
		const trimmedValue = numberInput.value.replace(/\s+/g, "");
		const formattedValue = trimmedValue.replace(/\d{4}(?=\d)/g, "$& ");
		numberInput.value = formattedValue;
	});

	month.addEventListener("input", () => {
		removeError(month, dateError);
	});

	year.addEventListener("input", () => {
		removeError(year, dateError);
	});

	cvc.addEventListener("input", () => {
		removeError(cvc, cvcError);
	});

	form.addEventListener("submit", (event) => {
		event.preventDefault();

		const validations = [validateName(), validateNumber(), validateDate(), validateCVC()];

		if (validations.every((value) => value === true)) {
			success.classList.remove("hidden");
			form.classList.add("hidden");

			cardOwner.innerText = name.value.toUpperCase();
			cardNumber.innerText = number.value;
			cardExpiry.innerText = `${month.value}/${year.value}`;
			cardCVC.innerText = cvc.value;
		}
	});
});
