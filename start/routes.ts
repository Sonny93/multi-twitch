import router from '@adonisjs/core/services/router';

const TwitchAuthController = () =>
	import('#controllers/twitch_auth_controller');

router.on('/').renderInertia('home');
router
	.group(() => {
		router.get('/twitch', [TwitchAuthController, 'redirect']);
		router.get('/twitch/callback', [TwitchAuthController, 'callback']);
		router.get('/logout', [TwitchAuthController, 'logout']);
	})
	.prefix('/auth');
