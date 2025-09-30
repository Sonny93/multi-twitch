import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http';

export default class TwitchAuthController {
	async redirect(ctx: HttpContext) {
		return ctx.ally.use('twitch').redirect();
	}

	async callback(ctx: HttpContext) {
		const provider = ctx.ally.use('twitch');
		if (provider.accessDenied()) {
			return this.redirectWithFlash(ctx, 'Access denied');
		}

		if (provider.stateMisMatch()) {
			return this.redirectWithFlash(ctx, 'Request expired');
		}

		if (provider.hasError()) {
			return this.redirectWithFlash(
				ctx,
				provider.getError() || 'An error occurred'
			);
		}

		const userProvider = await provider.user();
		const user = await User.updateOrCreate(
			{
				providerId: userProvider.id,
			},
			{
				providerId: userProvider.id,
				email: userProvider.email,
				name: userProvider.name,
				nickName: userProvider.nickName,
				avatarUrl: userProvider.avatarUrl,
				token: userProvider.token,
				providerType: 'twitch',
			}
		);

		await ctx.auth.use('web').login(user);
		ctx.logger.info(`[${user.name}] auth success`);
		ctx.response.redirect('/');
	}

	async logout(ctx: HttpContext) {
		await ctx.auth.use('web').logout();
		ctx.response.redirect('/');
	}

	private redirectWithFlash(ctx: HttpContext, flash: string) {
		const userName = ctx.auth.user?.fullname;
		ctx.logger.info(`${userName && `[${userName}] `}${flash.toLowerCase()}`);
		ctx.session.flash('flash', flash);
		ctx.response.redirect('/');
	}
}
