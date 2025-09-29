import { Head } from '@inertiajs/react';
import { useAuth } from '~/hooks/use_auth';

export default function Home() {
	const auth = useAuth();
	return (
		<>
			<Head title="Homepage" />
			coucou
			{!auth.isAuthenticated ? (
				<a href="/auth/twitch">Login with Twitch</a>
			) : (
				<a href="/auth/logout">Logout</a>
			)}
		</>
	);
}
