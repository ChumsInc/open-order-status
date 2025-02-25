import {RootState} from "../../app/configureStore";
import {createSelector} from "@reduxjs/toolkit";
import {selectARDivisionNo} from "../orders/selectors";
import {customerSorter} from "@/utils/utils";

export const selectDivisionList = (state:RootState) => state.filters.divisions.list;
export const selectDivisionsLoading = (state:RootState) => state.filters.divisions.loading;
export const selectCustomerList = (state:RootState) => state.filters.customers;
export const selectUserNames = (state:RootState) => state.filters.users;
export const selectRefreshInterval = (state:RootState) => state.filters.refreshInterval;

export const selectFilteredCustomers = createSelector(
    [selectCustomerList, selectARDivisionNo],
    (customers, divisionNo) => {
        return Object.values(customers)
            .filter(customer => !divisionNo || customer.ARDivisionNo === divisionNo)
            .sort(customerSorter)
    }
)
