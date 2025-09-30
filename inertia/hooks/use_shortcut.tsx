import { useCallback, useEffect, useRef } from 'react';

export const useShortcut = ({
	shortcut,
	ctrl,
	callback,
	cancelPropagatedEvents = true,
	enable = true,
}: {
	shortcut: string;
	ctrl?: boolean;
	callback: () => void;
	cancelPropagatedEvents?: boolean;
	enable?: boolean;
}): void => {
	const callbackRef = useRef(callback);
	callbackRef.current = callback;

	const stableCallback = useCallback(() => {
		callbackRef.current();
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (
				e.key.toLowerCase() === shortcut.toLowerCase() &&
				(ctrl ? e.ctrlKey : true) &&
				enable
			) {
				if (cancelPropagatedEvents) {
					e.preventDefault();
					e.stopPropagation();
					e.stopImmediatePropagation();
				}
				stableCallback();
			}
		};

		if (enable) {
			document.addEventListener('keydown', handleKeyDown, { capture: true });
		} else {
			document.removeEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [shortcut, ctrl, stableCallback, enable]);
};
