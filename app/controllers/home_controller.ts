import { TwitchService } from '#services/twitch_service';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class HomeController {
	constructor(private twitchService: TwitchService) {}

	async render(ctx: HttpContext) {
		return ctx.inertia.render('home', {
			streams: await this.twitchService.getAllFollowedLiveStreams(
				ctx.auth.user!
			),
		});
	}
}
