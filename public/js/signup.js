// event handler for signup form submit
const signupHandler = async (event) => {
	// prevent default form behaviour
	event.preventDefault();

	// extract values from form input fields
	const email = document.querySelector('#email-input').value.trim();
	const username = document.querySelector('#username-input').value.trim();
	const password = document.querySelector('#password-input').value;

	// debug log
	console.log(email, username, password);

	// form validation
	if (email && username && password) {
		// api request to create new user
		const response = await fetch('/api/users/signup', {
			method: 'POST',
			body: JSON.stringify({
				email,
				username,
				password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		// if request successful redirect to hompage else alert
		if (response.ok) {
			document.location.assign('/');
		} else {
			alert('Failed to sign up.');
		}
	} else {
		alert('Please fill out all fields.');
	}
};

// event listener for signup form submit
document
	.querySelector('#signup-form')
	.addEventListener('submit', signupHandler);
