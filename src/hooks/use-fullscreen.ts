import {useCallback, useEffect, useRef, useState} from "react";

const getFullScreenElement = (): HTMLElement | null => {
    const doc = window.document;
    return doc.fullscreenElement as HTMLElement ?? null;
}

const exitFullScreen = () => {
    const doc = window.document;
    if (typeof doc.exitFullscreen === 'function') {
        return doc.exitFullscreen();
    }
    return null;
}

const enterFullScreen = (el: HTMLElement) => {
    if (typeof el.requestFullscreen === 'function') {
        return el.requestFullscreen?.()
    }
}

export function useFullScreen<T extends HTMLElement = any>() {
    const [fullScreen, setFullScreen] = useState<boolean>(false);
    const _ref = useRef<T>();

    const handleFullScreenChange = useCallback(
        (ev: Event) => {
            setFullScreen(ev.target === getFullScreenElement())
        },
        [setFullScreen]
    )

    const handleFullScreenError = useCallback(
        (ev: Event) => {
            setFullScreen(false);
            console.error(`useFullscreen: Error attempting fullscreen on ${ev.target}`, ev);
        },
        [setFullScreen]
    )

    const show = useCallback(
        async () => {
            if (!fullScreen) {
                await enterFullScreen(_ref.current!)
            }
        },
        []
    )

    const hide = useCallback(
        async () => {
            if (fullScreen) {
                await exitFullScreen()
            }
        },
        []
    )

    const ref = useCallback(
        (el: T | null) => {
            if (el === null) {
                _ref.current = window.document.documentElement as T;
            } else {
                _ref.current = el;
            }
        },
        []
    )

    useEffect(() => {
        if (!_ref.current && window.document) {
            _ref.current = window.document.documentElement as T;
            return () => {
                _ref.current?.addEventListener('onFullScreen', handleFullScreenChange);
                _ref.current?.addEventListener('onError', handleFullScreenError);
            }
        }
        if (_ref.current) {
            return () => {
                _ref.current?.addEventListener('onFullScreen', handleFullScreenChange);
                _ref.current?.addEventListener('onError', handleFullScreenError);
            }
        }
        return undefined;
    }, [_ref.current]);


    return {ref, show, hide, fullScreen} as const;
}
