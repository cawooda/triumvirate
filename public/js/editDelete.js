// get all edit-btns and delete-btns
const editBtns = document.querySelectorAll('.edit-btn');
const deleteBtns = document.querySelectorAll('.delete-btn');

// event handler for edit-btn
const editHandler = async (event) => {
	// prevent default form behaviour
	event.preventDefault();

	// extract post id from data attribute
	const postId = event.target.dataset.postId;

	// change location to edit page for
	document.location.assign(`/posts/edit/${postId}`);
};

// add event listeners to all edit-btns
editBtns.forEach((editBtn) => {
	editBtn.addEventListener('click', editHandler);
});

// event handler for delete-btn
const deleteHandler = async (event) => {
	// prevent default form behaviour
	event.preventDefault();

	// extract post id from data attribute
	const postId = event.target.dataset.postId;

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

// add event listeners to all delete-btns
deleteBtns.forEach((deleteBtn) => {
	deleteBtn.addEventListener('click', deleteHandler);
});
