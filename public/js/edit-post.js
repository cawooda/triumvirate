// event handler for edit post form submit
const updatePostHandler = async (event) => {
	// prevent default form behaviour
	event.preventDefault();

	//get the relevant post id from the form submission. this is a dataset of the form which is the target of the submit event.
	const postId = event.target.dataset.postId;

	// extract values from form fields
	const title = document.querySelector('#title-input').value;
	//console.log(title);
	const content = document.querySelector('#content-input').value;
	//console.log(content);
	// extract file from file input
	const file = document.querySelector('#media-input').files[0];
	//console.log(file);

	// form validation
	if (title && content) {
		// construct a FormData instance
		const formData = new FormData();

		// append title and content to formData

		formData.append('id', postId);
		formData.append('title', title);
		formData.append('content', content);

		// if file uploaded append file to formData instance
		if (file) {
			formData.append('upload', file);
		}

		// send fetch PUT request to /api/posts
		const uploadResponse = await fetch(`/api/posts/${postId}`, {
			method: 'PUT',
			body: formData,
		});

		if (uploadResponse.ok) {
			document.location.assign('/users/profile');
		} else {
			alert('Failed to update post.');
		}
	}
};

// add event listenerfor update new post form
document
	.querySelector('#post-form')
	.addEventListener('submit', updatePostHandler);
