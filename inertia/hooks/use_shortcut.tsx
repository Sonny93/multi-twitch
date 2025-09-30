import { useEffect } from 'react';

export const useShortcut = ({
	shortcut,
	ctrl,
	callback,
	cancelPropagatedEvents = true,
}: {
	shortcut: string;
	ctrl?: boolean;
	callback: () => void;
	cancelPropagatedEvents?: boolean;
}): void => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (
				e.key.toLowerCase() === shortcut.toLowerCase() &&
				(ctrl ? e.ctrlKey : true)
			) {
				if (cancelPropagatedEvents) {
					e.preventDefault();
					e.stopPropagation();
					e.stopImmediatePropagation();
				}
				callback();
			}
		};
		document.addEventListener('keydown', handleKeyDown, { capture: true });
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [shortcut, ctrl, callback]);
};
