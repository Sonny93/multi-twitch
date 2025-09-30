import { ThemeToggle } from './theme_toggle';

export function Navbar() {
	return (
		<nav className="glass rounded-none border-x-0 border-t-0 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="text-2xl font-bold text-gradient">MultiTwitch</div>
					<div className="hidden md:flex space-x-8">
						<a
							href="#"
							className="text-secondary hover:text-primary-400 transition-colors duration-200"
						>
							Accueil
						</a>
						<a
							href="#"
							className="text-secondary hover:text-primary-400 transition-colors duration-200"
						>
							Streams
						</a>
						<a
							href="#"
							className="text-secondary hover:text-primary-400 transition-colors duration-200"
						>
							Communauté
						</a>
					</div>
					<div className="flex items-center space-x-4">
						<ThemeToggle />
						<button className="btn-secondary">Connexion</button>
						<button className="btn-primary">S'inscrire</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
