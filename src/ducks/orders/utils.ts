import {storageKeys} from "../../api/preferences";
import {OrdersState} from "./index";
import {SortProps} from "chums-types";
import {SalesOrderRow, SalesOrderTotals} from "../../types";
import dayjs from "dayjs";
import Decimal from "decimal.js";
import {customerKey, getContainerEl} from "../../utils";
import {LocalStore} from "chums-components";


export const defaultSort: SortProps<SalesOrderRow> = {field: 'SalesOrderNo', ascending: true};
export const initialSort: SortProps<SalesOrderRow> = {field: 'ShipExpireDate', ascending: true};

const initialTotals: SalesOrderTotals = {
    "onTime": {count: 0, value: 0},
    "late": {count: 0, value: 0},
    "backorder": {count: 0, value: 0},
    "onCancelDate": {count: 0, value: 0},
    "pastCancelDate": {count: 0, value: 0},
    "invoicing": {count: 0, value: 0},
    'chums': {count: 0, value: 0},
    'edi': {count: 0, value: 0},
    'web': {count: 0, value: 0},
}

const getMaxShipDate = (): string => {
    const days = getContainerEl()?.dataset?.defaultDays ?? null;
    if (days && !isNaN(Number(days))) {
        return dayjs().add(+days, 'days').toISOString();
    }
    return LocalStore.getItem<boolean>(storageKeys.imprint, false)
        ? dayjs().add(4, 'week').toISOString()
        : dayjs().add(2, 'week').toISOString()
}

export const initialState = (): OrdersState => ({
    grouping: {},
    loading: false,
    loaded: false,
    filters: {
        imprint: LocalStore.getItem<boolean>(storageKeys.imprint, false) ?? false,
        maxShipDate: getMaxShipDate(),
        arDivisionNo: '',
        customer: null,
        salesOrderNo: '',
        user: '',
        status: null,
        onTimeOrders: LocalStore.getItem(storageKeys.showOpen, true) ?? true,
        lateOrders: LocalStore.getItem(storageKeys.showLate, true) ?? true,
        backOrders: LocalStore.getItem(storageKeys.showBackOrder, false) ?? false,
        onCancelDate: LocalStore.getItem(storageKeys.showOnCancelDate, true) ?? true,
        pastCancelDate: LocalStore.getItem(storageKeys.showPastCancelDate, true) ?? true,
        invoicing: LocalStore.getItem(storageKeys.showInvoicing, false) ?? false,
        showChums: LocalStore.getItem(storageKeys.showChums, true) ?? true,
        showEDI: LocalStore.getItem(storageKeys.showEDI, getContainerEl()?.dataset?.showEdi === 'true') ?? true,
        showWeb: LocalStore.getItem(storageKeys.showWeb, getContainerEl()?.dataset?.showWeb === 'true') ?? true,
        showDollars: LocalStore.getItem(storageKeys.showDollars, false) ?? false,
    },
    expandAll: LocalStore.getItem(storageKeys.expandAll, false) ?? false,
    totals: {...initialTotals},
    page: 0,
    rowsPerPage: LocalStore.getItem(storageKeys.rowsPerPage, 10) ?? 10,
    sort: {...initialSort},
    updated: null,
});

export const groupKeyDate = (date: string | null) => !date ? '-' : dayjs(date).format('YYYYMMDD');
export const groupKey = (row: SalesOrderRow) => [`${row.ARDivisionNo}-${row.CustomerNo}`, row.OrderType,
    row.OrderStatus, groupKeyDate(row.OrderDate), groupKeyDate(row.ShipExpireDate), groupKeyDate(row.CancelDate),
    `${+!!row.CurrentInvoiceNo}}`
].join('/');

export const defaultOrderSorter = (a: SalesOrderRow, b: SalesOrderRow): number => {
    return groupKey(a) === groupKey(b)
        ? (a.SalesOrderNo > b.SalesOrderNo ? 1 : -1)
        : (groupKey(a) > groupKey(b) ? 1 : -1);
}

export const orderSorter = ({field, ascending}: SortProps<SalesOrderRow>) =>
    (a: SalesOrderRow, b: SalesOrderRow) => {
        const sortMod = ascending ? 1 : -1;

        switch (field) {
            case 'SalesOrderNo':
                return (a[field] > b[field] ? 1 : -1) * sortMod;
            case 'ARDivisionNo':
            case 'CustomerNo': {
                const aVal = customerKey(a).toLowerCase();
                const bVal = customerKey(b).toLowerCase();
                return (
                    aVal === bVal
                        ? defaultOrderSorter(a, b)
                        : (aVal > bVal ? 1 : -1)
                ) * sortMod;
            }
            case 'UserLogon':
            case 'BillToName': {
                const aVal = a[field].toLowerCase();
                const bVal = b[field].toLowerCase();
                return (
                    aVal === bVal
                        ? defaultOrderSorter(a, b)
                        : (aVal > bVal ? 1 : -1)
                ) * sortMod;

            }
            case 'CancelDate': {
                const aVal = dayjs(a.CancelDate ?? a.ShipExpireDate).valueOf();
                const bVal = dayjs(b.CancelDate ?? b.ShipExpireDate).valueOf();
                return (
                    aVal === bVal
                        ? defaultOrderSorter(a, b)
                        : (aVal > bVal ? 1 : -1)
                ) * sortMod;
            }
            case 'OrderDate':
            case 'ShipExpireDate':
                return (
                    dayjs(a[field] ?? 0).valueOf() === dayjs(b[field] ?? 0).valueOf()
                        ? defaultOrderSorter(a, b)
                        : (dayjs(a[field] ?? 0).valueOf() > dayjs(b[field] ?? 0).valueOf() ? 1 : -1)
                ) * sortMod;

            case 'ShipVia':
                return (
                    (a[field] ?? '').toLowerCase() === (b[field] ?? '').toLowerCase()
                        ? defaultOrderSorter(a, b)
                        : ((a[field] ?? '').toLowerCase() > (b[field] ?? '').toLowerCase() ? 1 : -1)
                ) * sortMod;

            case 'OrderAmt':
                return (+a.OrderAmt - +b.OrderAmt) * sortMod;
            case 'status':
                return (
                    (a.status?.StatusCode ?? '') === (b.status?.StatusCode ?? '')
                        ? defaultOrderSorter(a, b)
                        : ((a.status?.StatusCode ?? '') > (b.status?.StatusCode ?? '') ? 1 : -1)
                ) * sortMod;
            default:
                return defaultOrderSorter(a, b) * sortMod;
        }
    }

