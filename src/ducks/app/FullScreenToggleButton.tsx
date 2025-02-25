import React, {ChangeEvent, useEffect, useId, useState} from 'react';
import ToggleButton from "react-bootstrap/ToggleButton";
import {useSelector} from "react-redux";
import {selectIsFullScreen, toggleFullScreen} from "./index";
import {useAppDispatch} from "../../app/configureStore";

export default function FullScreenToggleButton() {
    const dispatch = useAppDispatch();
    const isFullScreen = useSelector(selectIsFullScreen);
    const id = useId();

    const toggleHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleFullScreen(ev.target.checked));
    }

    return (
        <ToggleButton id={id} value={1} onChange={toggleHandler} variant="outline-secondary" checked={isFullScreen} type="checkbox">
            {isFullScreen ? <span className="bi-fullscreen-exit" /> : <span className="bi-fullscreen" />}
        </ToggleButton>
    )
}
