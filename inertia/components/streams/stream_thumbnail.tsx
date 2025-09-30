import { TwitchStream } from '#types/twitch';
import { getThumbnailUrl } from '~/lib';

const THUMBNAIL_WIDTH = 720;
const THUMBNAIL_HEIGHT = (THUMBNAIL_WIDTH * 9) / 16;

export const StreamThumbnail = ({ stream }: { stream: TwitchStream }) => (
	<img
		src={getThumbnailUrl({
			url: stream.thumbnail_url,
			width: THUMBNAIL_WIDTH,
			height: THUMBNAIL_HEIGHT,
		})}
		alt={stream.title}
		referrerPolicy="no-referrer"
		className="w-full aspect-video rounded-md select-none"
	/>
);
