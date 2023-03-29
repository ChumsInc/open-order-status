import {CustomerList, ARDivisionList} from "../../types";
import {createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import {fetchARDivisions} from "../../api";
import {loadOrders} from "../orders/actions";
import {customerKey} from "../../utils";
import {RootState} from "../../app/configureStore";

export interface FiltersState {
    divisions: {
        list: ARDivisionList;
        loading: boolean;
    };
    customers: CustomerList;
    users: string[];
}

const initialState:FiltersState = {
    divisions: {
        list: {},
        loading: false,
    },
    customers: {},
    users: [],
}

export const selectDivisionList = (state:RootState) => state.filters.divisions.list;
export const selectDivisionsLoading = (state:RootState) => state.filters.divisions.loading;
export const selectCustomerList = (state:RootState) => state.filters.customers;
export const selectUserNames = (state:RootState) => state.filters.users;

export const loadDivisions = createAsyncThunk<ARDivisionList>(
    'filters/loadDivisions',
    async () => {
        return await fetchARDivisions();
    }, {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !selectDivisionsLoading(state);
        }
    }
)

const filtersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loadDivisions.pending, (state) => {
        state.divisions.loading = true;
    })
        .addCase(loadDivisions.fulfilled, (state, action) => {
            state.divisions.loading = false;
            state.divisions.list = action.payload;
        })
        .addCase(loadDivisions.rejected, (state) => {
            state.divisions.loading = false;
        })
        .addCase(loadOrders.fulfilled, (state, action) => {
            state.customers = {};
            action.payload.forEach(row => {
                const key = customerKey(row);
                if (!state.customers[key]) {
                    state.customers[key] = row.CustomerName;
                }
                if (!state.users.includes(row.UserLogon)) {
                    state.users.push(row.UserLogon);
                }
            })
            state.users = action.payload.reduce((pv, cv) => {
                return (pv.includes(cv.UserLogon)) ? pv : [...pv, cv.UserLogon];
            }, [] as string[]).sort();
        })
})

export default filtersReducer;
