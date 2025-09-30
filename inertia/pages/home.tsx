import { Head, router } from '@inertiajs/react';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { StreamList } from '~/components/streams/stream_list';
import { useShortcut } from '~/hooks/use_shortcut';
import { useStreams } from '~/hooks/use_streams';
import { HomeLayout } from '~/layouts/home_layout';
import { useSelectedStreams } from '~/stores/selected_streams';

function Home() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const normalizedSearchTerm = searchTerm.trim().toLowerCase();

	const streams = useStreams();

	const clearStreams = useSelectedStreams((state) => state.clearStreams);
	const addStreams = useSelectedStreams((state) => state.addStreams);

	const reloadStreams = () =>
		router.get('/', undefined, {
			only: ['streams'],
		});

	const handleAddFilteredStreams = useCallback(() => {
		const filtered = streams.filter((stream) =>
			stream.user_name.toLowerCase().includes(normalizedSearchTerm)
		);
		addStreams(filtered);
		setSearchTerm('');
	}, [streams, normalizedSearchTerm, addStreams]);

	useShortcut({ shortcut: 'escape', callback: clearStreams });
	useShortcut({
		shortcut: 'a',
		ctrl: true,
		callback: handleAddFilteredStreams,
		cancelPropagatedEvents: true,
	});

	const selectedStreams = useSelectedStreams((state) => state.streams);
	return (
		<>
			<Head title="Homepage" />
			<div className="flex justify-center gap-4 w-[250px] mb-4">
				<button
					className="btn-secondary select-none rounded-md"
					onClick={reloadStreams}
				>
					Reload
				</button>
				<button
					className={clsx('btn-secondary select-none rounded-md', {
						'opacity-50': selectedStreams.length === 0,
						'pointer-events-none': selectedStreams.length === 0,
						'cursor-not-allowed': selectedStreams.length === 0,
					})}
					onClick={clearStreams}
				>
					Clear
				</button>
			</div>
			<div className="flex gap-4">
				<StreamList searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				{selectedStreams.length > 0 && (
					<div
						className="grid gap-4 w-full"
						style={{
							gridTemplateColumns: `repeat(${selectedStreams.length}, minmax(350px, 1fr))`,
						}}
					>
						{selectedStreams.map((stream) => (
							<div key={stream.id} className="flex flex-col gap-4">
								<iframe
									src={`https://player.twitch.tv/?channel=${stream.user_login}&parent=${window.location.hostname}`}
									allowFullScreen
									className="aspect-video w-full"
								/>
								<iframe
									src={`https://www.twitch.tv/embed/${stream.user_login}/chat?parent=${window.location.hostname}`}
									allowFullScreen
									className="aspect-video w-full"
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
}

Home.layout = (children: React.ReactNode) => (
	<HomeLayout>{children}</HomeLayout>
);
export default Home;
