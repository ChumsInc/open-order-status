import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {OpenOrderStatusCode, SalesOrderRow, SalesOrderStatusData, ToggleExpandOrder} from "../../types";
import {fetchOrdersList, FetchOrdersOptions, postOrderStatus} from "../../api";
import {RootState} from "../../app/configureStore";
import {selectFetchOrderOptions, selectLoading, selectOrderGroup, selectSalesOrder} from "./selectors";
import {SortProps} from "chums-types";
import {Root} from "react-dom/client";

export const setARDivisionNoFilter = createAction<string>('orders/filters/setARDivisionNo');
export const setCustomerFilter = createAction<string|null>('orders/filters/setCustomer');
export const setUserFilter = createAction<string|null>('orders/filters/setUser');
export const setStatusFilter = createAction<string|null>('orders/filters/setStatus')

export const setPage = createAction<number>('orders/setPage');
export const setRowsPerPage = createAction<number>('orders/setRowsPerPage');
export const setSort = createAction<SortProps<SalesOrderRow>>('orders/setSort');

export const toggleImprint = createAction<boolean|undefined>('orders/filters/toggleImprint');
export const setMaxShipDate = createAction<string>('orders/filters/setMaxShipDate');
export const toggleShowOpen = createAction<boolean|undefined>('orders/filters/toggleOpen');
export const toggleShowLate = createAction<boolean|undefined>('orders/filters/toggleLate');
export const toggleShowBackorders = createAction<boolean|undefined>('orders/filters/toggleBackorders');
export const toggleShowOnCancelDate = createAction<boolean|undefined>('orders/filters/toggleOnCancelDate');
export const toggleShowPastCancelDate = createAction<boolean|undefined>('orders/filters/togglePastCancelDate');
export const toggleShowInvoicing = createAction<boolean|undefined>('orders/filters/toggleInvoicing');
export const toggleShowDollars = createAction<boolean|undefined>('orders/filters/toggleShowDollars');
export const toggleShowChums = createAction<boolean|undefined>('orders/filters/toggleShowChums');
export const toggleShowEDI = createAction<boolean|undefined>('orders/filters/toggleShowEDI');
export const toggleShowWeb = createAction<boolean|undefined>('orders/filters/toggleShowWeb');
export const toggleExpandGroup = createAction<ToggleExpandOrder>('orders/groups/toggleExpanded');
export const toggleExpandAllGroups = createAction<boolean|undefined>('orders/groups/expandAll');

export const loadOrders = createAsyncThunk<SalesOrderRow[]>(
    'orders/load',
    async (arg, {getState}) => {
        const state = getState() as RootState
        const options = selectFetchOrderOptions(state);
        return await fetchOrdersList(options);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !selectLoading(state);
        }
    }
)

export const saveOrderStatus = createAsyncThunk<SalesOrderRow|null, SalesOrderStatusData>(
    'orders/saveStatus',
    async (arg) => {
        return await postOrderStatus(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            const group = selectOrderGroup(state, arg.groupKey);
            if (!group) {
                return false;
            }
            const [salesOrder] = group.salesOrders.filter(row => row.SalesOrderNo === arg.SalesOrderNo);
            return !!salesOrder && !salesOrder.saving;
        }
    }
)
