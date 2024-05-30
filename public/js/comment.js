const commentInput = document.querySelector('#comment-input');

async function newComment(user, comment, postId) {
	const result = await fetch('/api/comments', {
		method: 'POST',
		body: JSON.stringify({
			user_id: user,
			content: comment,
			post_id: postId,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

const commentSubmitBtnHandler = async (event) => {
	event.preventDefault();
	const userId = event.target.getAttribute('data-user');
	const postId = event.target.getAttribute('data-post');
	const content = commentInput.value;
	console.log(userId);
	console.log(postId);
	console.log(content);
	newComment(userId, content, postId);
};

document
	.querySelector('#comment-submit-btn')
	.addEventListener('click', commentSubmitBtnHandler);
