import { StreamCard } from '~/components/streams/stream_card';
import { useStreams } from '~/hooks/use_streams';

interface StreamListProps {
	searchTerm: string;
	setSearchTerm: (searchTerm: string) => void;
}

export function StreamList({ searchTerm, setSearchTerm }: StreamListProps) {
	const streams = useStreams();
	const streamsFiltered = streams.filter((stream) =>
		stream.user_name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="flex flex-col gap-4 w-[250px] flex-shrink-0">
			<input
				type="text"
				placeholder="Search"
				className="input px-4 py-2 rounded-md"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<ul className="flex flex-col gap-4">
				{streamsFiltered.map((stream) => (
					<li key={stream.id}>
						<StreamCard stream={stream} />
					</li>
				))}
			</ul>
		</div>
	);
}
