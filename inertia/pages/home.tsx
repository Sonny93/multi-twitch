import { Head, router } from '@inertiajs/react';
import clsx from 'clsx';
import { StreamList } from '~/components/streams/stream_list';
import { useShortcut } from '~/hooks/use_shortcut';
import { useStreams } from '~/hooks/use_streams';
import { useSelectedStreams } from '~/stores/selected_streams';

function Home() {
	const streams = useStreams();
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
		callback: () => {
			toggleAllStreams(streams);
		},
		cancelPropagatedEvents: true,
	});

	const isAllStreamsSelected =
		streams.length > 0 && countSelectedStreams === streams.length;

	return (
		<>
			<Head title="Homepage" />
			<div className="flex justify-between items-center mb-4">
				<button className="btn-secondary select-none" onClick={reloadStreams}>
					Reload streams
				</button>
				<div
					className={clsx('flex justify-center gap-4', {
						'opacity-25': countSelectedStreams === 0,
						'cursor-not-allowed': countSelectedStreams === 0,
						'pointer-events-none': countSelectedStreams === 0,
					})}
				>
					<button className="btn-secondary select-none" onClick={clearStreams}>
						{isAllStreamsSelected
							? 'Clear all'
							: `Clear ${countSelectedStreams}`}{' '}
						stream
					</button>
					<button className="btn-primary select-none">
						{isAllStreamsSelected
							? 'Start all'
							: `Start ${countSelectedStreams}`}{' '}
						stream
					</button>
				</div>
			</div>
			<StreamList />
		</>
	);
}

export default Home;
