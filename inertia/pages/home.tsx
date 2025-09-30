import { Head, router } from '@inertiajs/react';
import clsx from 'clsx';
import { useState } from 'react';
import { StreamList } from '~/components/streams/stream_list';
import { useShortcut } from '~/hooks/use_shortcut';
import { useStreams } from '~/hooks/use_streams';
import { useSelectedStreams } from '~/stores/selected_streams';

function Home() {
	const [searchTerm, setSearchTerm] = useState<string>('');

	const streams = useStreams();
	const streamsFiltered = streams.filter((stream) =>
		stream.user_name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const countSelectedStreams = useSelectedStreams(
		(state) => state.streams.length
	);
	const clearStreams = useSelectedStreams((state) => state.clearStreams);
	const toggleAllStreams = useSelectedStreams(
		(state) => state.toggleAllStreams
	);

	const reloadStreams = () =>
		router.get('/', undefined, {
			only: ['streams'],
		});

	useShortcut({ shortcut: 'escape', callback: clearStreams });
	useShortcut({
		shortcut: 'a',
		ctrl: true,
		callback: () => toggleAllStreams(streamsFiltered),
		cancelPropagatedEvents: true,
	});

	const isAllStreamsSelected =
		streams.length > 0 && countSelectedStreams === streams.length;

	const selectedStreams = useSelectedStreams((state) => state.streams);
	return (
		<>
			<Head title="Homepage" />
			<div className="flex justify-between items-center mb-4">
				<button
					className="btn-secondary select-none rounded-md"
					onClick={reloadStreams}
				>
					Reload streams
				</button>
				<input
					type="text"
					placeholder="Search"
					className="input px-4 py-2 rounded-md"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<div
					className={clsx('flex justify-center gap-4', {
						'opacity-25': countSelectedStreams === 0,
						'cursor-not-allowed': countSelectedStreams === 0,
						'pointer-events-none': countSelectedStreams === 0,
					})}
				>
					<button
						className="btn-secondary select-none rounded-md"
						onClick={clearStreams}
					>
						{isAllStreamsSelected
							? 'Clear all'
							: `Clear ${countSelectedStreams}`}{' '}
						stream
					</button>
					<button className="btn-primary select-none rounded-md">
						{isAllStreamsSelected
							? 'Start all'
							: `Start ${countSelectedStreams}`}{' '}
						stream
					</button>
				</div>
			</div>
			<StreamList streams={streamsFiltered} />
			---
			{selectedStreams.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{selectedStreams.map((stream) => (
						<div className="flex flex-col gap-4">
							<iframe
								src={`https://player.twitch.tv/?channel=${stream.user_login}&parent=${window.location.hostname}`}
								allowFullScreen
								className="aspect-video"
								key={stream.id}
							/>
							<iframe
								src={`https://www.twitch.tv/embed/${stream.user_login}/chat?parent=${window.location.hostname}`}
								allowFullScreen
								className="aspect-video"
								key={stream.id}
							/>
						</div>
					))}
				</div>
			)}
		</>
	);
}

export default Home;
