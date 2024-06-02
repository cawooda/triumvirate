// event handler for edit-btn
const editHandler = async (event) => {
	// prevent default form behaviour
	event.preventDefault();

	// extract post id from data attribute
	const postId = document.querySelector('#edit-btn').dataset.postId;

	// change location to edit page for
	document.location.replace(`/posts/edit/${postId}`);
};

// add event listener for edit-btn on click
document.querySelector('#edit-btn').addEventListener('click', editHandler);

// event handler for delete-btn
const deleteHandler = async (event) => {
	// prevent default form behaviour
	event.preventDefault();

	// extract post id from data attribute
	const postId = document.querySelector('#delete-btn').dataset.postId;

	// send fetch delete request for the post
	const response = await fetch(`/api/posts/${postId}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		document.location.assign('/users/profile');
	} else {
		alert('Failed to delete post.');
	}
};

// add event listener for delete-btn on click
document.querySelector('#delete-btn').addEventListener('click', deleteHandler);
