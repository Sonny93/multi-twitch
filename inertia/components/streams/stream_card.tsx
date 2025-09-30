import { TwitchStream } from '#types/twitch';
import { StreamThumbnail } from '~/components/streams/stream_thumbnail';

export const StreamCard = ({ stream }: { stream: TwitchStream }) => (
	<div className="rounded-none border-x-0 border-t-0 sticky top-0 z-50">
		<StreamThumbnail stream={stream} />
		<div className="p-2">
			<p className="text-sm font-medium">{stream.user_name}</p>
			<p className="text-sm text-gray-500">{stream.viewer_count} viewers</p>
		</div>
	</div>
);
