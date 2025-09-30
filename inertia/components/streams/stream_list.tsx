import { StreamCard } from '~/components/streams/stream_card';
import { withStreams } from '~/hooks/use_streams';

export const StreamList = withStreams(({ streams }) => (
	<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
		{streams.map((stream) => (
			<li key={stream.id}>
				<StreamCard stream={stream} />
			</li>
		))}
	</ul>
));
