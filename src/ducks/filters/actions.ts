import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import type {ARDivisionList} from "../../types";
import {fetchARDivisions} from "../../api";
import type {RootState} from "../../app/configureStore";
import {selectDivisionsLoading} from "./selectors";

export const loadDivisions = createAsyncThunk<ARDivisionList>(
    'filters/loadDivisions',
    async () => {
        return await fetchARDivisions();
    }, {
        condition: (_, {getState}) => {
            const state = getState() as RootState;
            return !selectDivisionsLoading(state);
        }
    }
)

export const setRefreshInterval = createAction<number>('filters/setRefreshInterval');
