import { PropsWithChildren } from 'react';
import 'virtual:uno.css';
import { Navbar } from '~/components/navbar';

export function BaseLayout({ children }: PropsWithChildren) {
	return (
		<div className="min-h-screen bg-default bg-gradient-to-br from-light-50 via-light-100 to-light-200 dark:from-dark-950 dark:via-dark-900 dark:to-dark-800">
			{/* Effet de particules en arrière-plan */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
			</div>

			{/* Navigation */}
			<Navbar />

			{/* Contenu principal */}
			<div className="relative z-10">{children}</div>
		</div>
	);
}
