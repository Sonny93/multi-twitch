import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router';

const HomeController = () => import('#controllers/home_controller');
const TwitchAuthController = () =>
	import('#controllers/twitch_auth_controller');

router
	.group(() => {
		router.get('/', [HomeController, 'render']);
	})
	.middleware(middleware.auth());

router
	.group(() => {
		router.get('/twitch', [TwitchAuthController, 'redirect']);
		router.get('/twitch/callback', [TwitchAuthController, 'callback']);
		router.get('/logout', [TwitchAuthController, 'logout']);
	})
	.prefix('/auth');
