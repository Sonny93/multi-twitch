import presetWebFonts from '@unocss/preset-web-fonts';
import { defineConfig, presetWind4 } from 'unocss';

export default defineConfig({
	presets: [
		presetWind4({
			dark: 'class',
		}),
		presetWebFonts({
			provider: 'bunny',
			fonts: {
				sans: 'Poppins',
			},
		}),
	],
	theme: {
		colors: {
			// Palette de couleurs pour thème clair et sombre
			light: {
				50: '#f8fafc',
				100: '#f1f5f9',
				200: '#e2e8f0',
				300: '#cbd5e1',
				400: '#94a3b8',
				500: '#64748b',
				600: '#475569',
				700: '#334155',
				800: '#1e293b',
				900: '#0f172a',
				950: '#020617',
			},
			dark: {
				50: '#f8fafc',
				100: '#f1f5f9',
				200: '#e2e8f0',
				300: '#cbd5e1',
				400: '#94a3b8',
				500: '#64748b',
				600: '#475569',
				700: '#334155',
				800: '#1e293b',
				900: '#0f172a',
				950: '#020617',
			},
			primary: {
				50: '#f0f9ff',
				100: '#e0f2fe',
				200: '#bae6fd',
				300: '#7dd3fc',
				400: '#38bdf8',
				500: '#0ea5e9',
				600: '#0284c7',
				700: '#0369a1',
				800: '#075985',
				900: '#0c4a6e',
				950: '#082f49',
			},
			accent: {
				50: '#fdf4ff',
				100: '#fae8ff',
				200: '#f5d0fe',
				300: '#f0abfc',
				400: '#e879f9',
				500: '#d946ef',
				600: '#c026d3',
				700: '#a21caf',
				800: '#86198f',
				900: '#701a75',
				950: '#4a044e',
			},
			success: {
				50: '#f0fdf4',
				100: '#dcfce7',
				200: '#bbf7d0',
				300: '#86efac',
				400: '#4ade80',
				500: '#22c55e',
				600: '#16a34a',
				700: '#15803d',
				800: '#166534',
				900: '#14532d',
				950: '#052e16',
			},
			warning: {
				50: '#fffbeb',
				100: '#fef3c7',
				200: '#fde68a',
				300: '#fcd34d',
				400: '#fbbf24',
				500: '#f59e0b',
				600: '#d97706',
				700: '#b45309',
				800: '#92400e',
				900: '#78350f',
				950: '#451a03',
			},
			danger: {
				50: '#fef2f2',
				100: '#fee2e2',
				200: '#fecaca',
				300: '#fca5a5',
				400: '#f87171',
				500: '#ef4444',
				600: '#dc2626',
				700: '#b91c1c',
				800: '#991b1b',
				900: '#7f1d1d',
				950: '#450a0a',
			},
		},
	},
	shortcuts: {
		// Composants réutilisables avec support thème clair/sombre
		'btn-primary':
			'bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-900 focus:ring-offset-light-50',
		'btn-secondary':
			'bg-light-200 hover:bg-light-300 dark:bg-dark-700 dark:hover:bg-dark-600 text-light-900 dark:text-dark-100 px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-light-500 dark:focus:ring-dark-500 focus:ring-offset-2 dark:focus:ring-offset-dark-900 focus:ring-offset-light-50',
		'btn-accent':
			'bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 dark:focus:ring-offset-dark-900 focus:ring-offset-light-50',
		card: 'bg-light-50 border border-light-200 dark:bg-dark-800 dark:border-dark-700 rounded-xl p-6 shadow-xl',
		input:
			'bg-light-50 border border-light-300 text-light-900 placeholder-light-500 dark:bg-dark-800 dark:border-dark-600 dark:text-dark-100 dark:placeholder-dark-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200',
		'text-gradient':
			'bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent',
		glass:
			'bg-light-50/50 dark:bg-dark-800/50 backdrop-blur-lg border border-light-200/50 dark:border-dark-700/50',
		'bg-main': 'bg-light-50 dark:bg-dark-900',
		'bg-secondary': 'bg-light-100 dark:bg-dark-800',
		'text-primary': 'text-light-900 dark:text-dark-100',
		'text-secondary': 'text-light-600 dark:text-dark-300',
		'border-primary': 'border-light-200 dark:border-dark-700',
		'bg-default': 'bg-light-50 dark:bg-dark-950',
	},
	safelist: [
		// Assurer que les classes de thème sont toujours générées
		'dark',
		'bg-dark-950',
		'bg-light-50',
	],
	preflights: [
		{
			getCSS: () => `
				/* Assurer que le thème sombre est appliqué par défaut */
				html.dark {
					color-scheme: dark;
				}
				html:not(.dark) {
					color-scheme: light;
				}
				/* Éviter le flash blanc */
				html {
					background-color: #020617; /* dark-950 */
				}
				html:not(.dark) {
					background-color: #f8fafc; /* light-50 */
				}
			`,
		},
	],
});
