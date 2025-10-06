
document.addEventListener('DOMContentLoaded', function() {
	const sidebar = document.getElementById('sidebar');
	const openBtn = document.querySelector('.sidebar-toggle');
	const closeBtn = document.querySelector('.close-sidebar');
	const sidebarLinks = document.querySelectorAll('.sidebar-links a');
	if (openBtn && sidebar) {
		openBtn.addEventListener('click', function() {
			sidebar.classList.add('open');
		});
	}
	if (closeBtn && sidebar) {
		closeBtn.addEventListener('click', function() {
			sidebar.classList.remove('open');
		});
	}
	sidebarLinks.forEach(link => {
		link.addEventListener('click', function() {
			sidebar.classList.remove('open');
		});
	});
});

document.addEventListener('DOMContentLoaded', function() {
	const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
	navLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			const targetId = this.getAttribute('href').slice(1);
			const target = document.getElementById(targetId);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
				history.pushState(null, '', '#' + targetId);
			}
		});
	});

	
	const fadeSections = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-up, .fade-in-right, .fade-in-scale');
	const observer = new window.IntersectionObserver((entries, obs) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				// Uncomment next line to animate only once
				// obs.unobserve(entry.target);
			} else {
				entry.target.classList.remove('visible');
			}
		});
	}, {
		threshold: 0.15
	});
	fadeSections.forEach(section => {
		observer.observe(section);
	});


	const commentForm = document.getElementById('comment-form');
	const commentInput = document.getElementById('comment-input');
	const commentsList = document.getElementById('comments-list');

	function loadComments() {
		const comments = JSON.parse(localStorage.getItem('comments') || '[]');
		commentsList.innerHTML = '';
		if (comments.length === 0) {
			commentsList.innerHTML = '<p style="color:#888;">No comments yet.</p>';
			return;
		}
		comments.forEach((comment, idx) => {
			const div = document.createElement('div');
			div.style.marginBottom = '16px';
			div.style.padding = '10px';
			div.style.background = '#f7f7f7';
			div.style.borderRadius = '6px';
			div.innerHTML = `<strong style="color:#234b57;">Comment ${idx + 1}</strong><br><span>${comment}</span>`;
			commentsList.appendChild(div);
		});
	}

	commentForm.addEventListener('submit', function(e) {
		e.preventDefault();
		const value = commentInput.value.trim();
		if (!value) return;
		let comments = JSON.parse(localStorage.getItem('comments') || '[]');
		comments.push(value);
		localStorage.setItem('comments', JSON.stringify(comments));
		commentInput.value = '';
		loadComments();
	});

	loadComments();
});
