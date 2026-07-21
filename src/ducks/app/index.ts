import {createAction, createReducer} from "@reduxjs/toolkit";
import type {RootState} from "../../app/configureStore";

export interface AppState {
    fullScreen: boolean;
}

const initialAppState: AppState = {
    fullScreen: false,
}

export const toggleFullScreen = createAction<boolean | undefined>('app/toggleFullScreen');
export const selectIsFullScreen = (state: RootState) => state.app.fullScreen;

const appReducer = createReducer(initialAppState, builder => {
    builder.addCase(toggleFullScreen, (state, action) => {
        state.fullScreen = action.payload ?? !state.fullScreen;
    })
});

export default appReducer;
