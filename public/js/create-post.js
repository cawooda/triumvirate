// event handler for create post form submit
const createPostHandler = async (event) => {
	// prevent default form behaviour
	event.preventDefault();

	// extract values from form fields
	const title = document.querySelector('#title-input').value;
	const content = document.querySelector('#content-input').value;

	// extract file from file input
	const file = document.querySelector('#media-input').files[0];

	console.log(file);

	// form validation
	if (title && content) {
		// // send fetch POST request to /api/posts
		// const postResponse = await fetch('/api/posts', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({
		// 		title,
		// 		content,
		// 	}),
		// });

		// construct a FormData instance
		const formData = new FormData();

		// append title and content to formData
		formData.append('title', title);
		formData.append('content', content);

		// if file uploaded append file to formData instance
		if (file) {
			formData.append('upload', file);
		}

		// send fetch POST request to /api/posts
		const uploadResponse = await fetch('/api/posts', {
			method: 'POST',
			body: formData,
		});

		if (uploadResponse.ok) {
			document.location.assign('/users/profile');
		} else {
			alert('Failed to create post.');
		}
	}
};

// add event listenerfor create new post form
document
	.querySelector('#post-form')
	.addEventListener('submit', createPostHandler);
