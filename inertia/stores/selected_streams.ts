import { TwitchStream } from '#types/twitch';
import { create } from 'zustand';

type SelectedStreamsState = {
	streams: TwitchStream[];
	addStream: (stream: TwitchStream) => void;
	removeStream: (stream: TwitchStream) => void;
	clearStreams: () => void;
	toggleStream: (stream: TwitchStream) => void;
	addStreams: (streams: TwitchStream[]) => void;
	isSelected: (stream: TwitchStream) => boolean;
};

export const useSelectedStreams = create<SelectedStreamsState>((set, get) => ({
	streams: [] as TwitchStream[],
	addStream: (stream) =>
		set((state) => ({ streams: [...state.streams, stream] })),
	removeStream: (stream) =>
		set((state) => ({
			streams: state.streams.filter((s) => s.id !== stream.id),
		})),
	clearStreams: () => set({ streams: [] }),
	toggleStream: (stream) =>
		set((state) => ({
			streams: state.streams.some((s) => s.id === stream.id)
				? state.streams.filter((s) => s.id !== stream.id)
				: [...state.streams, stream],
		})),
	addStreams: (streams) =>
		set((state) => ({ streams: [...state.streams, ...streams] })),
	isSelected: (stream) => get().streams.some((s) => s.id === stream.id),
}));
