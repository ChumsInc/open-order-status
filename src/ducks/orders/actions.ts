import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {BasicCustomer, SalesOrderRow, SalesOrderStatusData, SalesOrderStatusRow, ToggleExpandOrder} from "../../types";
import {fetchOrdersList, postOrderStatus} from "../../api";
import {RootState} from "../../app/configureStore";
import {selectFetchOrderOptions, selectLoading, selectOrderGroup} from "./selectors";
import {SortProps} from "chums-types";

export const setARDivisionNoFilter = createAction<string>('orders/filters/setARDivisionNo');
export const setCustomerFilter = createAction<BasicCustomer | null>('orders/filters/setCustomer');
export const setUserFilter = createAction<string | null>('orders/filters/setUser');
export const setStatusFilter = createAction<string | null>('orders/filters/setStatus');
export const setSalesOrderFilter = createAction<string | null>('orders/filters/setSalesOrder');

export const setPage = createAction<number>('orders/setPage');
export const setRowsPerPage = createAction<number>('orders/setRowsPerPage');
export const setSort = createAction<SortProps<SalesOrderRow>>('orders/setSort');

export const toggleImprint = createAction<boolean>('orders/filters/toggleImprint');
export const setLeadTime = createAction<number>('orders/filters/setLeadTime');
export const toggleShowOpen = createAction<boolean>('orders/filters/toggleOpen');
export const toggleShowLate = createAction<boolean>('orders/filters/toggleLate');
export const toggleShowBackorders = createAction<boolean>('orders/filters/toggleBackorders');
export const toggleShowOnCancelDate = createAction<boolean>('orders/filters/toggleOnCancelDate');
export const toggleShowPastCancelDate = createAction<boolean>('orders/filters/togglePastCancelDate');
export const toggleShowInvoicing = createAction<boolean>('orders/filters/toggleInvoicing');
export const toggleShowChums = createAction<boolean>('orders/filters/toggleShowChums');
export const toggleShowEDI = createAction<boolean>('orders/filters/toggleShowEDI');
export const toggleShowTest = createAction<boolean>('orders/filters/toggleShowTest');
export const toggleShowWeb = createAction<boolean>('orders/filters/toggleShowWeb');
export const toggleExpandGroup = createAction<ToggleExpandOrder>('orders/groups/toggleExpanded');
export const toggleExpandAllGroups = createAction<boolean | undefined>('orders/groups/expandAll');

export interface LoadOrdersResponse {
    orders: SalesOrderRow[],
    updated: string;
}

export const loadOrders = createAsyncThunk<LoadOrdersResponse>(
    'orders/load',
    async (arg, {getState}) => {
        const state = getState() as RootState
        const options = selectFetchOrderOptions(state);
        const orders = await fetchOrdersList(options);
        return {
            orders,
            updated: new Date().toISOString(),
        }
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !selectLoading(state);
        }
    }
)

export const saveOrderStatus = createAsyncThunk<SalesOrderStatusRow | null, SalesOrderStatusData>(
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

export const saveGroupStatus = createAsyncThunk<void, SalesOrderStatusData>(
    'orders/saveGroupStatus',
    async (arg, {dispatch, getState}) => {
        const state = getState() as RootState;
        const group = selectOrderGroup(state, arg.groupKey);
        for await (const so of group?.salesOrders ?? []) {
            const data: SalesOrderStatusData = {
                id: so.status?.id ?? 0,
                groupKey: arg.groupKey,
                SalesOrderNo: so.SalesOrderNo,
                StatusCode: arg.StatusCode ?? so.status?.StatusCode ?? '',
                Notes: arg.Notes ?? so.status?.Notes ?? '',
            }
            await dispatch(saveOrderStatus(data));
        }
    }, {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            const group = selectOrderGroup(state, arg.groupKey);
            return !!group && !group?.saving;
        }
    }
)
