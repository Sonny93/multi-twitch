import AppBaseModel from '#models/app_base_model';
import { type TwitchToken } from '#types/twitch';
import { column, computed } from '@adonisjs/lucid/orm';

export default class User extends AppBaseModel {
	@column()
	declare email: string;

	@column()
	declare name: string;

	@column()
	declare nickName: string; // public username

	@column()
	declare avatarUrl: string;

	@column({ serializeAs: null })
	declare token?: TwitchToken;

	@column({ serializeAs: null })
	declare providerId: number;

	@column({ serializeAs: null })
	declare providerType: 'twitch';

	@computed()
	get fullname() {
		return this.nickName || this.name;
	}
}
