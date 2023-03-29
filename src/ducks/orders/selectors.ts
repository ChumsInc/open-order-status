import {RootState} from "../../app/configureStore";
import {createSelector} from "@reduxjs/toolkit";
import {customerKey} from "../../utils";
import {calcStatus, groupKey, isInvoicing, orderSorter} from "./utils";
import {FetchOrdersOptions} from "../../api";
import {SalesOrderRow} from "../../types";

export const selectSalesOrderList = (state: RootState) => state.orders.list;
export const selectLoading = (state: RootState) => state.orders.loading;
export const selectLoaded = (state: RootState) => state.orders.loaded;
export const selectImprint = (state: RootState) => state.orders.filters.imprint;
export const selectMaxShipDate = (state: RootState) => state.orders.filters.maxShipDate;
export const selectARDivisionNo = (state: RootState) => state.orders.filters.arDivisionNo;
export const selectCustomer = (state: RootState) => state.orders.filters.customer;
export const selectUser = (state: RootState) => state.orders.filters.user;
export const selectStatus = (state: RootState) => state.orders.filters.status;
export const selectOnTime = (state: RootState) => state.orders.filters.onTimeOrders;
export const selectLateOrders = (state: RootState) => state.orders.filters.lateOrders;
export const selectBackOrders = (state: RootState) => state.orders.filters.backOrders;
export const selectOnCancelDateOrders = (state: RootState) => state.orders.filters.onCancelDate;
export const selectPastCancelDateOrders = (state: RootState) => state.orders.filters.pastCancelDate;
export const selectInvoicing = (state: RootState) => state.orders.filters.invoicing;
export const selectShowChums = (state: RootState) => state.orders.filters.showChums;
export const selectShowEDI = (state: RootState) => state.orders.filters.showEDI;
export const selectShowWeb = (state: RootState) => state.orders.filters.showWeb;
export const selectShowDollars = (state: RootState) => state.orders.filters.showDollars;
export const selectTotals = (state: RootState) => state.orders.totals;
export const selectPage = (state: RootState) => state.orders.page;
export const selectRowsPerPage = (state: RootState) => state.orders.rowsPerPage;
export const selectSort = (state: RootState) => state.orders.sort;
export const selectGrouping = (state:RootState) => state.orders.grouping;
export const selectExpandAll = (state:RootState) => state.orders.expandAll;
export const selectOrderGroup = (state:RootState, key:string) => state.orders.grouping[key] ?? null;

export const selectSalesOrder = (state:RootState, salesOrderNo: string) => state.orders.list[salesOrderNo] ?? null;

export const selectFetchOrderOptions = createSelector(
    [selectImprint, selectMaxShipDate],
    (imprint, maxDate):FetchOrdersOptions => {
        return {maxDate, imprint}
    }
)

export const selectGroupedList = createSelector(
    [selectGrouping, selectExpandAll],
    (grouping, expandAll) => {
    const rows:SalesOrderRow[] = [];
    Object.values(grouping)
        .forEach(group => {
            // if (expandAll) {
            //     return rows.push(...group.salesOrders);
            // }
            if (group.salesOrders.length === 1 || !group.expanded) {
                return rows.push(group.row);
            }
            rows.push(...group.salesOrders);
        });
    return rows;
})

export const selectFilteredOrders = createSelector(
    [selectGroupedList, selectImprint, selectARDivisionNo, selectCustomer, selectUser, selectStatus,
        selectOnTime, selectLateOrders, selectBackOrders, selectOnCancelDateOrders, selectPastCancelDateOrders,
        selectInvoicing, selectShowChums, selectShowEDI, selectShowWeb, selectSort
    ],
    (list, imprint, arDivisionNo, customerNo, user,
     statusCode, onTime, late, backOrders, onCancelDate, pastCancelDate,
     invoicing, showChums, showEDI, showWeb, sort):SalesOrderRow[] => {
        return Object.values(list)
            .filter(row => ['S','B','R'].includes(row.OrderType))
            .filter(row => invoicing || !calcStatus(row).invoicing)
            .filter(row => onTime || !calcStatus(row).onTime)
            .filter(row => late || !calcStatus(row).late)
            .filter(row => backOrders || !calcStatus(row).backorder)
            .filter(row => onCancelDate || !calcStatus(row).onCancelDate)
            .filter(row => pastCancelDate || !calcStatus(row).pastCancelDate)
            .filter(row => !showChums ? !(!row.isEDI && !row.isWebsite) : true)
            .filter(row => !showEDI ? !row.isEDI : true)
            .filter(row => !showWeb ? !row.isWebsite : true)
            .filter(row => !arDivisionNo || row.ARDivisionNo === arDivisionNo)
            .filter(row => !customerNo || row.CustomerNo.startsWith(customerNo))
            .filter(row => !user || row.UserLogon === user)
            .filter(row => !statusCode || row.status?.StatusCode === statusCode)
            .sort(orderSorter(sort))
    }
)

export const selectFilteredOrderNos = createSelector([selectFilteredOrders], (orders) => orders.map(row => row.SalesOrderNo));

export const selectTotal = createSelector(
    [selectSalesOrderList, selectInvoicing, selectShowDollars],
    (list, invoicing, showDollars) => {

    }
)

export const selectAnyExpanded = createSelector(
    [selectGrouping, selectExpandAll],
    (groups, expandAll) => {
        return expandAll || Object.values(groups).reduce((expanded, group) => expanded || (group.count > 1 && group.expanded), false);
})
