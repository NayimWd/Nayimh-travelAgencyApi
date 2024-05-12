// Define regex patterns
const regexPatterns = {
	email: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,
	password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
	phoneNumber: /^[0-9]{11}$/,
};

// Validate email using regex pattern
const validateEmail = (email) => {
	return regexPatterns.email.test(email);
};

// Validate password using regex pattern
const validatePassword = (password) => {
	return regexPatterns.password.test(password);
};

const validPhoneNumber = (number) => {
	// Regular expression to validate phone numbers

	return regexPatterns.phoneNumber.test(number);
}

module.exports = { regexPatterns, validateEmail, validatePassword, validPhoneNumber };
