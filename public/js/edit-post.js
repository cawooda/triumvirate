const $postUpdateInput = document.querySelector('#post-update-input');

const $target = document.querySelector('.modal');
const $trigger = document.querySelector('.edit-btn');

const file = document.querySelector('#media-update-input').files[0];

$postUpdateInput.value = $postUpdateInput.dataset.text;

async function updatePost(user, postContent, postTitle, postId) {
	const formData = new FormData();
	formData.append('title', postTitle);
	formData.append('content', postContent);

	if (file) {
		formData.append('upload', file);
	}

	const result = await fetch(`/api/posts/${postId}`, {
		method: 'PUT',
		body: JSON.stringify({
			user_id: user,
			content: postContent,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	console.log(result);
	closeModal($target);
}

const postUpdateSubmitBtnHandler = async (event) => {
	event.preventDefault();
	const userId = event.target.getAttribute('data-user');
	const postId = event.target.getAttribute('data-post');
	const postContent = $postUpdateInput.value;
	console.log(userId);
	console.log(postId);
	console.log(postContent);
	updatePost(userId, postContent, postId);
	closeAllModals();
};

function openModal($el) {
	$el.classList.add('is-active');
}

function closeModal($el) {
	$el.classList.remove('is-active');
}

function closeAllModals() {
	(document.querySelectorAll('.modal') || []).forEach(($modal) => {
		closeModal($modal);
	});
}

$trigger.addEventListener('click', (event) => {
	console.log('modal Triggered by', event.target);
	openModal($target);
});

(
	document.querySelectorAll(
		'.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button',
	) || []
).forEach(($close) => {
	const $target = $close.closest('.modal');

	$close.addEventListener('click', () => {
		closeModal($target);
	});
});

//escape key closes modal
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		closeAllModals();
	}
});

document
	.querySelector('#post-update-submit-btn')
	.addEventListener('click', postUpdateSubmitBtnHandler);
