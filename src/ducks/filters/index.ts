import {ARDivisionList, CustomerList} from "../../types";
import {createReducer} from "@reduxjs/toolkit";
import {loadOrders} from "../orders/actions";
import {basicCustomer, customerKey} from "../../utils";
import {loadDivisions} from "./actions";

export interface FiltersState {
    divisions: {
        list: ARDivisionList;
        loading: boolean;
    };
    customers: CustomerList;
    users: string[];
}

const initialState: FiltersState = {
    divisions: {
        list: {},
        loading: false,
    },
    customers: {},
    users: [],
}


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
                    state.customers[key] = basicCustomer(row);
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
