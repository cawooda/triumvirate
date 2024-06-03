// event handler for like-btn
const likeBtnHandler = async (event) => {
	// prevent default form behaviour
	event.preventDefault();

	// extract logged_in from dataset
	const loggedIn = document.querySelector('#like-btn').dataset.loggedIn;

	// if user not logged in alert they must login to like
	if (!loggedIn) {
		alert('Must be logged in to like posts.');
	} else {
		// extract post id from dataset
		const postId = document.querySelector('#like-btn').dataset.postId;

		console.log(postId);

		// api request to increment likes
		const response = await fetch(`/api/posts/like/${postId}`, {
			method: 'PUT',
		});

		// if request successful reload page
		if (response.ok) {
			document.location.reload();
		} else {
			alert('Failed to like post.');
		}
	}
};

// add event listener for like btn on click
document.querySelector('#like-btn').addEventListener('click', likeBtnHandler);
