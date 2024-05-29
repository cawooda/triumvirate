// event handler for logout button
const logoutBtnHandler = async (event) => {
	// prevent default form behaivour
	event.preventDefault();

	// api request to logout user
	const response = await fetch('/api/users/logout', {
		method: 'POST',
	});

	// if request successful redirect to homepage else alert
	if (response.ok) {
		document.location.replace('/');
	} else {
		alert('Failed to logout.');
	}
};

// event listener for logout button
document.querySelector('#logout-btn').addEventListener('click', logoutBtnHandler);
