import {OpenOrderStatusCode, OpenOrderStatusGroup} from "../../types";
import {createAction, createAsyncThunk, createReducer, createSelector} from "@reduxjs/toolkit";
import {fetchStatusList} from "../../api";
import {RootState} from "../../app/configureStore";

export interface OrderStatusState {
    list: OpenOrderStatusCode[];
    current: OpenOrderStatusCode|null;
    loading: boolean;
    loaded: boolean;
}


export const initialState: OrderStatusState = {
    list: [],
    current: null,
    loading: false,
    loaded: false,
}


export const selectStatusList = (state: RootState) => state.orderStatus.list;
export const selectStatusLoading = (state: RootState) => state.orderStatus.loading;

export const selectStatusCode = (state:RootState, code:string|null) => code;
export const selectStatusByCode = createSelector(
    [selectStatusList, selectStatusCode],
    (list, code) => {
        const [status] = list.filter(status => status.StatusCode === code);
        return status ?? null;
    }
)



export const statusSorter = (a: OpenOrderStatusCode, b: OpenOrderStatusCode) => {
    return a.priority === b.priority
        ? (a.StatusDescription.toLowerCase() > b.StatusDescription.toLowerCase() ? 1 : -1)
        : a.priority - b.priority;
}

export const groupTitle = (val: OpenOrderStatusGroup): string => {
    switch (val) {
    case 'imp':
        return 'Imprint';
    case 'shipping':
        return 'Shipping';
    case 'cs':
        return 'Customer Service';
    }
}


export const setCurrentStatus = createAction<number|undefined>('order-status/setCurrent');
export const loadStatusList = createAsyncThunk<OpenOrderStatusCode[]>(
    'order-status/load',
    async () => {
        return await fetchStatusList();
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !selectStatusLoading(state);
        }
    }
)

const orderStatusReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loadStatusList.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadStatusList.fulfilled, (state, action) => {
            state.loading = false;
            state.loaded = true;
            state.list = action.payload.sort(statusSorter);
            if (state.current) {
                const [current] = state.list.filter(row => row.id === state.current?.id);
                state.current = current ?? null;
            }
        })
        .addCase(loadStatusList.rejected, (state) => {
            state.loading = false;
        })
        .addCase(setCurrentStatus, (state, action) => {
            const [current] = state.list.filter(row => row.id === action.payload);
            state.current = current ?? null;
        })

});

export default orderStatusReducer;
