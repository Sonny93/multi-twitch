import { Head } from '@inertiajs/react';

export default function Home() {
	return (
		<>
			<Head title="Homepage" />

			<div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
				<h1 className="text-6xl md:text-8xl font-bold text-primary">
					<span className="text-gradient">MultiTwitch</span>
				</h1>
			</div>
		</>
	);
}