export function isQuote(row: SalesOrderRow) {
    return row.OrderType === 'Q';
}

export function isLate(row: SalesOrderRow) {
    return !isQuote(row)
        && !isInvoicing(row)
        && dayjs(row.CancelDate ?? row.ShipExpireDate).isBefore(new Date(), 'date');
}

export function isOnCancelDate(row: SalesOrderRow) {
    return !isQuote(row)
        && !!row.CancelDate
        && dayjs(row.CancelDate).isSame(new Date(), 'date');
}

export function isPastCancelDate(row: SalesOrderRow) {
    return !isQuote(row)
        && !!row.CancelDate
        && dayjs(row.CancelDate).isBefore(new Date(), 'date');
}

export function isBackOrder(row: SalesOrderRow) {
    return row.OrderType === 'B' && !row.CurrentInvoiceNo;
}

export function isInvoicing(row: SalesOrderRow) {
    return !!row.CurrentInvoiceNo;
}

export function calcStatus(row: SalesOrderRow) {
    const backorder = isBackOrder(row);
    const invoicing = isInvoicing(row);
    const onCancelDate = !invoicing && isOnCancelDate(row);
    const pastCancelDate = !invoicing && isPastCancelDate(row);
    const late = !invoicing && !pastCancelDate && !backorder && !onCancelDate && isLate(row);
    const onTime = !invoicing && !backorder && !late && !onCancelDate && !pastCancelDate;
    return {backorder, invoicing, late, onCancelDate, pastCancelDate, onTime};
}


export function friendlyDate(value: string | Date | null): string | null {
    if (!value) {
        return null;
    }
    const now = new Date();
    const d = dayjs(value);
    if (!d) {
        return 'Invalid Date';
    }
    if (d.toDate().getFullYear() === now.getFullYear()) {
        return d.format('MM/DD');
    }
    return d.format('MM/DD/YYYY');
}


export function buildTotals(rows: SalesOrderRow[]): SalesOrderTotals {
    return rows.reduce((pv, cv) => {
        const status = calcStatus(cv);
        const total = {
            ...pv,
            chums: !(cv.isEDI || cv.isWebsite)
                ? {count: pv.chums.count + 1, value: new Decimal(cv.OrderAmt).add(pv.chums.value).valueOf()}
                : pv.chums,
            edi: cv.isEDI
                ? {count: pv.edi.count + 1, value: new Decimal(cv.OrderAmt).add(pv.edi.value).valueOf()}
                : pv.edi,
            web: cv.isWebsite
                ? {count: pv.web.count + 1, value: new Decimal(cv.OrderAmt).add(pv.web.value).valueOf()}
                : pv.web,
        };
        if (status.invoicing) {
            return {
                ...total,
                invoicing: {
                    count: total.invoicing.count + 1,
                    value: new Decimal(cv.OrderAmt).add(total.invoicing.value).valueOf()
                }
            }
        }
        if (status.late) {
            return {
                ...total,
                late: {
                    count: total.late.count + 1,
                    value: new Decimal(cv.OrderAmt).add(total.late.value).valueOf()
                }
            }
        }
        if (status.onTime) {
            return {
                ...total,
                onTime: {
                    count: total.onTime.count + 1,
                    value: new Decimal(cv.OrderAmt).add(total.onTime.value).valueOf()
                }
            }
        }
        if (status.backorder) {
            return {
                ...total,
                backorder: {
                    count: total.backorder.count + 1,
                    value: new Decimal(cv.OrderAmt).add(total.backorder.value).valueOf()
                }
            }
        }
        if (status.onCancelDate) {
            return {
                ...total,
                onCancelDate: {
                    count: total.onCancelDate.count + 1,
                    value: new Decimal(cv.OrderAmt).add(total.onCancelDate.value).valueOf()
                }
            }
        }
        if (status.pastCancelDate) {
            return {
                ...total,
                pastCancelDate: {
                    count: total.pastCancelDate.count + 1,
                    value: new Decimal(cv.OrderAmt).add(total.pastCancelDate.value).valueOf()
                }
            }
        }
        return total;
    }, {...initialTotals})
}

export const parseDateTime = (sageDate: string, sageTime: string): Date => {
    return dayjs(sageDate).add(Number(sageTime), 'hours').toDate();
}
