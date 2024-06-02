// event handler for login form submit
const loginHandler = async (event) => {
	// prevent default form behaviour
	event.preventDefault();

	// extract values from form fields
	const email = document.querySelector('#email-input').value;
	const password = document.querySelector('#password-input').value;

	// form validation
	if (email && password) {
		// api request to login user
		const response = await fetch('/api/users/login', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		// if request successful redirect to homepage else alert
		if (response.ok) {
			document.location.assign('/');
		} else {
			alert('Failed to login.');
		}
	} else {
		alert('Please fill out all fields.');
	}
};

// event listener for login form submit
document.querySelector('#login-form').addEventListener('submit', loginHandler);
