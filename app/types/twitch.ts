export type TwitchToken = {
	expiresAt: Date;
	expiresIn: number;
	refreshToken: string;
	scope: string[];
	token: string;
	type: 'bearer';
};
