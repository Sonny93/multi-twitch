import User from '#models/user';
import {
	type TwitchFollowedStreamsResponse,
	type TwitchStream,
} from '#types/twitch';

export class TwitchService {
	private readonly TWITCH_API_BASE = 'https://api.twitch.tv/helix';

	async getFollowedLiveStreamsPaginated(
		user: User,
		first: number = 20,
		after?: string
	): Promise<TwitchFollowedStreamsResponse> {
		if (!user.token?.token) {
			throw new Error('Token Twitch manquant pour cet utilisateur');
		}

		const params = new URLSearchParams({
			user_id: user.providerId.toString(),
			first: first.toString(),
		});

		if (after) {
			params.append('after', after);
		}

		const url = `${this.TWITCH_API_BASE}/streams/followed?${params}`;

		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${user.token.token}`,
				'Client-Id': process.env.TWITCH_CLIENT_ID!,
			},
		});

		if (!response.ok) {
			throw new Error(
				`Erreur API Twitch: ${response.status} ${response.statusText}`
			);
		}

		return (await response.json()) as TwitchFollowedStreamsResponse;
	}

	isTokenValid(user: User): boolean {
		if (!user.token) {
			return false;
		}

		return new Date() < user.token.expiresAt;
	}

	async getAllFollowedLiveStreams(user: User): Promise<TwitchStream[]> {
		const allStreams: TwitchStream[] = [];
		let cursor: string | undefined;
		const pageSize = 100;

		do {
			const response = await this.getFollowedLiveStreamsPaginated(
				user,
				pageSize,
				cursor
			);
			allStreams.push(...response.data);
			cursor = response.pagination?.cursor;
		} while (cursor);

		return allStreams;
	}
}
