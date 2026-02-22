/**
 * AlgoViz - Main frontend interactivity
 * Theme toggle, search filter, back-to-top, animations
 */
(function () {
	'use strict';

	// ----- Theme -----
	function initTheme() {
		var saved = localStorage.getItem('algoviz-theme');
		if (saved === 'dark') {
			document.documentElement.setAttribute('data-theme', 'dark');
		} else {
			document.documentElement.removeAttribute('data-theme');
		}
	}

	function toggleTheme() {
		var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
		if (isDark) {
			document.documentElement.removeAttribute('data-theme');
			localStorage.setItem('algoviz-theme', 'light');
			if (window.themeBtn) themeBtn.textContent = '🌙';
		} else {
			document.documentElement.setAttribute('data-theme', 'dark');
			localStorage.setItem('algoviz-theme', 'dark');
			if (window.themeBtn) themeBtn.textContent = '☀️';
		}
	}

	// ----- Search filter -----
	function initSearch() {
		var input = document.querySelector('.search-input');
		var section = document.querySelector('.section');
		var noResults = document.querySelector('.no-results');
		if (!input || !section) return;

		input.addEventListener('input', function () {
			var q = (input.value || '').trim().toLowerCase();
			var cols = section.querySelectorAll('.col');
			var visibleCount = 0;
			cols.forEach(function (col) {
				var card = col.querySelector('.card');
				if (!card) return;
				var heading = (card.querySelector('.card__heading') || {}).textContent || '';
				var badges = card.querySelectorAll('.card-body .badge');
				var badgeText = Array.prototype.slice.call(badges).map(function (b) { return b.textContent || ''; }).join(' ');
				var match = !q || heading.toLowerCase().indexOf(q) >= 0 || badgeText.toLowerCase().indexOf(q) >= 0;
				col.classList.toggle('card-col-hidden', !match);
				if (match) visibleCount++;
			});
			if (noResults) noResults.classList.toggle('visible', visibleCount === 0);
		});
	}

	// ----- Back to top -----
	function initBackToTop() {
		var btn = document.querySelector('.back-to-top');
		if (!btn) return;

		window.addEventListener('scroll', function () {
			btn.classList.toggle('visible', window.scrollY > 400);
		});

		btn.addEventListener('click', function () {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}

	// ----- Run when DOM ready -----
	function init() {
		initTheme();

		window.themeBtn = document.querySelector('.theme-toggle');
		if (window.themeBtn) {
			window.themeBtn.addEventListener('click', toggleTheme);
			var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
			window.themeBtn.textContent = isDark ? '☀️' : '🌙';
		}

		initSearch();
		initBackToTop();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
