import {RootState} from "@/app/configureStore";
import {createSelector} from "@reduxjs/toolkit";
import {calcStatus, orderSorter, showOrderType} from "./utils";
import {FetchOrdersOptions} from "@/src/api";
import {SalesOrderRow} from "../../types";
import {customerKey} from "@/utils/utils";
import dayjs from "dayjs";

export const selectLoading = (state: RootState) => state.orders.loading;
export const selectImprint = (state: RootState) => state.orders.filters.imprint;
export const selectLeadTime = (state: RootState) => state.orders.filters.leadTime;
export const selectARDivisionNo = (state: RootState) => state.orders.filters.arDivisionNo;
export const selectCustomer = (state: RootState) => state.orders.filters.customer;
export const selectSalesOrderNo = (state: RootState) => state.orders.filters.salesOrderNo;
export const selectUser = (state: RootState) => state.orders.filters.user;
export const selectStatusFilter = (state: RootState) => state.orders.filters.status;
export const selectOnTime = (state: RootState) => state.orders.filters.onTimeOrders;
export const selectLateOrders = (state: RootState) => state.orders.filters.lateOrders;
export const selectBackOrders = (state: RootState) => state.orders.filters.backOrders;
export const selectOnCancelDateOrders = (state: RootState) => state.orders.filters.onCancelDate;
export const selectPastCancelDateOrders = (state: RootState) => state.orders.filters.pastCancelDate;
export const selectInvoicing = (state: RootState) => state.orders.filters.invoicing;
export const selectShowChums = (state: RootState) => state.orders.filters.showChums;
export const selectShowEDI = (state: RootState) => state.orders.filters.showEDI;
export const selectShowTest = (state: RootState) => state.orders.filters.showTest;
export const selectShowWeb = (state: RootState) => state.orders.filters.showWeb;
export const selectTotals = (state: RootState) => state.orders.totals;
export const selectEDITotals = (state: RootState) => state.orders.totals.edi;
export const selectChumsTotals = (state: RootState) => state.orders.totals.chums;
export const selectTestTotals = (state: RootState) => state.orders.totals.test;
export const selectWebTotals = (state: RootState) => state.orders.totals.web;
export const selectPage = (state: RootState) => state.orders.page;
export const selectRowsPerPage = (state: RootState) => state.orders.rowsPerPage;
export const selectSort = (state: RootState) => state.orders.sort;
export const selectGrouping = (state: RootState) => state.orders.grouping;
export const selectExpandAll = (state: RootState) => state.orders.expandAll;
export const selectOrderGroupKey = (state: RootState, key: string) => key;
export const selectOrdersUpdated = (state: RootState) => state.orders.updated;
export const selectStatusCounts = (state: RootState) => state.orders.counts;

export const selectOrderGroup = createSelector(
    [selectGrouping, selectOrderGroupKey],
    (grouping, key) => {
        return grouping[key] ?? null;
    }
)


export const selectFetchOrderOptions = createSelector(
    [selectImprint, selectLeadTime],
    (imprint, leadTime): FetchOrdersOptions => {
        const maxDate = dayjs().add(leadTime, 'days').toISOString();
        return {maxDate, imprint}
    }
)

export const selectGroupedList = createSelector(
    [selectGrouping, selectSalesOrderNo],
    (grouping, salesOrderNo) => {
        const rows: SalesOrderRow[] = [];
        Object.values(grouping)
            .forEach(group => {
                // if (expandAll) {
                //     return rows.push(...group.salesOrders);
                // }
                if (salesOrderNo) {
                    rows.push(...group.salesOrders.filter(so => so.SalesOrderNo.startsWith(salesOrderNo)));
                    return;
                }
                if (group.salesOrders.length === 1 || !group.expanded) {
                    return rows.push(group.row);
                }
                rows.push(...group.salesOrders);
            });
        return rows;
    })

export const selectFilteredOrders = createSelector(
    [selectGroupedList, selectImprint, selectARDivisionNo, selectCustomer, selectUser, selectStatusFilter,
        selectOnTime, selectLateOrders, selectBackOrders, selectOnCancelDateOrders, selectPastCancelDateOrders,
        selectInvoicing, selectShowChums, selectShowEDI, selectShowWeb, selectShowTest, selectSalesOrderNo,
        selectSort,

    ],
    (list, imprint, arDivisionNo, customer, user,
     statusCode, onTime, late, backOrders, onCancelDate, pastCancelDate,
     invoicing, showChums, showEDI, showWeb, showTest, salesOrderNo, sort): SalesOrderRow[] => {
        return Object.values(list)
            .filter(row => ['S', 'B', 'R'].includes(row.OrderType))
            .filter(row => invoicing || !calcStatus(row).invoicing)
            .filter(row => onTime || !calcStatus(row).onTime)
            .filter(row => late || !calcStatus(row).late)
            .filter(row => backOrders || !calcStatus(row).backorder)
            .filter(row => onCancelDate || !calcStatus(row).onCancelDate)
            .filter(row => pastCancelDate || !calcStatus(row).pastCancelDate)
            .filter(row => showOrderType(row, {showEDI, showWeb, showTest, showChums}))
            .filter(row => !arDivisionNo || row.ARDivisionNo === arDivisionNo)
            .filter(row => !customer || customerKey(row) === customerKey(customer))
            .filter(row => !user || row.UserLogon === user || row.UpdatedByUser === user)
            .filter(row => !statusCode || row.status?.StatusCode === statusCode)
            .filter(row => !salesOrderNo || row.SalesOrderNo.includes(salesOrderNo))
            .sort(orderSorter(sort))
    }
)

export const selectFilteredOrderNos = createSelector(
    [selectFilteredOrders],
    (orders) => orders.map(row => row.SalesOrderNo)
);

export const selectAnyExpanded = createSelector(
    [selectGrouping, selectExpandAll],
    (groups, expandAll) => {
        return expandAll || Object.values(groups).reduce((expanded, group) => expanded || (group.count > 1 && group.expanded), false);
    })
