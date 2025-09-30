export type TwitchToken = {
	expiresAt: Date;
	expiresIn: number;
	refreshToken: string;
	scope: string[];
	token: string;
	type: 'bearer';
};

export type TwitchStream = {
	game_id: string;
	game_name: string;
	id: string;
	is_mature: false;
	language: string;
	started_at: string;
	tag_ids: [];
	tags: string[];
	thumbnail_url: string;
	title: string;
	type: string;
	user_id: string;
	user_login: string;
	user_name: string;
	viewer_count: number;
};

export type TwitchFollowedStreamsResponse = {
	data: TwitchStream[];
	pagination?: {
		cursor?: string;
	};
};
