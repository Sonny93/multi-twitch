import { Head } from '@inertiajs/react';
import { StreamList } from '~/components/streams/stream_list';

const Home = () => (
	<>
		<Head title="Homepage" />
		<StreamList />
	</>
);

export default Home;
