// event handler for login button
const loginBtnHandler = async (event) => {
	// prevent default form behaivour
	event.preventDefault();

	document.location.assign('/users/login');
};

// event listener for login button
document.querySelector('#login-btn').addEventListener('click', loginBtnHandler);
