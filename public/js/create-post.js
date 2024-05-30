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
		// send fetch POST request to /api/posts

		// add text fields for title and content
		// formData.append('title', title);
		// formData.append('content', content);

		// if file uploaded append file to a FormData instance and send in the body
		// of a fetch POST request to the upload endpoint
		if (file) {
			// construct a FormData instance
			const formData = new FormData();
			formData.append('upload', file);

			// send fetch POST request to /api/posts/upload
			const uploadResponse = await fetch('/api/posts/upload', {
				method: 'POST',
				body: formData,
			});

			console.log(uploadResponse);
		}
	}
};

// add event listenerfor create new post form
document
	.querySelector('#post-form')
	.addEventListener('submit', createPostHandler);
