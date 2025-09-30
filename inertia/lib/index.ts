export const getThumbnailUrl = ({
	url,
	width,
	height,
}: {
	url: string;
	width: number;
	height: number;
}) =>
	url
		.replace('{width}', width.toString())
		.replace('{height}', height.toString());
