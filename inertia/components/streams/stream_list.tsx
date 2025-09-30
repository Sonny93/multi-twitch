import { TwitchStream } from '#types/twitch';
import { StreamCard } from '~/components/streams/stream_card';

interface StreamListProps {
	streams: TwitchStream[];
}

export const StreamList = ({ streams }: StreamListProps) => (
	<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
		{streams.map((stream) => (
			<li key={stream.id}>
				<StreamCard stream={stream} />
			</li>
		))}
	</ul>
);
