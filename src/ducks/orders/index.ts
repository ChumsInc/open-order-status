import {BasicCustomer, SalesOrderGroupList, SalesOrderRow, SalesOrderTotals} from "../../types";
import {SortProps} from "chums-types";
import {createReducer} from "@reduxjs/toolkit";
import {buildTotals, defaultOrderSorter, groupKey, initialState} from "./utils";
import {
    loadOrders,
    saveGroupStatus,
    saveOrderStatus,
    setARDivisionNoFilter,
    setCustomerFilter,
    setMaxShipDate,
    setPage,
    setRowsPerPage, setSalesOrderFilter,
    setSort,
    setStatusFilter,
    setUserFilter,
    toggleExpandAllGroups,
    toggleExpandGroup,
    toggleImprint,
    toggleShowBackorders,
    toggleShowChums,
    toggleShowDollars,
    toggleShowEDI,
    toggleShowInvoicing,
    toggleShowLate,
    toggleShowOnCancelDate,
    toggleShowOpen,
    toggleShowPastCancelDate,
    toggleShowWeb
} from "./actions";
import dayjs from "dayjs";
import Decimal from "decimal.js";
import {VALUE_VARIES} from "../../utils";
import {storageKeys} from "../../api/preferences";
import {LocalStore} from "chums-components";


export interface OrdersState {
    grouping: SalesOrderGroupList;
    loading: boolean;
    loaded: boolean;
    filters: {
        imprint: boolean;
        maxShipDate: string;
        arDivisionNo: string;
        customer: BasicCustomer | null;
        salesOrderNo: string|null;
        user: string | null;
        status: string | null;
        onTimeOrders: boolean;
        lateOrders: boolean;
        backOrders: boolean;
        onCancelDate: boolean;
        pastCancelDate: boolean;
        invoicing: boolean;
        showChums: boolean;
        showEDI: boolean;
        showWeb: boolean;
        showDollars: boolean;
    }
    expandAll: boolean;
    totals: SalesOrderTotals;
    page: number;
    rowsPerPage: number;
    sort: SortProps<SalesOrderRow>;
    updated: string|null;
}

const ordersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(toggleImprint, (state, action) => {
            state.filters.imprint = action.payload ?? !state.filters.imprint;
            state.filters.maxShipDate = state.filters.imprint
                ? dayjs().add(4, 'weeks').toISOString()
                : dayjs().add(2, 'weeks').toISOString();
            LocalStore.setItem(storageKeys.imprint, state.filters.imprint);
        })
        .addCase(setMaxShipDate, (state, action) => {
            state.filters.maxShipDate = action.payload;

        })
        .addCase(loadOrders.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.grouping = {};
            action.payload.orders.forEach(row => {
                const key = groupKey(row);
                if (!state.grouping[key]) {
                    state.grouping[key] = {
                        count: 0,
                        expanded: state.expandAll,
                        row: {...row, OrderAmt: 0},
                        salesOrders: []
                    };
                    if (row.CustomerNo === 'RETAIL') {
                        state.grouping[key].row.BillToName = row.CustomerName;
                    }
                }
                state.grouping[key].count += 1;
                state.grouping[key].salesOrders = [...state.grouping[key].salesOrders, row].sort(defaultOrderSorter);
                state.grouping[key].row.OrderAmt = new Decimal(state.grouping[key].row.OrderAmt).add(row.OrderAmt).toString();
                state.grouping[key].row.ShipVia = row.ShipVia === state.grouping[key].row.ShipVia ? row.ShipVia : VALUE_VARIES;
                state.grouping[key].row.BillToName = row.BillToName === state.grouping[key].row.BillToName ? row.BillToName : row.CustomerName;
                state.grouping[key].row.UserLogon = row.UserLogon === state.grouping[key].row.UserLogon ? row.UserLogon : VALUE_VARIES;
                state.grouping[key].row.Comment = row.Comment === state.grouping[key].row.Comment ? row.Comment : VALUE_VARIES;
                state.grouping[key].row.status = row.status?.StatusCode === state.grouping[key].row.status?.StatusCode
                    ? (row.status ?? null)
                    : {
                        id: 0,
                        SalesOrderNo: row.SalesOrderNo,
                        Notes: null,
                        StatusCode: VALUE_VARIES,
                        StatusType: null,
                        User: null,
                        timestamp: null
                    };
            });
            state.totals = buildTotals(action.payload.orders ?? []);
            state.updated = action.payload.updated;
        })
        .addCase(loadOrders.rejected, (state) => {
            state.loading = false;
        })
        .addCase(saveOrderStatus.pending, (state, action) => {
            const group = state.grouping[action.meta.arg.groupKey];
            if (group) {
                if (group.row.SalesOrderNo === action.meta.arg.SalesOrderNo) {
                    group.row.saving = true;
                }
                group.salesOrders = [
                    ...group.salesOrders.filter(row => row.SalesOrderNo !== action.meta.arg.SalesOrderNo),
                    ...group.salesOrders.filter(row => row.SalesOrderNo === action.meta.arg.SalesOrderNo)
                        .map(row => ({...row, saving: true})),
                ].sort(defaultOrderSorter);
            }
        })
        .addCase(saveOrderStatus.fulfilled, (state, action) => {
            const group = state.grouping[action.meta.arg.groupKey];
            if (group) {
                const existing = group.salesOrders.filter(row => row.SalesOrderNo !== action.payload?.SalesOrderNo);
                const [matching] = group.salesOrders.filter(row => row.SalesOrderNo === action.payload?.SalesOrderNo);
                if (action.payload && matching) {
                    matching.status = action.payload;
                    group.salesOrders = [
                        ...existing,
                        {...matching, status: action.payload, saving: false},
                    ].sort(defaultOrderSorter)
                    if (group.row.SalesOrderNo === action.meta.arg.SalesOrderNo) {
                        group.row.status = action.payload;
                        group.row.saving = false;
                    }
                } else {
                    group.salesOrders = existing.sort(defaultOrderSorter);
                }
            }
        })
        .addCase(saveOrderStatus.rejected, (state, action) => {
            const group = state.grouping[action.meta.arg.groupKey];
            if (group) {
                group.salesOrders = [
                    ...group.salesOrders.filter(row => row.SalesOrderNo !== action.meta.arg.SalesOrderNo),
                    ...group.salesOrders.filter(row => row.SalesOrderNo === action.meta.arg.SalesOrderNo)
                        .map(row => ({...row, saving: false, errorMessage: action.error.message})),
                ].sort(defaultOrderSorter);
            }
            if (group.row.SalesOrderNo === action.meta.arg.SalesOrderNo) {
                group.row.errorMessage = action.error.message;
                group.row.saving = false;
            }
        })
        .addCase(saveGroupStatus.pending, (state, action) => {
            const group = state.grouping[action.meta.arg.groupKey];
            if (group) {
                group.saving = true;
            }
        })
        .addCase(saveGroupStatus.fulfilled, (state, action) => {
            const group = state.grouping[action.meta.arg.groupKey];
            if (group) {
                group.saving = false;
                const groupStatus = group.salesOrders
                    .filter(row => row.status)
                    .reduce((pv, cv) => {
                        if (!cv.status || !cv.status.StatusCode || pv.includes(cv.status.StatusCode)) {
                            return pv;
                        }
                        return [...pv, cv.status.StatusCode];
                    }, [] as string[]);
                if (group.row.status && groupStatus.length > 1) {
                    group.row.status.StatusCode = VALUE_VARIES;
                }
            }
        })
        .addCase(saveGroupStatus.rejected, (state, action) => {
            const group = state.grouping[action.meta.arg.groupKey];
            if (group) {
                group.saving = false;
            }
        })
        .addCase(toggleExpandGroup, (state, action) => {
            if (action.payload && state.grouping[action.payload.groupKey]) {
                state.grouping[action.payload.groupKey].expanded = !state.grouping[action.payload.groupKey].expanded;
                state.page = action.payload.nextPage ?? state.page;
            }
        })
        .addCase(toggleExpandAllGroups, (state, action) => {
            state.expandAll = action.payload ?? !state.expandAll;
            LocalStore.setItem(storageKeys.expandAll, state.expandAll);
            Object.values(state.grouping).forEach(group => {
                if (group.count > 1) {
                    group.expanded = state.expandAll;
                }
            })
        })
        .addCase(setARDivisionNoFilter, (state, action) => {
            state.filters.arDivisionNo = action.payload;
            state.page = 0;
        })
        .addCase(setCustomerFilter, (state, action) => {
            state.filters.customer = action.payload ?? null;
            state.page = 0;
        })
        .addCase(setSalesOrderFilter, (state, action) => {
            state.filters.salesOrderNo = action.payload;
            state.page = 0;
        })
        .addCase(setUserFilter, (state, action) => {
            state.filters.user = action.payload;
            state.page = 0;
        })
        .addCase(setStatusFilter, (state, action) => {
            state.filters.status = action.payload;
            state.page = 0;
        })
        .addCase(toggleShowOpen, (state, action) => {
            state.filters.onTimeOrders = action.payload ?? !state.filters.onTimeOrders;
            state.page = 0;
            LocalStore.setItem(storageKeys.showOpen, state.filters.onTimeOrders);
        })
        .addCase(toggleShowLate, (state, action) => {
            state.filters.lateOrders = action.payload ?? !state.filters.lateOrders;
            state.page = 0;
            LocalStore.setItem(storageKeys.showLate, state.filters.lateOrders);
        })
        .addCase(toggleShowBackorders, (state, action) => {
            state.filters.backOrders = action.payload ?? !state.filters.backOrders;
            state.page = 0;
            LocalStore.setItem(storageKeys.showBackOrder, state.filters.backOrders);
        })
        .addCase(toggleShowOnCancelDate, (state, action) => {
            state.filters.onCancelDate = action.payload ?? !state.filters.onCancelDate;
            state.page = 0;
            LocalStore.setItem(storageKeys.showOnCancelDate, state.filters.onCancelDate);
        })
        .addCase(toggleShowPastCancelDate, (state, action) => {
            state.filters.pastCancelDate = action.payload ?? !state.filters.pastCancelDate;
            state.page = 0;
            LocalStore.setItem(storageKeys.showPastCancelDate, state.filters.pastCancelDate);
        })
        .addCase(toggleShowInvoicing, (state, action) => {
            state.filters.invoicing = action.payload ?? !state.filters.invoicing;
            state.page = 0;
            LocalStore.setItem(storageKeys.showInvoicing, state.filters.invoicing);
        })
        .addCase(toggleShowDollars, (state, action) => {
            state.filters.showDollars = action.payload ?? !state.filters.showDollars;
            state.page = 0;
            LocalStore.setItem(storageKeys.showDollars, state.filters.showDollars);
        })
        .addCase(toggleShowChums, (state, action) => {
            state.filters.showChums = action.payload ?? !state.filters.showChums;
            state.page = 0;
            LocalStore.setItem(storageKeys.showChums, state.filters.showChums);
        })
        .addCase(toggleShowEDI, (state, action) => {
            state.filters.showEDI = action.payload ?? !state.filters.showEDI;
            state.page = 0;
            LocalStore.setItem(storageKeys.showEDI, state.filters.showEDI);
        })
        .addCase(toggleShowWeb, (state, action) => {
            state.filters.showWeb = action.payload ?? !state.filters.showWeb;
            state.page = 0;
            LocalStore.setItem(storageKeys.showWeb, state.filters.showWeb);
        })
        .addCase(setSort, (state, action) => {
            state.sort = action.payload;
            state.page = 0;
        })
        .addCase(setPage, (state, action) => {
            state.page = action.payload;
        })
        .addCase(setRowsPerPage, (state, action) => {
            state.rowsPerPage = action.payload;
            state.page = 0;
            LocalStore.setItem(storageKeys.rowsPerPage, action.payload);
        })
})

export default ordersReducer;
