import { TwitchStream } from '#types/twitch';
import { usePage } from '@inertiajs/react';
import type { InertiaPage } from '~/types/inertia';

export const useStreams = (): TwitchStream[] =>
	usePage<InertiaPage & { streams: TwitchStream[] }>().props.streams;

export const withStreams = <T extends object>(
	Component: React.ComponentType<T & { streams: TwitchStream[] }>
): React.ComponentType<Omit<T, 'streams'>> => {
	return (props: Omit<T, 'streams'>) => {
		const streams = useStreams();
		return <Component {...(props as T)} streams={streams} />;
	};
};
