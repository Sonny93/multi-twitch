import { useEffect, useState } from 'react';

export function ThemeToggle() {
	const [isDark, setIsDark] = useState(true);

	useEffect(() => {
		// Récupérer le thème depuis localStorage ou utiliser le thème sombre par défaut
		const savedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches;

		const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
		setIsDark(shouldBeDark);

		// Appliquer immédiatement le thème pour éviter le flash
		if (shouldBeDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, []);

	useEffect(() => {
		// Appliquer le thème
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [isDark]);

	const toggleTheme = () => {
		setIsDark(!isDark);
	};

	return (
		<button
			onClick={toggleTheme}
			className="relative w-12 h-6 bg-dark-700 rounded-full p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900"
			aria-label={isDark ? 'Passer au thème clair' : 'Passer au thème sombre'}
		>
			<div
				className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
					isDark ? 'translate-x-6' : 'translate-x-0'
				}`}
			>
				{isDark ? (
					// Icône lune
					<svg
						className="w-3 h-3 text-dark-800 mt-0.5 ml-0.5"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
					</svg>
				) : (
					// Icône soleil
					<svg
						className="w-3 h-3 text-yellow-500 mt-0.5 ml-0.5"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
							clipRule="evenodd"
						/>
					</svg>
				)}
			</div>
		</button>
	);
}
