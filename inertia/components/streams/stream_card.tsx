import { TwitchStream } from '#types/twitch';
import clsx from 'clsx';
import { StreamThumbnail } from '~/components/streams/stream_thumbnail';
import { useSelectedStreams } from '~/stores/selected_streams';

export function StreamCard({ stream }: { stream: TwitchStream }) {
	const toggleStream = useSelectedStreams((state) => state.toggleStream);
	const isNotSelected = useSelectedStreams(
		(state) => !state.isSelected(stream) && state.streams.length > 0
	);
	return (
		<div
			className={clsx(
				'rounded-none border-x-0 border-t-0 sticky top-0 z-50 transition-opacity duration-200 cursor-pointer',
				{
					'opacity-25': isNotSelected,
				}
			)}
			onClick={() => {
				toggleStream(stream);
			}}
		>
			<StreamThumbnail stream={stream} />
			<div className="p-2">
				<p className="text-sm font-medium">{stream.user_name}</p>
				<p className="text-sm text-gray-500">{stream.viewer_count} viewers</p>
			</div>
		</div>
	);
}
