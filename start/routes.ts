import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router';

const TwitchAuthController = () =>
	import('#controllers/twitch_auth_controller');

router
	.group(() => {
		router.get('/', (ctx) => ctx.inertia.render('home'));
	})
	.middleware(middleware.auth());

router
	.group(() => {
		router.get('/twitch', [TwitchAuthController, 'redirect']);
		router.get('/twitch/callback', [TwitchAuthController, 'callback']);
		router.get('/logout', [TwitchAuthController, 'logout']);
	})
	.prefix('/auth');
