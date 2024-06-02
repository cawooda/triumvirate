const $postUpdateInput = document.querySelector('#post-update-input');

async function updatePost(user, postContent, postId) {
	const result = await fetch(`/api/posts${postId}`, {
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
}

const postUpdateSubmitBtnHandler = async (event) => {
	event.preventDefault();
	const userId = event.target.getAttribute('data-user');
	const postId = event.target.getAttribute('data-post');
	const postContent = $postUpdateInput.value;
	console.log(userId);
	console.log(postId);
	console.log(postContent);
	newComment(userId, postContent, postId);
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
const $target = document.querySelector('.modal');
const $trigger = document.querySelector('.js-modal-trigger');
$trigger.addEventListener('click', (event) => {
	console.log('modal Triggered by', event.target);
	openModal($target);
});

console.log($trigger);

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
